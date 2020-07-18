import React, {Component} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {addProperty} from '../actions/propertyActions.js';
import {loadUser} from '../actions/authActions.js';


class AddPropertyModal extends Component{
    constructor(props){
        super(props);
        this.state ={
            isModalOpen: false,
            address: '',
            listedPrice: '',
            userId: ''
        };

        this.onChange = this.onChange.bind(this);
    }

    componentDidMount(){
        fetch('/api/auth/user', {
            method: 'GET',
            headers: {
                "content-type": "application/json",
                "x-auth-token": this.props.auth.token
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({userId: data._id});
        })
    }

    toggle = () => {
        this.setState({isModalOpen: !this.state.isModalOpen});
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault();
        //Create a property object to send to the database
        const newProperty = {
            address: this.state.address,
            listedPrice: this.state.listedPrice,
            userId: this.state.userId
        };
        //Call creation action
        this.props.addProperty(newProperty);
        //Close the modal
        this.toggle();
    }

    render(){

        //const { isAuthenticated, user } = this.props.auth;

        return(
            <div className="ml-5">
                <Button color="dark" style={{marginBottom: '2rem'}} onClick={this.toggle}>Add Property Manually</Button> 

                
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>New Property</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="property">Address</Label>
                                <Input type="text" name="address" id="property" placeholder="123 Example Drive" onChange={this.onChange}></Input>

                                <Label for="property">Listed Price</Label>
                                <Input type="number" name="listedPrice" id="property" placeholder="300000" onChange={this.onChange}></Input>

                                <Button color="dark" style={{marginTop: "2rem"}}>
                                    Add Property
                                </Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

AddPropertyModal.propTypes = {
    addProperty: PropTypes.func.isRequired,
    loadUser: PropTypes.func.isRequired,
    user:PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth //Contains
});

export default connect(mapStateToProps, {addProperty, loadUser})(AddPropertyModal);