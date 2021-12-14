import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { useLocation } from 'react-router';
import axiosInstance from '../axios';
import { IMAGE_PATH } from '../App';

export default function SearchResults() {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const { query } = location.state;

  useEffect(() => {
    axiosInstance
      .get(`/product/searchproduct.php?query=${query}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  }, [query]);

  return (
    <div className="products">
      <h1>Hakutulokset</h1>
      <hr />
      {products.map((item) => (
        <div className="items">
          <ListGroupItem key={item.product_id}>
            <ListGroupItemHeading>{item.name}</ListGroupItemHeading>
            <Link to={{ pathname: '/product', state: { id: item.product_id } }}>
              <img className="image_150px" src={IMAGE_PATH + item.image_path} alt="Product" />
            </Link>
            <ListGroupItemText>Hinta {item.price}</ListGroupItemText>
          </ListGroupItem>
        </div>
      ))}
    </div>
  );
}
