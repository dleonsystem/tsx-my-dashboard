import React from "react";

const Spinner: React.FC = () => {
  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#181825",
      color: "white"
    }}>
      <div style={{
        width: 50,
        height: 50,
        border: "5px solid #ccc",
        borderTop: "5px solid #61dafb",
        borderRadius: "50%",
        animation: "spin 1s linear infinite"
      }} />
      <style>
        {`@keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }`}
      </style>
    </div>
  );
};

export default Spinner;
