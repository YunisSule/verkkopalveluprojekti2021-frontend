import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { useLocation } from 'react-router';
import axiosInstance from '../axios';
import { IMAGE_PATH } from '../config';
import ListItem from '../components/ListItem';

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
    <div className="text-center">
      <h1 className="my-3">Hakutulokset</h1>
      <div className="items">
        {products.map((item) => (
          <ListItem key={item.product_id} item={item} />
        ))}
      </div>
    </div>
  );
}
