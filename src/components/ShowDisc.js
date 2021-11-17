import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';

// This page shows all discs
const URL = 'http://localhost/verkkopalveluprojekti2021-backend/product/getproductbycategory.php?id=';

export default function ShowDiscs() {
  const [products, setProducts] = useState([]);

  //Disc category id
  const id = 2;
  const address = URL + id;

  useEffect(() => {
    axios
      .get(address)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <div className="col-8 offset-2">
      <h1>Kiekot</h1>
      <hr />
      {products.map((item) => (
        <div className="items">
          <ListGroupItem key={item.product_id}>
            <ListGroupItemHeading>{item.name}</ListGroupItemHeading>
            <img src="https://via.placeholder.com/150" alt="Placeholder image" />
            <ListGroupItemText>Hinta {item.price}</ListGroupItemText>
            <Link to="/product">Tiedot</Link>
          </ListGroupItem>
        </div>
      ))}
    </div>
  );
}
