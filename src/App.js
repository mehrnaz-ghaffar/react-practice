import { useState } from "react";

function Logo() {
  return <h1> 🏝️ Far Away 🧳 </h1>;
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;
    const newItem = { quantity, description, isPacked: false, id: Date.now() };

    console.log("newItemmmmmm", newItem);
    onAddItem(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>

      <input
        value={description}
        type="text"
        placeholder="Items..."
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onDeleteItem, onToggleItems }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItems={onToggleItems}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItems }) {
  return (
    <li>
      <input
        value={item.isPacked}
        type="checkbox"
        onChange={() => onToggleItems(item.id)}
      />
      <span style={item.isPacked ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X on your list, and you already packed X (X%)</em>
    </footer>
  );
}

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(newItem) {
    setItems((currItems) => [...currItems, newItem]);
  }

  function handleDeleteItems(id) {
    setItems((currItems) => currItems.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((currItems) =>
      currItems.map((item) => {
        return item.id === id ? { ...item, isPacked: !item.isPacked } : item;
      })
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItems}
        onToggleItems={handleToggleItem}
      />
      <Stats />
    </div>
  );
}
