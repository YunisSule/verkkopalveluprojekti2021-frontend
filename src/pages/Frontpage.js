import React from 'react';
import { useState, useEffect } from 'react';
import axiosInstance from '../axios';
import ListItem from '../components/ListItem';

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
        <h3 className="py-3">Kuukauden tuote</h3>
        <div className="items">
          {item.map((item) => (
            <ListItem key={item.product_id} item={item} />
          ))}
        </div>
      </div>

      <div className="col text-center">
        <h3 className="pb-3">Suosittuja tuotteita</h3>
        <div className="items">
          {products.map((item) => (
            <ListItem key={item.product_id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
