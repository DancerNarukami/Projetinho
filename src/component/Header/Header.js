import React, { useState } from "react";
import "../../assets/css/navBar.css";
// import { logo } from "../assets/icon/Tech.svg";
import btnmenu from "../../assets/icon/list.svg"
import Sidebar from "./Sidebar/index.jsx"
import "./styles.js"
import { Link } from "react-router-dom";
import logo from "../../assets/img/LOTRGondorTree.svg"

function Header() {
  const [sidebar, setSidebar] = useState(false);

  const ShowSiderBar= () => setSidebar(!sidebar);

  return (
    <header>
      <nav className="navbar">
        <div className="div-logo">
          <img src={logo} className="logo nav"/>
          <div className="divcontainertitulo">
          <Link to="/" className="Links">
          <div className="logo-titulo">
            <a href="/" className="Ensala">
              Ensalamento
            </a>
            <a href="/" className="mento">
              Gondor
            </a>
          </div>
          </Link>
          </div>
        </div>
        <button className="btnMobile" onClick={ShowSiderBar}>
        {sidebar && <Sidebar className="sidebar" active={setSidebar}/>} 
        <img src={btnmenu}/> </button>
      </nav>
    </header>
  );
}

export default Header;