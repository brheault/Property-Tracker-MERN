import React, {Component} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {register} from '../../actions/authActions.js';
//import { TokenExpiredError } from 'jsonwebtoken';
import {clearErrors} from '../../actions/errorActions.js';

class RegisterModal extends Component{
    state ={
        isModalOpen: false,
        name: '',
        email: '',
        password: '',
        msg: null
    };

    static propTypes ={
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps){
        const {error, isAuthenticated} = this.props;
        if (error !== prevProps.error) {
            //Check for register error
            if(error.id === "REGISTER_FAIL"){
                this.setState({msg: error.msg.msg});
            }
            else{
                this.setState({msg: null});
            }
        }

        //If authenticated, close registration modal
        if (this.state.isModalOpen) {
            if (isAuthenticated) {
                this.toggle();
            }
        }
    }

    toggle = () => {
        //Clear errors
        this.props.clearErrors();
        this.setState({ isModalOpen: !this.state.isModalOpen});
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault();

        const {name, email, password} = this.state;

        // Create user object
        const newUser ={
            name, 
            email,
            password
        };

        // Attempt to register
        this.props.register(newUser);

        //this.toggle();
    }

    render(){
        return(
            <div>
                <NavLink onClick={this.toggle} href='#'>
                    Register
                </NavLink>
                
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input type="text" name="name" id="name" placeholder="Name" onChange={this.onChange}></Input>
                                <Label for="email">Email</Label>
                                <Input type="email" name="email" id="email" placeholder="Email" onChange={this.onChange}></Input>
                                <Label for="Password">Password</Label>
                                <Input type="password" name="password" id="password" placeholder="Password" onChange={this.onChange}></Input>

                                <Button color="dark" style={{marginTop: "2rem"}}>
                                    Register
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, {register, clearErrors})(RegisterModal);