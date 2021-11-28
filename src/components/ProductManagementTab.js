import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Spinner, Table } from 'reactstrap';
import EditProductModal from './EditProductModal';

export default function ProductManagementTab() {
  const baseURL = 'http://localhost/verkkopalveluprojekti2021-backend';
  const MAX_LENGTH = 100;
  const [products, setProducts] = useState([]);
  const [clickedProduct, setClickedProduct] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const modalShow = () => setOpenModal(true);
  const modalHide = () => setOpenModal(false);

  const fetchProducts = () => {
    try {
      axios.get(`${baseURL}/product/getallproducts.php`).then((res) => {
        setProducts(res.data);
      });
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [openModal]);

  return (
    <Container>
      <h2 className="text-center mt-3">Tuotteiden hallinta</h2>
      {products.length !== 0 ? (
        <Table striped hover responsive>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Description</th>
              <th>Image path</th>
              <th>Price</th>
              <th>Category ID</th>
              <th>Color</th>
              <th>Stock</th>
              <th>Speed</th>
              <th>Glide</th>
              <th>Turn</th>
              <th>Fade</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr
                  key={product.product_id}
                  onClick={() => {
                    setClickedProduct(product);
                    modalShow();
                  }}
                  item={product}
                >
                  {Object.values(product).map((value, index) => {
                    return (
                      <td key={index}>
                        {value !== null
                          ? value.length > MAX_LENGTH
                            ? value.substring(0, MAX_LENGTH) + '...'
                            : value
                          : '-'}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <div className="d-flex justify-content-center px-3 py-3">
          <Spinner />
        </div>
      )}

      {openModal ? <EditProductModal item={clickedProduct} onSubmit={fetchProducts} onHide={modalHide} /> : null}
    </Container>
  );
}
