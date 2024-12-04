import { useState } from "react";

export default function App() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);
  const date = new Date();
  date.setDate(date.getDate() + count);

  function handleAddStep() {
    setStep((currStep) => currStep + 1);
  }

  function handleDecStep() {
    setStep((currStep) => currStep - 1);
  }

  function handleAddCount() {
    setCount((currCount) => currCount + step);
  }
  function handleDecCount() {
    setCount((currCount) => currCount - step);
  }

  return (
    <>
      <div>
        <button onClick={handleDecStep}>-</button>
        <span>Step: {step}</span>
        <button onClick={handleAddStep}>+</button>
      </div>
      <div>
        <button onClick={handleDecCount}>-</button>
        <span>Count: {count}</span>
        <button onClick={handleAddCount}>+</button>
      </div>

      <div>
        <span>
          {count === 0
            ? "today is "
            : count >= 1
            ? `${count} days from now is `
            : ` ${Math.abs(count)} days ago was `}
        </span>
        <span>{date.toDateString()}</span>
      </div>
    </>
  );
}
