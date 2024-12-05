// import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import TodoBanner from './TodoBanner';
import TodoCreator from './TodoCreator';
import TodoRow from './TodoRow';
import VisibilityControl from './VisibilityControl';

function App() {

  const [userName] = useState("Adam"); // change 1

  const [todoItems, setTodoItems] = useState([{action: "Buy Flowers", done: false},
    {action: "Get Shoes", done: false},
    {action: "Collect Tickets", done: true},
    {action: "Call Joe", done: false}
  ]);

  const [showCompleted, setShowCompleted] = useState(true);

  // const [newItemText, setNewItemText] = useState(""); // change 2

  // const changeStateData = () => {
  //   setUserName((prevName) => (prevName === "Adam" ? "Bob" : "Adam")); // change 3
  // };

  // const updateNewTextValue = (event) => { // change 4
  //   setNewItemText(event.target.value);
  // };

  // const createNewTodo = (task) => {
  //   if (!todoItems
  //     .find(item => item.action === task)
  //   )
  //   {
  //     setTodoItems([
  //       ...todoItems,
  //       { action: task, done: false }
  //     ]);
  //     // setNewItemText(""); //change 5
  //     () => localStorage.setItem("todos", JSON.stringify(task));
  //   }
    
  // };

  // const createNewTodo = (task) => {
  //   if (!todoItems.find(item => item.action === task)) {
  //     setTodoItems([
  //       ...todoItems,
  //       { action: task, done: false }
  //     ]);
  //     // Update localStorage with the new todo list
  //     localStorage.setItem("todos", JSON.stringify([...todoItems, { action: task, done: false }]));
  //   }
  // };

  const createNewTodo = (task) => {
    if (!todoItems.find((item) => item.action === task)) {
      const updatedTodos = [...todoItems, {action: task, done: false}];
      // setToDoItems([...todoItems, { action: task, done: false }],
      setTodoItems(updatedTodos);
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }
  };

  // Function to toggle the completion status of a todo item
  const toggleTodo = (todo) => {
    const updatedTodos = todoItems.map((item) =>
      item.action === todo.action ? { ...item, done: !item.done } : item
    );
    setTodoItems(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };
  

  // const toggleTodo = (todo) => {
  //   setTodoItems(todoItems.map((item) =>
  //     item.action === todo.action
  //       ? { ...item, done: !item.done }
  //       : item
  //   ));
  // };
  
  const todoTableRows = (doneValue) => todoItems.filter(item => item.done === doneValue).map(item =>
    <TodoRow key={ item.action } item={ item } toggle={ toggleTodo } />
  )

  //loading data from local storage
  useEffect(() => {
    try {
      const data = localStorage.getItem("todos");
      if (data) {
        const parsedData = JSON.parse(data);
        if (Array.isArray(parsedData)) {
          setTodoItems(parsedData);
        }
      }          
    } catch (error) {
      console.error("Failed to load todos:", error);
    }
  }, []);

//   useEffect (() => {
//     let data = localStorage.getItem("todos");
//     const todos = (data != null
//         ? JSON.parse(data)
//         : {
//             userName: "Adam",
//             todoItems: [
//                 { action: "Buy Flowers", done: false },
//                 { action: "Get Shoes", done: false },
//                 { action: "Collect Tickets", done: true },
//                 { action: "Call Joe", done: false }
//             ],
//             showCompleted: true
//         });
    
//     // Use the 'todos' object here as needed
//     console.log(todos);  // Just an example to show what you have
// })

  return (
    <div>
      <TodoBanner userName={userName} todoItems={todoItems} />

      <div class="m-3">
        <TodoCreator callback={createNewTodo} />
      </div>

      <div class="container-fluid">
        

        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Description</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>
            { todoTableRows(false) }
          </tbody>
        </table>

        <div className="bg-secondary text-white text-center p-2">
          <VisibilityControl
            description="Completed Tasks"
            isChecked={showCompleted}
            callback={ (checked) => setShowCompleted(checked)} />

        </div>
        {
          showCompleted &&
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Description</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>
              { todoTableRows(true) }
            </tbody>
          </table>
        }
        
      </div>
    </div>
  );
}

export default App;
