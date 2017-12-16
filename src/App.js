import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1
  }
]
// Helper funciton passed to filter
const isSearched = searchTerm => item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())



class App extends Component {
  constructor(props){
    super(props)
    // The state is an abstraction that is modified by onDismiss method.
    this.state={
      list,
      searchTerm: "",
    }
    // This binds event handler to component *instance*
    this.onChangeSearch = this.onChangeSearch.bind(this)
    this.onDismiss = this.onDismiss.bind(this)
  }

  // This method puts the value of input in form into this.state
  onChangeSearch(event){
    this.setState({searchTerm: event.target.value})
  }

  onDismiss(id){
    const updatedList = this.state.list.filter(item => item.objectID !== id)
    // Notice we bound onDismiss's this to the constructor earler,
    // and that rule still applies in its definition, as well as where
    // it's called.
    this.setState({ list: updatedList })
  }
  render() {
    return (
      <div className="App">
        <form>
        {/*THe function passed to onChange is defined in the component*/}
          <input
            type="text"
            onChange={this.onChangeSearch}
          />
        </form>
        {this.state.list.filter(isSearched(this.state.searchTerm)).map(item=>

          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
            {/* Remember this is basically a for loop, 'for item in..'
             We require there to be a function in the handler, because
             otherwise the expression would execute when browser loads page*/}
              <button
                onClick={()=> console.log(this)}
                type="button"
              > Delete
              </button>
            </span>
          </div>

        )}

      </div>
    );
  }
}

export default App;
