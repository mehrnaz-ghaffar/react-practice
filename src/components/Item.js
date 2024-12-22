export default function Item({ item, onDeleteItem, onToggleItems }) {
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
