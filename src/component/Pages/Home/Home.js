import React from "react";
import Header from "../../component/Header/Header";
import Calendar from "../../Calendar/Calendar.js";
import Footer from "../../component/footer/Footer.js";
import "../../assets/css/home.css"

function Home() {
  return (
    <>
      <Header/>
      <section>
        <div className="containerHomer">
          <h1 className="tituloPagina">Calendario Semanal</h1>
          <Calendar className="Calendar"></Calendar>
          </div>
      </section>
      <Footer/>
    </>
  );
}

export default Home;