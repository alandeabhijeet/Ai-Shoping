import React from "react";

const FlashMessage = ({ message, onClose }) => {
  return (
    <div style={styles.flashContainer}>
      <span style={styles.message}>{message}</span>
      <button style={styles.closeButton} onClick={onClose}>
        X
      </button>
    </div>
  );
};

const styles = {
  flashContainer: {
    position: "fixed",
    top: "10px",
    right: "10px",
    backgroundColor: "red",
    color: "white",
    padding: "10px 20px",
    borderRadius: "5px",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  message: {
    marginRight: "10px",
  },
  closeButton: {
    background: "transparent",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default FlashMessage;
