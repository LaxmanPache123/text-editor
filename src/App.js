import React, { useState } from "react";
import "./App.css";
import MuiTextEditor from "./lib/components/MuiTextEditor";
import { timestampPlugin } from "./lib/components/plugin/timestampPlugin";

function App() {
  const plugins = [timestampPlugin];
  const [editorValue, setEditorValue] = useState("");

  return (
    <div className="App">
      <h1>Simple Text Editor</h1>
      <MuiTextEditor
        plugins={plugins}
        setEditorValue={setEditorValue}
        editorValue={editorValue}
        width="100%"
        height={500}
      />
    </div>
  );
}

export default App;
