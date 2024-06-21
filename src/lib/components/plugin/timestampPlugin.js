// Example plugin: Insert current timestamp
export const timestampPlugin = {
  name: "Timestamp",
  button: {
    label: "Insert Timestamp",
    onClick: (editorRef) => {
      const timestamp = new Date().toLocaleString();
      if (editorRef.current) {
        editorRef.current.focus();
        document.execCommand("insertText", false, timestamp);
      }
    },
  },
};
