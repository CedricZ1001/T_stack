import React from "react";
import ReactDOM from "react-dom/client";
//import "./index.css";
import styles from "./index.module.css";
import logo from "./logo192.png";

const name = "CedricZ1";

const obj = {
    firstName: "Cedric",
    lastName: "Chen",
};

function formatName(name) {
    return name.firstName + " " + name.lastName;
}

const greet = <div>good</div>;
const show = true;
const a = [0, 1, 2];

const jsx = (
    <div className={styles.app}>
        <div>hello,{name}</div>
        <div>{formatName(obj)}</div>
        {show ? greet : "yes"}
        <ul>
            {a.map((item) => (
                <li key={item}>{item}</li>
            ))}
        </ul>
        <img
            src={logo}
            alt="logo"
            // className="logo"
            className={styles.logo}
            style={{ width: "88px", height: "88px" }}
        />
    </div>
);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(jsx);
