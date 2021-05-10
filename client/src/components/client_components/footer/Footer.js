// @flow 
import * as React from "react";
import type { RouterHistory } from "react-router-dom";
// css //
import styles from "./css/footer.module.css";

type Props = {
  history: RouterHistory
}
const Footer = ({ history } : Props): React.Node => {
  
  const goToAdmin = () => {
    history.push("/admin/dash");
  }
  return(
    <footer className={`footer ${ styles.footerMain }`}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-4">
            <span className={ `${"copyright"} ${styles.copyright}` }>Copyright &copy; Hotel 2021</span>
          </div>
          <div className="col-md-4">
            <ul className="list-inline social-buttons">
              <li className="list-inline-item">
                <a href="#">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#">
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <ul className="list-inline quicklinks">
              <li className="list-inline-item">
                <a href="#">Privacy Policy</a>
              </li>
              <li className="list-inline-item">
                <a href="#">Terms of Use</a>
              </li>
              <li className="list-inline-item">
                <a href="#" onClick={ goToAdmin }>Admin</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;