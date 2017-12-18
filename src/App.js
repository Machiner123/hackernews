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
    // Destructuring the state object into const list =this.state.list, searchTerm =this.state.searchTerm
    const {searchTerm, list} = this.state
    return (
      <div className="App">
        <Search
          value={searchTerm}
          onChange={this.onSearchChange}
        />
        <Table
          list = {list}
          pattern = {searchTerm}
          onDismiss={this.onDismiss}
        />
      </div>
    );
  }
}

class Search extends Component{
  render(){
    const { value, onChange } = this.props
    return (
      <form>
        <input
          type="text"
          value={value}
          onChange={onChange}
          />
      </form>
    )
  }
}

class Table extends Component{
  render() {
    const {list, pattern, onDismiss} = this.props
    return (
      <div>
        {list.filter(isSearched(pattern)).map(item =>
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
            <span>
              <button
                onClick={() => onDismiss(item.objectID)}
                type="button"
              >
              Dismiss
              </button>
            </span>
          </div>
        )}
      </div>
    )

  }
}
export default App;
