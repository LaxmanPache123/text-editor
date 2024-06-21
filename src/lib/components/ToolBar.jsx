import React from "react";

const Toolbar = ({
  menuItems,
  formatText,
  toggleView,
  isHtmlView,
  getButtonStyle,
  editorRef,
  plugins,
}) => {
  const handlePluginClick = (plugin) => {
    if (plugin.button.onClick) {
      plugin.button.onClick(editorRef);
    }
  };
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
      {plugins.map((plugin, index) => (
        <button key={index} onClick={() => handlePluginClick(plugin)}>
          {plugin.button.label}
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
