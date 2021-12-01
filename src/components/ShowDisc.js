import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import axiosInstance from '../axios';

export default function ShowDiscs() {
  const image_path = 'http://localhost/verkkopalveluprojekti2021-backend/images/';
  const [products, setProducts] = useState([]);

  //Disc category id
  const id = 1;

  useEffect(() => {
    axiosInstance
      .get(`/product/getproductbycategory.php?id=${id}`)
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
            <Link to={{ pathname: '/product', state: { id: item.product_id } }}>
              <img className="image_150px" src={image_path + item.image_path} alt="Product image" />
            </Link>
            <ListGroupItemText>Hinta {item.price}</ListGroupItemText>
          </ListGroupItem>
        </div>
      ))}
    </div>
  );
}
