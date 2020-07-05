import React, { Component, Fragment } from 'react';
import RegisterModal from "./auth/RegisterModal.js"
import LoginModal from "./auth/LoginModal.js";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class PropertyTable extends Component {
    state = {
        isOpen: false
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }
    
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render(){

        const { isAuthenticated, user } = this.props.auth;

        return(
            <div>
                <h1> Properties Screen</h1>
                <div>
                    {user ? user._id : "No user found"}
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, null)(PropertyTable);