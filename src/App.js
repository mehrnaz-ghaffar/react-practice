import { useState } from "react";

export default function App() {
  const [step, setStep] = useState(1);
  const [count, setCount] = useState(0);
  const date = new Date();
  date.setDate(date.getDate() + count);

  function handleStep() {
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
  function resetCounter() {
    setCount(0);
    setStep(1);
  }

  return (
    <>
      <div>
        <input
          value={step}
          type="range"
          min={0}
          max={10}
          onChange={(e) => setStep(Number(e.target.value))}
        />
        step {step}
        {/* 
        <button onClick={handleDecStep}>-</button>
        <span>Step: {step}</span>
        <button onClick={handleAddStep}>+</button> */}
      </div>
      <div>
        <button onClick={handleDecCount}>-</button>
        <input
          value={count}
          type="text"
          onChange={(e) => setCount(Number(e.target.value))}
        />
        <button onClick={handleAddCount}>+</button>

        <span>Count: {count}</span>
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
      {count !== 0 || step !== 1 ? (
        <button onClick={resetCounter}>reset</button>
      ) : null}
    </>
  );
}
