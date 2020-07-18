import React, {Component} from 'react';
import { Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import {connect} from 'react-redux';
import {getItems, deleteItem} from '../actions/itemActions.js'; //Comes in as a prop
import PropTypes from 'prop-types';

class TestList extends Component {

    static propTypes = {
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    }

    componentDidMount(){
        this.props.getItems();
    }

    onDeleteClick= (id) => {
        this.props.deleteItem(id);
    }

    render() {
        const {items} = this.props.item;
        return(
            <Container>

                <ListGroup>
                        {/*For each item gotten from the state, display it as a ListGroupItem*/}
                        {/*ID is taken in for deletion, name is taken in for display*/}
                        {items.map(({_id, name}) => (
                                <ListGroupItem>
                                    {/* On Click, delete the item by filtering it out of the state */}
                                    {this.props.isAuthenticated ? 
                                        <Button className="remove-btn" color="danger" size="sm" 
                                            
                                        onClick={this.onDeleteClick.bind(this, _id)}>
                                        &times;
                                        </Button>
                                        : null}
                                    
                                    {name}
                                </ListGroupItem>
                        ))}
                </ListGroup>
            </Container>
        );
    }
}



const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {getItems, deleteItem})(TestList);