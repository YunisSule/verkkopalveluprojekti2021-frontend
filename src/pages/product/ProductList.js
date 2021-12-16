import { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import ListItem from '../../components/ListItem';

export default function ProductList({ title, categoryId }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`/product/getproductbycategory.php?id=${categoryId}`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  }, [categoryId]);

  return (
    <div className="text-center">
      <h1 className="my-3">{title}</h1>
      <div className="items">
        {products.map((item) => (
          <ListItem key={item.product_id} item={item} />
        ))}
      </div>
    </div>
  );
}
