import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

// functional component
/* Functional components does not have any lifecycle methods  
Entire App function gets run when React needs to re-render.
If new value of a variable in state does not change, React is smart enough to avoid re-rendering.

If the new value is in different place in memory, even though the values are same React will re-render i.e 
runs the entire function again.   Due to this property React will result in infinite re-rendering when fetch 
is used inside the function based component.
*/

const App = () => {
  // console.log('render');
  // set the initial value of searchField using useState hook
  const [searchField, setSearchField] = useState(''); // [value, setValueFn]
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);
  console.log(searchField);

  /* useEffect(a,b)
    a: callback fn 
    b: list of dependencies or state variables. Invoke a() when any of the elements in this list are updated.
    If we want the a() to be invoked only once, then keep the b empty. 
  */
  useEffect(() => {
    // console.log('effect fired!');
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => setMonsters(users))
    .catch(error => console.log(error));
  }, []);

  /* Filtered Monsters should change only when monsters array or SearchField changes */
  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster) => {              
      return monster.name.toLocaleLowerCase().includes(searchField);
    });
    console.log(newFilteredMonsters);
    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  /*
  fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(users => setMonsters(users))
  .catch(error => console.log(error));
  */
  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    // sets the field value similar to setState() in class based
    setSearchField(searchFieldString);
  }

  return (
    <div className="App">
      <h1 className="app-title">Monsters Rolodex</h1>
      <SearchBox 
        className="monsters-search-box"
        placeholder="search monsters"
        onChangeHandler={onSearchChange}
      />
      <CardList monsters={filteredMonsters}/>
    </div>
  );
}

export default App;

/*
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
*/



