import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {

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
    axios.get('/api')
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
      url: '/api/save',
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
      <div className='app'>
        <h2>Welcome to my app</h2>
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
    );
  }

}

export default App;