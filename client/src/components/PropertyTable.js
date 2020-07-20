import React, { Component } from 'react';
import { Container} from 'reactstrap';
import {connect} from 'react-redux';
import {getProperties} from '../actions/propertyActions.js';
import PropTypes from 'prop-types';

class PropertyTable extends Component {

    constructor(props){
        super(props);
        this.state ={
            userId: ''
        }; 
    }

    async componentDidMount(){
        await fetch('/api/auth/user', {
            method: 'GET',
            headers: {
                "content-type": "application/json",
                "x-auth-token": this.props.auth.token
            }
        })
        .then(res => res.json())
        .then(data => {
            this.setState({userId: data._id});
        });

        this.props.getProperties(this.state.userId);
    }

    
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render(){

        // const {properties} = this.props.properties;
        const { user } = this.props.auth;
        const postProperties = this.props.properties.map(property => (
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



PropertyTable.propTypes = {
    getProperties: PropTypes.func.isRequired,
    properties: PropTypes.array.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    properties: state.properties.properties
});

export default connect(mapStateToProps, {getProperties})(PropertyTable);