import React from "react";

const Toolbar = ({ menuItems, formatText, toggleView, isHtmlView, getButtonStyle }) => {
  return (
    <div style={styles.toolbar}>
      {menuItems.map((item) => (
        <button
          key={item.command}
          onClick={() => formatText(item.command)}
          style={getButtonStyle(item.active)}
        >
          {item.label}
        </button>
      ))}
      <button onClick={toggleView}>
        {isHtmlView ? "Normal View" : "HTML View"}
      </button>
    </div>
  );
};

const styles = {
  toolbar: {
    marginBottom: "10px",
  },
};

export default Toolbar;
