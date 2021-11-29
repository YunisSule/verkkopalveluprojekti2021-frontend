import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Spinner, Table } from 'reactstrap';
import EditProductModal from './EditProductModal';
import ProductDropdown from './TableDropdown';
import trimString from '../util/tableutil';

export default function ProductManagementTab() {
  const baseURL = 'http://localhost/verkkopalveluprojekti2021-backend';
  const TABLE_DATA_MAX_LENGTH = 100;
  const [products, setProducts] = useState([]);
  const [clickedProduct, setClickedProduct] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const modalShow = () => setOpenModal(true);
  const modalHide = () => setOpenModal(false);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${baseURL}/product/getallproducts.php`);
      await setProducts(res.data);
    } catch (error) {
      alert(error);
    }
  };

  const deleteProduct = async (id) => {
    await axios.delete(`${baseURL}/product/deleteproductbyid.php?id=${id}`);
    await fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, [openModal]);

  return (
    <Container>
      <h2 className="text-center mt-3">Tuotteiden hallinta</h2>
      {products.length !== 0 ? (
        <Table hover responsive className="table-sm">
          <thead>
            <tr>
              <th></th>
              <th>Tuote ID</th>
              <th>Nimi</th>
              <th>Brändi</th>
              <th>Kuvaus</th>
              <th>Kuvan polku</th>
              <th>Hinta</th>
              <th>Kategoria ID</th>
              <th>Väri</th>
              <th>Varastossa</th>
              <th>Nopeus</th>
              <th>Liito</th>
              <th>Vakaus</th>
              <th>Feidi</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <>
                  <tr key={product.product_id} item={product}>
                    <ProductDropdown
                      onEditClick={() => {
                        setClickedProduct(product);
                        modalShow();
                      }}
                      onDeleteClick={() => deleteProduct(product.product_id)}
                    />
                    {Object.values(product).map((value, index) => {
                      return <td key={index}>{value !== null ? trimString(TABLE_DATA_MAX_LENGTH, value) : '-'}</td>;
                    })}
                  </tr>
                </>
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
