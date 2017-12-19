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
    // The attributes in jsx 'tags' are passed to 'child' components through
    // props variable.
    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onChangeSearch}
          >
          {/* Searchies is child of search, and in Search Components
            It is referenced as children in props. */}
            Searchies
          </Search>
        </div>
          <Table
            list = {list}
            pattern = {searchTerm}
            onDismiss={this.onDismiss}
          />
      </div>
    );
  }
}

const Search = ({value, onChange, children})=>
  <form>
    {children} <input
      type="text"
      value={value}
      onChange={onChange}
    />
  </form>


const Table =({list, pattern, onDismiss})=>
  <div className="table">
    {/*These are not uls with lis, they are divs with spans per info*/}
    {list.filter(isSearched(pattern)).map(item =>
      <div key={item.objectID} className="table-row">
        <span style={{ width: '30%'}}>
          <a href={item.url}>{item.title}: </a>
        </span>
        <span style={{ width:'30%' }}>{item.author} </span>
        <span style={{ width: '10%' }}>{item.num_comments} </span>
        <span style={{ width: '10%' }}>{item.points} </span>
        <span style={{ width: '10%' }}>
          <Button
            onClick={() => onDismiss(item.objectID)}
            className="button-inline"
          >
          Dismiss
          </Button>
        </span>
      </div>
    )}
  </div>



const Button=({onClick, className, children})=>
  <button
    onClick = {onClick}
    className = {className ? className : ""}
    type="button"
  >
    {children}
  </button>



export default App;
