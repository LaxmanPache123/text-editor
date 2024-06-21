import React from "react";
import "./App.css";
import MuiTextEditor from "./lib/components/MuiTextEditor";
import { timestampPlugin } from "./lib/components/plugin/timestampPlugin";

function App() {
  const plugins = [timestampPlugin];

  return (
    <div className="App">
      <h1>Simple Text Editor</h1>
      <MuiTextEditor plugins={plugins} width="100%" height={500} />
    </div>
  );
}

export default App;
