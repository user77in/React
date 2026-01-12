import { useState } from "react";

export function useToggle(defaultValue) {
  const [state, setState] = useState(defaultValue);
  const toggleState = (state) => {
    setState((currentState) =>
      typeof state === "boolean" ? state : !currentState
    );
  };

  return [state, toggleState];
}

export default function ToggleComponent() {
  const [value, toggleValue] = useToggle(false);

  return (
    <>
      <div>Current state {value.toString()}</div>
      <div onClick={toggleValue}>Toggle</div>
      <div onClick={() => toggleValue(true)}>Turn to True</div>
      <div onClick={() => toggleValue(false)}>Turn to False</div>
    </>
  );
}
