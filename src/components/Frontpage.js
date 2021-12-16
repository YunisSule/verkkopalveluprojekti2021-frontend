import React from 'react';
import { useState, useEffect } from 'react';
import { ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { Link } from 'react-router-dom';
import axiosInstance from '../axios';
import { IMAGE_PATH } from '../App';

export default function Frontpage() {
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
          Kiekkojen erikoisliike
          <br />
          Parhaat tarjoukset, isoin valikoima, nopea toimitus
        </p>
      </div>

      <div className="col text-center">
        <h2 style={{ marginTop: '50px' }}>Kuukauden tuote</h2>
        {item.map((item) => (
          <div className="items">
            <ListGroupItem>
              <ListGroupItemHeading>{item.name}</ListGroupItemHeading>
              <Link to={{ pathname: '/product', state: { id: item.product_id } }}>
                <img className="image_150px" src={IMAGE_PATH + item.image_path} alt="Product" />
              </Link>
              <ListGroupItemText>Hinta {item.price}</ListGroupItemText>
            </ListGroupItem>
          </div>
        ))}
      </div>

      <div className="products">
        <hr />
        <h3>Suosittuja tuotteita</h3>
        {products.map((item) => (
          <div className="items">
            <ListGroupItem>
              <ListGroupItemHeading>{item.name}</ListGroupItemHeading>
              <Link to={{ pathname: '/product', state: { id: item.product_id } }}>
                <img className="image_150px" src={IMAGE_PATH + item.image_path} alt="Product" />
              </Link>
              <ListGroupItemText>Hinta {item.price}</ListGroupItemText>
            </ListGroupItem>
          </div>
        ))}
      </div>
    </div>
  );
}
