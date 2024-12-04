import React, { useState } from 'react';
import TodoBanner from './TodoBanner';
//import TodoCreator from './TodoCreator';
//import TodoRow from './TodoRow';

function App() {
  const [userName] = useState("Adam");
  const [todoItems, setToDoItems] = useState([
    { action: "Buy Flowers", done: false },
    { action: "Get Shoes", done: false },
    { action: "Collect Tickets", done: false },
    { action: "Call Joe", done: false },
  ]);

  // Function to add a new todo item
  const createNewTodo = (task) => {
    if (!todoItems.find((item) => item.action === task)) {
      setToDoItems([...todoItems, { action: task, done: false }]);
    }
  };

  // Function to toggle the completion status of a todo item
  const toggleTodo = (todo) => {
    setToDoItems(
      todoItems.map((item) =>
        item.action === todo.action ? { ...item, done: !item.done } : item
      )
    );
  };

  return (
    <div>
      <TodoBanner userName={userName} todoItems={todoItems} />
      <div class="m-3">
      <TodoCreator addTask={createNewTodo} />
      </div>
      <div className="container-fluid">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Task</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>
            {todoItems.map((item, index) => (
              <TodoRow key={index} item={item} toggle={ toggleTodo } />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
