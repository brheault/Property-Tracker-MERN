import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import AppNavBar from "./components/AppNavBar.js";
import TestList from "./components/TestList.js";
import ItemModal from "./components/ItemModal";
import {Container} from "reactstrap";

//Redux imports
import { Provider } from 'react-redux';
import store from "./store"

class App extends Component {

  state = {
    title: '',
    body: '',
    posts: []
  };

  // When the page is refreshed, get all the posts
  componentDidMount = () => {
    this.getPost();
  };

  getPost = () => {
    //Send a request for data
    axios.get('/api/test')
    //Do something with the returned data
    .then((response) => {
      const data = response.data;
      this.setState({posts: data});
      console.log('Data has been received!!');
      console.log("Data: ", data);
    })
    //Deal with possible errors
    .catch(() => {
      console.log('error retreiving data!!');
    });
  };

  handleChange = ({ target }) => {
    const {name, value} = target;
    this.setState({[name]: value});
  };

  submit = (event) => {
    console.log("Submitting");
    //Disable browser behavior
    event.preventDefault();
    //Send the data
    const payload = {
      title: this.state.title,
      body: this.state.body
    };

    axios({
      url: '/api/test/save',
      method: 'POST',
      data: payload
    })
      .then(() => {
        console.log('Data has been sent to the server')
        this.resetInput();
        //Now that you've added data to the database, call getPost to update the displayed posts with the new one
        this.getPost();
      })
      .catch(() => {
        console.log('Internal server error')
      });
  };

  resetInput = () =>{
    this.setState({title: '', body: ''});
  };

  displayPosts = (posts) => {
    //Return null if there are 0 posts
    if (!posts.length) return null;

    return posts.map((post, index) => (
      <div key={index} className='onePost'>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
    ));
  };

  render(){
    //JSX
    return(
      <Provider store={store}>
        <div className='app'>
          <AppNavBar/>
          <Container>
            <ItemModal/>
            <TestList/>
          </Container>
          
          <form onSubmit={this.submit}>
            <div className="form-input">
              <input type="text" name="title" value={this.state.title} onChange={this.handleChange} />
            </div>
            <div className="form-input">
              <textarea name="body" cols="30" rows="10" value={this.state.body} onChange={this.handleChange} ></textarea>
            </div>

            <button>Submit</button>
          </form>

          <div className="post">
            {this.displayPosts(this.state.posts)}
          </div>
          
        </div>
      </Provider>
    );
  }

}

export default App;