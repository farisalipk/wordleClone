import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App
      onKeyDown={(event) => {
        console.log(event.key);
      }}
    />
  </React.StrictMode>,
  document.getElementById("root")
);
