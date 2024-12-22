import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

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
