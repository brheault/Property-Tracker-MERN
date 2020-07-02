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
import {login} from '../../actions/authActions.js';
import {clearErrors} from '../../actions/errorActions.js';

class LoginModal extends Component{
    state ={
        isModalOpen: false,
        email: '',
        password: '',
        msg: null
    };

    static propTypes ={
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps){
        const {error, isAuthenticated} = this.props;
        if (error !== prevProps.error) {
            //Check for register error
            if(error.id === "LOGIN_FAIL"){
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
        const {email, password} = this.state;
        const user = {
            email, 
            password
        }
        //Atempt to login
        this.props.login(user);
    }

    render(){
        return(
            <div>
                <NavLink onClick={this.toggle} href='#'>
                    Login
                </NavLink>
                
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Login</ModalHeader>
                    <ModalBody>
                        {this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                
                                <Label for="email">Email</Label>
                                <Input type="email" name="email" id="email" placeholder="Email" onChange={this.onChange}></Input>
                                <Label for="Password">Password</Label>
                                <Input type="password" name="password" id="password" placeholder="Password" onChange={this.onChange}></Input>

                                <Button color="dark" style={{marginTop: "2rem"}}>
                                    Login
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

export default connect(mapStateToProps, {login, clearErrors})(LoginModal);