import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { IMAGE_PATH } from '../App';
import axiosInstance from '../axios';

export default function ShowBags() {
  const [products, setProducts] = useState([]);

  //Bags category id
  const id = 2;

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
      <h1>Kassit</h1>
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
