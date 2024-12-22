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

function PackingList({ items, onDeleteItem, onToggleItems, onDeleteList }) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems;

  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));

  if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.isPacked) - Number(b.isPacked));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItems={onToggleItems}
          />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input"> Sort by input order </option>
          <option value="description"> Sort by description </option>
          <option value="packed"> Sort by packed status </option>
        </select>

        <button onClick={onDeleteList}> Clear Items </button>
      </div>
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

function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        {" "}
        <em> Start adding some items to your packing list </em>{" "}
      </p>
    );

  const itemsNumber = items.length;
  const packedItemsNumber = items.filter((item) => item.isPacked).length;
  const percentage = Math.round((packedItemsNumber / itemsNumber) * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100
          ? "You got everything! Ready to go"
          : `   You have ${itemsNumber} items on your list, and you already packed
        ${packedItemsNumber} (${percentage}%)`}
      </em>
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

  function handleDeleteList() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );

    if (confirmed) setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItems}
        onToggleItems={handleToggleItem}
        onDeleteList={handleDeleteList}
      />
      <Stats items={items} />
    </div>
  );
}
