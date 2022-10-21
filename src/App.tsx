import { useState, useEffect } from "react";
import Dashboard from "./Dashboard";
import { Provider } from "./globalVariables/dataContext";
import "./app.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Provider>
      <div className="App">
        <Dashboard />
      </div>
    </Provider>
  );
}

export default App;
