import React, { Component, Fragment } from 'react';
import { Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import {connect} from 'react-redux';
import {getProperties, deleteProperty} from '../actions/itemActions.js';
import PropTypes from 'prop-types';

class PropertyTable extends Component {

    constructor(props){
        super(props);
        this.state = {
            properties: []  //Empty by default, will be filled
        }
    }
    
    // static propTypes = {
    //     getProperties: PropTypes.func.isRequired,
    //     property: PropTypes.object.isRequired,
    //     isAuthenticated: PropTypes.bool
    // }

    componentDidMount(){
        //this.props.getProperties(id);
        // const user = this.props.auth;
        // console.log(user);
        // console.log(user.token);
        fetch('/api/users/properties')
            .then(res => res.json())
            .then(data => this.setState({properties: data}));
    }
    
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    

    render(){

        // const {properties} = this.props.properties;
        const { isAuthenticated, user } = this.props.auth;
        // const postItems = this.state.properties.map(property => (
        //     <div key={property._id}>
        //         <h3>{property.address}</h3>
        //         <p>{property.listedPrice}</p>
        //     </div>
        // ));

        return(
            <Container>

            <div>
                <h1> Properties Screen</h1>
                <div>
                    {user ? user._id : "No user found"}
                </div>

                
            </div>

            

            {/*For each item gotten from the state, display it as a ListGroupItem*/}
            {/*ID is taken in for deletion, name is taken in for display*/}
            {/* On Click, delete the item by filtering it out of the state */}
            <ListGroup>
                
                {this.state.properties.map(property => (
                    <ListGroupItem key={property._id}>                       
                            {property.address}
                    </ListGroupItem>
                ))}
            </ListGroup>

            </Container>
        );
    }
}


const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(PropertyTable);