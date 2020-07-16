import React, { Component, Fragment } from 'react';
import { Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import {connect} from 'react-redux';
import {getProperties, deleteProperty} from '../actions/itemActions.js';
import PropTypes from 'prop-types';

class PropertyTable extends Component {

    constructor(props){
        super(props);
        this.state = {
            properties: []  //Empty by default, will be filled when component mounts
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

        // Fetch all properties from the database and save to component state
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
        const postProperties = this.state.properties.map(property => (
            <div key={property._id} className="border border-primary rounded p-3 d-flex m-3">
                <h3>{property.address}</h3>
                <p>{property.listedPrice}</p>
                <p>{property.userId}</p>
            </div>
        ));

        return(
            <Container>

            <div>
                <h1> Properties Screen</h1>
                <div>
                    User ID : {user ? user._id : "No user found"}
                </div>
            </div>

            {postProperties}

            </Container>
        );
    }
}


const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(PropertyTable);