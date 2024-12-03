// import logo from './logo.svg';
import './App.css';
import React, { useState } from "react"; // Import useState here

function App() { 
  const [userName, setUserName] = useState("Adam");
  const [todoItems, setTodoItems] = useState([{ action: "Buy Flowers", done: false },
    { action: "Get Shoes", done: false },
   { action: "Collect Tickets", done: true },
   { action: "Call Joe", done: false }]);
   const [newItemText, setNewItemText] = useState("");

  const changeStateData = () => {
    setUserName((prevName) => (prevName === "Adam" ? "Bob" : "Adam"));
  };

  const updateNewTextValue = (event) => {
    setNewItemText(event.target.value); // **** Change 1
    }

  const  createNewTodo = () => {
      if (!todoItems
      .find(item => item.action === newItemText)) {
      setTodoItems([ // **** Change 2
        ...todoItems,
        { action: newItemText, done: false }
      ]);
      setNewItemText("");      
      }
      }

  return (  
    <div>
      <h4 className="bg-primary text-white text-center p-2">
        {userName}'s To Do List
        ({ todoItems.filter(t => !t.done).length} items to do)
      </h4>
      <div className="container-fluid">
        <div className="my-1">
          <input className="form-control"
            value={ newItemText }
            onChange={ updateNewTextValue } />
          <button className="btn btn-primary mt-1"
            onClick={ createNewTodo }>Add</button>
        </div>
      </div>
    </div>
  );
}

export default App;

// import React, { Component } from 'react';
// export default class App extends Component {
//  constructor(props) {
//  super(props);
//  this.state = {
//  userName: "Adam"
//  }
//  }
//  changeStateData = () => {
//  this.setState({
//  userName: this.state.userName === "Adam" ? "Bob" : "Adam"
//  })
//  }
//  render() {
//  return (
//  <div>
//  <h4 className="bg-primary text-white text-center p-2">
//  { this.state.userName }'s To Do List
//  </h4>
//  <button className="btn btn-primary m-2"
//  onClick={ this.changeStateData }>
//  Change
//  </button>
//  </div>
//  )
//  };
// }
