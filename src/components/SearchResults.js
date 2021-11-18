import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { useLocation } from 'react-router';

// This page shows search results
const URL = 'http://localhost/verkkopalveluprojekti2021-backend/product/searchproduct.php?query=';
const image_path = 'http://localhost/verkkopalveluprojekti2021-backend/images/';

export default function SearchResults() {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const { query } = location.state;

  const address = URL + query;

  useEffect(() => {
    axios
      .get(address)
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <div className="col-8 offset-2">
      <h1>Hakutulokset</h1>
      <hr />
      {products.map((item) => (
        <div className="items">
          <ListGroupItem key={item.product_id}>
            <ListGroupItemHeading>{item.name}</ListGroupItemHeading>
            <img className="image_150px" src={image_path + item.image_path} alt="Product image" />
            <ListGroupItemText>Hinta {item.price}</ListGroupItemText>
            <Link to={{ pathname: '/product', state: { id: item.product_id } }}>Tiedot</Link>
          </ListGroupItem>
        </div>
      ))}
    </div>
  );
}
