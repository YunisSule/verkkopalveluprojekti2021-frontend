import React from 'react';
import { useState, useEffect } from 'react';
import { ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { Link } from 'react-router-dom';
import axiosInstance from '../axios';

export default function Frontpage() {
  const image_path = 'http://localhost/verkkopalveluprojekti2021-backend/images/';
  const [item, setItem] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    //Random Item of the Month
    axiosInstance
      .get('/product/getrandomproducts.php?count=1')
      .then((response) => {
        setItem(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  useEffect(() => {
    //Random 3 items on frontpage
    axiosInstance
      .get('/product/getrandomproducts.php?count=3')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <div>
      <div className="d-flex flex-column justify-content-center mb-3" id="banner">
        <h1 className="text-center" id="header">
          Frisbeekauppa
        </h1>
        <p className="text-center" id="text">
          Kiekkojen erikiosliike<br></br>Parhaat tarjoukset, isoin valikoima, nopea toimitus
        </p>
      </div>

      <div className="col text-center">
        <h2 style={{ marginTop: '50px' }}>Kuukauden tuote</h2>
        {item.map((item) => (
          <div className="productOfTheMonth">
            <ListGroupItem>
              <ListGroupItemHeading style={{ margin: '30px' }}>{item.name}</ListGroupItemHeading>
              <Link to={{ pathname: '/product', state: { id: item.product_id } }}>
                <img className="image_150px" src={image_path + item.image_path} alt="Product image" />
              </Link>
              <ListGroupItemText style={{ margin: '20px' }}>Hinta {item.price}</ListGroupItemText>
            </ListGroupItem>
          </div>
        ))}
      </div>

      <div className="col-6 text-center offset-3">
        <h3>Suosittuja tuotteita</h3>
        <hr />
        {products.map((item) => (
          <div className="items">
            <ListGroupItem style={{ marginBottom: '100px' }}>
              <ListGroupItemHeading style={{ margin: '30px' }}>{item.name}</ListGroupItemHeading>
              <Link to={{ pathname: '/product', state: { id: item.product_id } }}>
                <img className="image_150px" src={image_path + item.image_path} alt="Product image" />
              </Link>
              <ListGroupItemText style={{ margin: '20px' }}>Hinta {item.price}</ListGroupItemText>
            </ListGroupItem>
          </div>
        ))}
      </div>
    </div>
  );
}
