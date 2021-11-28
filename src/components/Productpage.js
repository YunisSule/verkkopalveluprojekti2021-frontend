import { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Row, Button, Container } from 'reactstrap';
import { useLocation } from 'react-router';

const URL = 'http://localhost/verkkopalveluprojekti2021-backend/product/getproductbyid.php?id=';
const image_path = 'http://localhost/verkkopalveluprojekti2021-backend/images/';

export default function Productpage({addToCart}) {
  const [item, setItem] = useState([])
  const location = useLocation()
  const { id } = location.state

  useEffect(() => {
    const address = URL + id;

    axios
      .get(address)
      .then((response) => {
        console.log(response.data);
        if (response.data != null) {
          setItem(response.data[0]);
        } else {
          alert('Product not found');
        }
      })
      .catch((error) => {
        alert(error.response ? error.response.data.error : error);
      });
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Col className="bd-highlight" id="product-header">
            <h1 className="text-center">
              <span id="product-brand">{item.brand}</span>
              <span id="product-name">{item.name}</span>
            </h1>
          </Col>
        </Row>
        <Row>
          <Col md={4} className="text-end" id="product-media">
            <div>
              <figure className="p-md-0 p-5" id="product-image">
                <picture>
                  <source />
                  <img src={image_path + item.image_path} alt="Product image" className="img-fluid  ml-10 mr-10" />
                </picture>
              </figure>
            </div>
          </Col>
          <Col md={8} className="" id="product-data">
            <section>
              <div id="product-price">{item.price}€</div>
            </section>
            <section>
              <div className="fullwidth-sm">
                <div className="d-flex align-items-center" id="add-to-cart">
                  <div className="me-auto">
                    <p id="product-stock">Tuotteita varastossa: {item.stock}</p>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <div id="product-description">
                <p>Väri: {item.color}</p>
                {item.speed ? (<ul className='d-flex list-unstyled text-center'>
                  <li>
                    <span>Nopeus</span>
                    <p>{item.speed}</p>
                  </li>
                  <li className="disc-properties">
                    <span>Liito</span>
                    <p>{item.glide}</p>
                  </li>
                  <li className="disc-properties">
                    <span>Vakaus</span>
                    <p>{item.turn}</p>
                  </li>
                  <li className="disc-properties">
                    <span>Feidi</span>
                    <p>{item.fade}</p>
                  </li>
                </ul>) : null}

              </div>
            </section>
            <section>
              <div>
                <h4>Tuotekuvaus</h4>

                <p>{item.description}</p>
              </div>
            </section>
            <div>
              <Button
                  onClick={e => addToCart(item)} className='btn btn-lg mb-3 ml-auto ml-lg-3'
                id='add-to-cart-button'
              >
                <span>Lisää ostoskoriin</span>
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
