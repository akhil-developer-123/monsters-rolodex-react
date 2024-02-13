import { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

// class based component
class App extends Component {

  // constructor runs first of all things
  constructor() {
    // console.log('const');
    super(); // calls constructor of parent class

    this.state = {
      monsters: [],
      searchText: ''

      // storing monsters in 2 arrays might not be the best solution
      // allMonsters: []
    }
  }

  // lifecycle method: gets invoked whenever a component is mounted onto DOM
  componentDidMount() {
    // console.log('componentDidMount');

     fetch('https://jsonplaceholder.typicode.com/users')
     .then(response => {
      // console.log(response);
      return response.json();
     })
     .then(users => {
      this.setState(
      () => {
        // updates the state using shallow merge i.e only the matching keys 
        return {
          monsters: users
        };
      }, 
      () => {
        // console.log(this.state);
      });
     }) 
  }

  // create a class variable that holds a callback fn
  onSearchChange = (event) => {
      // when a value is entered into textbox update the state with searchText value
      const searchText = event.target.value.toLocaleLowerCase();
      this.setState(() => {
        return {searchText: searchText}
      });
        // when you change the state, render() gets called again
  } 

  render() {
    // render function is used for rendering ui
    const { monsters, searchText } = this.state;
    const { onSearchChange } = this;

    const filteredMonsters = monsters.filter((monster) => {              
      return monster.name.toLocaleLowerCase().includes(searchText);
    });
    
    return (
      <div className="App">
        <h1 className="app-title">Monsters Rolodex</h1>
        <SearchBox className="search-box" placeholder="search monsters" onChangeHandler={onSearchChange}/>
        <CardList monsters={filteredMonsters}/>
      </div>
    );
  }

}

export default App;


/*
order in which things run

constructor
render function
ComponentDidMount lifecycle method

*/

/*
React re-renders a component when either of these 2 events happen
a. setState
b. props change

re-render meaning render() fn is called
*/


/*
React lifecycle methods for class based components
diagram https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/

In short,
ComponentDidMount gets invoked when DOM is mounted everytime
ComponentDidUpdate gets invoked on re-rendering of the component.
  Note: Re-render happens when setState is called
When a component is no longer needed, React will unmount it from DOM. 
  Then ComponentWillUnmount is invoked before that.

*/