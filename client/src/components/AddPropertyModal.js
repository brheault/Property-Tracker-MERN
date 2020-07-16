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

class AddPropertyModal extends Component{
    constructor(props){
        super(props);
        this.state ={
            isModalOpen: false,
            address: '',
            listedPrice: ''
        };

        this.onChange = this.onChange.bind(this);
    }

    // static propTypes = {
    //     isAuthenticated: PropTypes.bool
    // }

    toggle = () => {
        this.setState({isModalOpen: !this.state.isModalOpen});
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault();
        const newProperty = {
            address: this.state.address,
            listedPrice: this.state.listedPrice
        };

        console.log(JSON.stringify(newProperty));

        fetch('/api/users/properties', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newProperty)
        })
            .then(res => res.json())
            .then(data => console.log(data));

        this.toggle();
    }

    render(){
        return(
            <div>
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


export default AddPropertyModal;