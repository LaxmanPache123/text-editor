import React, { useRef, useState, useEffect } from "react";
import Toolbar from "./ToolBar";

const DEFAULT_MENUS = [
  { label: "Bold", command: "bold", active: false },
  { label: "Italic", command: "italic", active: false },
  { label: "Underline", command: "underline", active: false },
];

const MuiTextEditor = ({ defaultValue = "", plugins = [] }) => {
  const editorRef = useRef(null);
  const [editorValue, setEditorValue] = useState(defaultValue);
  const [isHtmlView, setIsHtmlView] = useState(false);
  const [formatStates, setFormatStates] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  useEffect(() => {
    if (editorRef.current && !isHtmlView) {
      editorRef.current.innerHTML = defaultValue;
    }
  }, [defaultValue, isHtmlView]);

  const handleInput = () => {
    setEditorValue(editorRef.current.innerHTML);
  };

  /**
   * Handles focus event for the editor. If the editor content is empty,
   * it sets the cursor at the beginning of the editor.
   *
   * @returns {void}
   */
  const handleFocus = () => {
    if (editorRef.current.innerText.trim() === "") {
      const range = document.createRange();
      const sel = window.getSelection();
      range.setStart(editorRef.current, 0); // Sets the start position of the range at the beginning of the editor
      range.collapse(true); // Collapses the range to the start position
      sel.removeAllRanges(); // Clears all existing selections
      sel.addRange(range); // Adds the created range to the selection
    }
  };

  const handleBlur = () => {
    console.log("Editor blurred");
  };

  /**
   * Executes a text formatting command using document.execCommand and updates the formatting state.
   *
   * @param {string} command - The text formatting command to execute (e.g., 'bold', 'italic', 'underline').
   * @returns {void}
   */

  const formatText = (command) => {
    document.execCommand(command, false, null); // Executes the text formatting command

    // Updates the formatting state based on the executed command
    setFormatStates((prevState) => ({
      ...prevState,
      [command]: !prevState[command],
    }));
  };

  const getButtonStyle = (active) => ({
    fontWeight: active ? "bold" : "normal",
    backgroundColor: active ? "#ddd" : "#fff",
  });

  const handleTextareaChange = (e) => {
    setEditorValue(e.target.value);
  };

  /**
   * Toggles between HTML view and Normal view modes of the editor.
   * Updates the editor content based on the current view mode.
   *
   * @returns {void}
   */
  const toggleView = () => {
    setIsHtmlView(!isHtmlView);
    if (isHtmlView) {
      setTimeout(() => {
        if (editorRef.current) {
          editorRef.current.innerHTML = editorValue;
        }
      }, 10);
    }
  };

  const enhancedMenuItems = [...DEFAULT_MENUS].map((item) => ({
    ...item,
    active: formatStates[item.command],
  }));

  /**
   * Initiates resizing of an <img> element when clicked and dragged.
   * Mouse events are used to dynamically resize the image element.
   *
   * @param {MouseEvent} e - The mousedown event triggering the resize action.
   * @returns {void}
   */
  const initiateResize = (e) => {
    e.preventDefault();
    const img = e.target; // The <img> element being resized
    const startX = e.clientX; // Initial X coordinate of mouse pointer
    const startY = e.clientY; // Initial Y coordinate of mouse pointer
    const startWidth = parseInt(
      document.defaultView.getComputedStyle(img).width,
      10
    ); // Initial width of the <img> element
    const startHeight = parseInt(
      document.defaultView.getComputedStyle(img).height,
      10
    ); // Initial height of the <img> element

    /**
     * Handles the mousemove event to resize the <img> element dynamically.
     *
     * @param {MouseEvent} dragEvent - The mousemove event for resizing.
     * @returns {void}
     */
    const doDrag = (dragEvent) => {
      img.style.width = startWidth + dragEvent.clientX - startX + "px";
      img.style.height = startHeight + dragEvent.clientY - startY + "px";
    };

    /**
     * Stops the resizing process when the mouse button is released.
     *
     * @returns {void}
     */
    const stopDrag = () => {
      document.documentElement.removeEventListener("mousemove", doDrag, false);
      document.documentElement.removeEventListener("mouseup", stopDrag, false);
    };

    document.documentElement.addEventListener("mousemove", doDrag, false);
    document.documentElement.addEventListener("mouseup", stopDrag, false);
  };

  /**
   * Handles the paste event to detect and insert images from clipboard into the editor.
   *
   * @param {ClipboardEvent} e - The paste event containing clipboard data.
   * @returns {void}
   */
  const handlePaste = (e) => {
    e.preventDefault(); // Prevents the default paste behavior to handle it manually
    const items = e.clipboardData.items; // Gets the items from clipboard data
    for (let i = 0; i < items.length; i++) {
      // Checks if the item is an image
      if (items[i].type.indexOf("image") !== -1) {
        const blob = items[i].getAsFile(); // Gets the image blob data
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = document.createElement("img");
          img.src = event.target.result;
          img.style.maxWidth = "100%";
          img.style.cursor = "nwse-resize";
          img.addEventListener("mousedown", initiateResize);
          editorRef.current.appendChild(img);
          handleInput(); // Update the editor content
        };
        reader.readAsDataURL(blob); // Reads the image blob as a data URL
      }
    }
  };

  return (
    <div>
      <Toolbar
        menuItems={enhancedMenuItems}
        formatText={formatText}
        toggleView={toggleView}
        isHtmlView={isHtmlView}
        getButtonStyle={getButtonStyle}
        plugins={plugins}
        editorRef={editorRef}
      />
      {isHtmlView ? (
        <textarea
          value={editorValue}
          onChange={handleTextareaChange}
          style={{ textAlign: "left", minWidth: "98.5%", ...styles.editor }}
        />
      ) : (
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{ ...styles.editor, textAlign: "left" }}
          placeholder="Type something..."
          onPaste={handlePaste}
        ></div>
      )}
    </div>
  );
};

const styles = {
  editor: {
    border: "1px solid #ccc",
    padding: "10px",
    minHeight: "400px",
    outline: "none",
    whiteSpace: "pre-wrap",
    wordWrap: "break-word",
  },
};

export default MuiTextEditor;
