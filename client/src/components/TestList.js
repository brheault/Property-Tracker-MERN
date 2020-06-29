import React, {Component} from 'react';
import { Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import { CSSTransition, TransitionGroup} from 'react-transition-group';
import {v4 as uuidv4} from 'uuid';
import {connect} from 'react-redux';
import {getItems, deleteItem} from '../actions/itemActions.js'; //Comes in as a prop
import PropTypes from 'prop-types';

class TestList extends Component {

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
                    <TransitionGroup className="test-list">
                        {/*For each item gotten from the state, display it as a ListGroupItem*/}
                        {/*ID is taken in for deletion, name is taken in for display*/}
                        {items.map(({_id, name}) => (
                            <CSSTransition key={_id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    {/* On Click, delete the item by filtering it out of the state */}
                                    <Button className="remove-btn" color="danger" size="sm" 
                                            
                                            onClick={this.onDeleteClick.bind(this, _id)}>
                                        &times;
                                    </Button>
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}

TestList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({item: state.item});

export default connect(mapStateToProps, {getItems, deleteItem})(TestList);