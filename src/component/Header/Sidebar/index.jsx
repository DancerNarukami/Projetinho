import React from "react";
import { Container, Content } from "./styles";
// import { FaUserAlt } from "react-icons/fa";
import "../../../assets/css/navBar.css";
import bntmenuactive from "../../../assets/icon/bnt-menu-active.svg";

// import SidebarItem from "../SidebarItem/Sidebaritem";
import SidebarButton1 from "../Sidebarbutton1";
// import SidebarButton2 from "../Sidebarbutton2";

import { Link } from "react-router-dom";


const Sidebar = ({ active }) => {
  const closeSidebar = () => {
    active(false);
  };

  return (
    <Container sidebar={active}>
      <img src={bntmenuactive} onClick={closeSidebar} />
      <Content>
        <Link to="/FormCurso" className="Links">
          <SidebarButton1 Text="Cadastro Curso" />
        </Link>
        <Link to="/FormPeriodo" className="Links">
          <SidebarButton1 Text="Cadastro Periodo" />
        </Link>
        <Link to="/FormProfessor" className="Links">
          <SidebarButton1 Text="Cadastro Professor" />
        </Link>
        <Link to="/FormSala" className="Links">
          <SidebarButton1 Text="Cadastro Sala" />
        </Link>
        <Link to="/FormMateria" className="Links">
          <SidebarButton1 Text="Cadastro Materias" />
        </Link>
      </Content>
    </Container>
  );
};

export default Sidebar;