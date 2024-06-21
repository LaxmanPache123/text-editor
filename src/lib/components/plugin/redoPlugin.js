// Redo Plugin
export const redoPlugin = {
  name: "Redo",
  button: {
    label: "Redo",
    onClick: (editorRef) => {
      if (editorRef.current) {
        editorRef.current.focus();
        document.execCommand("redo", false, null);
      }
    },
  },
};
