import React, { Component } from 'react';
//import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import AppNavBar from "./components/AppNavBar.js";
import TestList from "./components/TestList.js";
import AddItemModal from "./components/AddItemModal";

import {Container} from "reactstrap";
import {loadUser} from "./actions/authActions.js";

import Home from './screens/Home.js';
import Properties from './screens/Properties';
import {Route} from 'react-router-dom';

//Redux imports
import { Provider } from 'react-redux';
import store from "./store"

class App extends Component {

  componentDidMount(){
    store.dispatch(loadUser());
  }

  render(){
    //JSX
    return(
      <Provider store={store}>
        <div className='app'>

          {/*Traversy Media Content*/}
          <AppNavBar/>

          <Route exact path="/" component={Home}/>
          <Route exact path="/properties" component={Properties}/>

        </div>
      </Provider>
    );
  }

}

export default App;