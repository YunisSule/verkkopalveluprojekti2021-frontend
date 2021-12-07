import { useEffect, useState } from 'react';
import { Button, Container, Spinner, Table } from 'reactstrap';
import EditProductModal from './EditProductModal';
import ProductDropdown from './TableDropdown';
import trimString from '../util/tableutil';
import AddProductModal from './AddProductModal';
import axiosInstance from '../axios';

export default function ProductManagementTab() {
  const TABLE_DATA_MAX_LENGTH = 100;
  const [products, setProducts] = useState([]);
  const [clickedProduct, setClickedProduct] = useState({});

  const [openAddModal, setOpenAddModal] = useState(false);
  const addModalShow = () => setOpenAddModal(true);
  const addModalHide = () => setOpenAddModal(false);

  const [openEditModal, setOpenEditModal] = useState(false);
  const editModalShow = () => setOpenEditModal(true);
  const editModalHide = () => setOpenEditModal(false);

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get(`/product/getallproducts.php`);
      setProducts(res.data);
    } catch (error) {
      alert(error.response ? error.response.data.error : error);
    }
  };

  const deleteProduct = async (id) => {
    await axiosInstance.delete(`/product/deleteproductbyid.php?id=${id}`);
    await fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, [openEditModal, openAddModal]);

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center my-3">
        <h2 className="d-inline">Tuotteiden hallinta</h2>
        <Button className="d-flex ps-2 align-items-center" onClick={() => addModalShow()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-plus"
            viewBox="0 0 16 16"
          >
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
          </svg>
          Lisää
        </Button>
      </div>
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
                        editModalShow();
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

      {openEditModal ? (
        <EditProductModal item={clickedProduct} onSubmit={fetchProducts} onHide={editModalHide} />
      ) : null}

      {openAddModal ? <AddProductModal onSubmit={fetchProducts} onHide={addModalHide} /> : null}
    </Container>
  );
}
