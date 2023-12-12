import React from "react";
import "../../assets/css/Footer.css";
import gitIcon from "../../assets/icon/gitHub.png"
import youtubeIcon from "../../assets/icon/youtube.png"
import linkedinIcon from "../../assets/icon/linkedin.png"


function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Informações de Contato</h3>
          <p>Endereço: Rua Celeiro, Gondor</p>
          <p>Email: douglaslessat@gmail.com</p>
          
        </div>
        <div className="footer-section">


        </div>
        <div className="footer-section">
          <h3>Social Media</h3>
          <div className="social-icons">
            <a href="https://github.com/privateclasswizard" target="_blank" rel="noopener noreferrer">
              <img src={gitIcon} className="iconSocial"/>
            </a>
            <a href="https://www.linkedin.com/in/douglaslessat/" target="_blank" rel="noopener noreferrer">
              <img src={linkedinIcon} className="iconSocial"/>
            </a>
            <a href="https://www.youtube.com/watch?v=AkAPpV5W17E" target="_blank" rel="noopener noreferrer">
              <img src={youtubeIcon} className="iconSocial"/>
            </a>

          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} privateclasswizard. Todos os direitos reservados a mestre mago James.</p>
        <a href="https://www.youtube.com/watch?v=N0oRYCivKrs"> Isso nao e feitiçaria e tecnologia</a>
      </div>
    </footer>
  );
}

export default Footer;