// Undo Plugin
export const undoPlugin = {
  name: "Undo",
  button: {
    label: "Undo",
    onClick: (editorRef) => {
      if (editorRef.current) {
        editorRef.current.focus();
        document.execCommand("undo", false, null);
      }
    },
  },
};
