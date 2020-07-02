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
import {addItem} from '../actions/itemActions';
import PropTypes from 'prop-types';

class AddItemModal extends Component{
    state ={
        isModalOpen: false,
        name: ''
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }

    toggle = () => {
        this.setState({ isModalOpen: !this.state.isModalOpen});
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit = (e) => {
        e.preventDefault();
        const newItem = {
            name: this.state.name
        }

        //Add item via addItem action
        this.props.addItem(newItem);
        this.toggle();
    }

    render(){
        return(
            <div>
                {this.props.isAuthenticated ? 
                    <Button color="dark" style={{marginBottom: '2rem'}} onClick={this.toggle}>Add Item</Button> 
                    : 
                    <h4 className="mb-3 ml-4">Please log in to manage items</h4>}

                
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Add to List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Item</Label>
                                <Input type="text" name="name" id="item" placeholder="Add Item" onChange={this.onChange}></Input>
                                <Button color="dark" style={{marginTop: "2rem"}}>
                                    Add Item
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
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {addItem})(AddItemModal);