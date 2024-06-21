import React from "react";
import "./App.css";
import MuiTextEditor from "./lib/components/MuiTextEditor";

function App() {
  const menuItems = [
    { label: "Bold", command: "bold", active: false },
    { label: "Italic", command: "italic", active: false },
    { label: "Underline", command: "underline", active: false },
  ];

  return (
    <div className="App">
      <h1>Simple Text Editor</h1>
      <MuiTextEditor menuItems={menuItems} width="100%" height={500} />
    </div>
  );
}

export default App;
