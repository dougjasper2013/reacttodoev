import React from "react";

function TodoRow({item, toggle}){
  const onToggle = () => {
    toggle(item); // Call the provided toggle function with the item
  };
  
  return(
    <tr>
      <td>{ item.action}</td>
      <td>
        <input 
        type="checkbox" 
        checked={ item.done }
        onChange={ onToggle }
        />
      </td>
    </tr>
  );
}
export default TodoRow;