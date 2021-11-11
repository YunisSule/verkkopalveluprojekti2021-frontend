import { Link } from 'react-router-dom';
import Logo from '../images/FribashopLogoFooter.jpg';

export default function Footer() {
  return (
    <>
      <footer id="footer" className="container p-4 text-white ">
        <div id="footerContent" className="row">
          <table className="col-lg-4 col-md-4 mb-4 mb-md-0">
            <tbody>
              <tr>
                <th>Yhteystiedot</th>
              </tr>
              <tr>
                <td>Puh: 12345678</td>
              </tr>
              <tr>
                <td>fribashop@sahkoposti.com</td>
              </tr>
              <tr>
                <td>Jokukatu 23 90100 Oulu</td>
              </tr>
            </tbody>
          </table>
          <table className="col-lg-4 col-md-4 mb-4 mb-md-0">
            <tbody>
              <tr>
                <th>Tietoja</th>
              </tr>
              <tr>
                <td>
                  <Link to="/Käyttöehdot">Käyttöehdot</Link>
                </td>
              </tr>
              <tr>
                <td>
                  <Link to="/yrityksestä">Yrityksestä</Link>
                </td>
              </tr>
              <tr>
                <td>
                  <Link to="/Q&A">Q&A</Link>
                </td>
              </tr>
            </tbody>
          </table>
          <img src={Logo} alt="Logo" className="col-lg-4 d-none d-lg-block " />
        </div>
      </footer>
      <div id="footerBottom" className="text-white bg-black">
        <p>&copy; Ryhmä 11</p>
      </div>
    </>
  );
}
