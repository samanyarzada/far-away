import { useState } from "react";

export default function App() {
  // Main state: stores all packing list items
  const [items, setItems] = useState([]);

  // Add a new item to the items array
  function handleAddItem(item) {
    setItems([...items, item]);
  }

  // Delete an item using its id
  function handleDeleteItem(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  // Toggle the packed status of a specific item
  function handleCheckItem(id) {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item,
      ),
    );
  }

  return (
    <div className="app">
      <Logo />

      {/* Pass the add function and items to the Form component */}
      <Form onHandleAddItem={handleAddItem} items={items} />

      {/* Pass items and handler functions to the PackingList component */}
      <PackingList
        items={items}
        onHandleDeleteItem={handleDeleteItem}
        onHandleCheckItem={handleCheckItem}
      />
    </div>
  );
}

function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>;
}

function Form({ onHandleAddItem, items }) {
  // State for the item description input
  const [description, setDescription] = useState("");

  // State for the selected quantity
  const [quantity, setQuantity] = useState(1);

  // State for displaying validation errors
  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    // Validate the input before creating a new item
    if (description.trim().length < 3) {
      setErrorMessage("Invalid Input!");
      return;
    }

    // Create a new item object
    const newItem = {
      id: items.length + 1,
      description: description.trim(),
      quantity,
      packed: false,
    };

    // Send the new item to the parent component
    onHandleAddItem(newItem);

    // Reset the form after adding the item
    setDescription("");
    setQuantity(1);
    setErrorMessage("");
  }

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <h3>What do you need for your 😍 trip?</h3>

      {/* Select the quantity of the item */}
      <select
        onChange={(e) => setQuantity(Number(e.target.value))}
        value={quantity}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>

      {/* Input for the item description */}
      <input
        onChange={(e) => setDescription(e.target.value)}
        type="text"
        placeholder="Item..."
        value={description}
      />

      <button>Add</button>

      {/* Display the error message only when it exists */}
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
}

function PackingList({ items, onHandleDeleteItem, onHandleCheckItem }) {
  return (
    <div className="list">
      <ul>
        {/* Render every item in the packing list */}
        {items?.map((item) => (
          <li key={item.id}>
            {/* Toggle the packed status when the checkbox is clicked */}
            <input
              type="checkbox"
              checked={item.packed}
              onChange={() => onHandleCheckItem(item.id)}
            />

            {/* Add a line-through when the item is packed */}
            <span style={item.packed ? { textDecoration: "line-through" } : {}}>
              {item.quantity} {item.description}
            </span>

            {/* Delete the current item */}
            <button onClick={() => onHandleDeleteItem(item.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
