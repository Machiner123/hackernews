import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

const DEFAULT_QUERY = 'redux',
      PATH_BASE = 'https://hn.algolia.com/api/v1',
      PATH_SEARCH = '/search',
      PARAM_SEARCH = 'query=';

//const url = `${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${DEFAULT_QUERY}`;


// Helper funciton passed to filter
const isSearched = searchTerm => item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())



class App extends Component {
  constructor(props){
    super(props)
    // The state is an abstraction that is modified by onDismiss method.
    this.state={
      result: null,
      searchTerm: DEFAULT_QUERY
    }
    // This binds event handler to component *instance*
    this.setSearchTopStories = this.setSearchTopStories.bind(this)
    this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this)
    this.onChangeSearch = this.onChangeSearch.bind(this)
    this.onSearchSubmit = this.onSearchSubmit.bind(this)
    this.onDismiss = this.onDismiss.bind(this)
  }

  // Simple method sets this.state.result, used by fetchSearchTopStories
  setSearchTopStories(result) {
    this.setState({result})
  }

  // Used by componentDidMount to make a fetch api call for data
  // AFTER component is mounted (attached to dom, does not necesarily have data).
  // The fetch is made with the state.searchTerm, stored in state.result.
  // Notice searchTerm is dfined in the funciton this is called
  fetchSearchTopStories(searchTerm){
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
      .then(response => response.json())
      .then(result => this.setSearchTopStories(result))
      .catch(e => e)
  }

  // Actually does the search with the updated searchTerm
  componentDidMount(){
    // ES6 destructuring this.state, same as const searchTerm = this.state.searchTerm
    const { searchTerm } = this.state
    console.log(searchTerm)
    this.fetchSearchTopStories(searchTerm)
  }

  // This takes what onSearchChange updated and runs fetch
  onSearchSubmit(event) {
    const { searchTerm } = this.state
    this.fetchSearchTopStories(searchTerm)
    event.preventDefault()
  }

  // This method puts the value of input in form into this.state
  onChangeSearch(event){
    this.setState({searchTerm: event.target.value})
  }

  // We want to replace old hits with new hits. Instead of mutating result in state,
  // we create a new object, where old result.hits is replaced with updatedHits
  onDismiss(id){
    const updatedHits = this.state.result.hits.filter(item => item.objectID !== id)
    this.setState({
      result: { ...this.state.result, hits: updatedHits}
    })
  }

  render() {
    // Destructuring the state object into const list =this.state.list, searchTerm =this.state.searchTerm
    const {searchTerm, result} = this.state


    // The attributes in jsx 'tags' are passed to 'child' components through
    // props variable.
    return (
      <div className="page">
        <div className="interactions">
          <Search
            value={searchTerm}
            onChange={this.onChangeSearch}
            onSubmit={this.onSearchSubmit}
          >
          {/* Searchies is child of search, and in Search Components
            It is referenced as children in props. */}
            Searchies
          </Search>
        </div>
          { result
            ? <Table
              list={result.hits}
              // pattern={searchTerm}
              onDismiss={this.onDismiss}
            />
            : null
          }
      </div>
    );
  }
}

// Notice params are the two perops from App.render, plus children,
// Which is the 'Seach' string child of input element App.render.<search>Search<search>
const Search = ({value, onChange, onSubmit, children})=>
  <form onSubmit={onSubmit}>
    <input
      type="text"
      value={value}
      onChange={onChange}
    />
    <button type="submit">
      {children}
    </button>
  </form>

// Notice the parameters match up with props in App.render Table jsx element
const Table =({list, onDismiss})=>
  <div className="table">
    {/*These are not uls with lis, they are divs with spans per info*/}
    {list.map(item =>
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
