import { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Row, Button } from 'reactstrap';
import { useLocation } from 'react-router';

const URL = 'http://localhost/verkkopalveluprojekti2021-backend/product/getproductbyid.php?id=';

export default function Productpage() {
  const [item, setItem] = useState([]);
  const [criteria, setCriteria] = useState('');
  const location = useLocation();
  const { id } = location.state;

  const id1 = id;

  // addToCart(id) {

  // }

  useEffect(() => {
    const address = URL + id1;

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
            <figure id="product-image">
              <picture>
                <source />
                <img src="https://via.placeholder.com/1200" alt="Placeholder image" className="img-fluid  ml-10 mr-10" />
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
                  <p id="product-stock">Tuotteita varastossa: 9+</p>
                </div>
                <Button /*onClick={addToCart}*/ className="btn btn-lg mb-3 ml-auto ml-lg-3" id="add-to-cart-button">
                  <span>Lisää ostoskoriin</span>
                </Button>
              </div>
            </div>
          </section>
          <section>
            <div id="product-description">
              <h4>Tuotekuvaus</h4>
              <p>Erittäin hieno valmistajan valmistama frisbee.</p>
            </div>
          </section>
        </Col>
      </Row>
    </>
  );
}
