import { useEffect, useState } from 'react';
import { Container, Table } from 'reactstrap';
import TableDropDown from './TableDropdown';
import { trimString } from '../../util/tableutil';
import AddModal from './modal/AddModal';
import axiosInstance from '../../axios';
import ProductForm from './form/ProductForm';
import EditModal from './modal/EditModal';
import AddButton from './AddButton';

export default function ProductManagementTab() {
  const [products, setProducts] = useState([]);
  const [clickedProduct, setClickedProduct] = useState({});

  const [addFormData, setAddFormData] = useState({});
  const clearAddFormData = () => setAddFormData({});

  const [editFormData, setEditFormData] = useState({});

  const [openAddModal, setOpenAddModal] = useState(false);
  const toggleAddModal = () => setOpenAddModal(!openAddModal);

  const [openEditModal, setOpenEditModal] = useState(false);
  const toggleEditModal = () => setOpenEditModal(!openEditModal);

  const getProducts = async () => {
    try {
      const res = await axiosInstance.get('/product/getallproducts.php');
      setProducts(res.data);
    } catch (error) {
      alert(error.response ? error.response.data.error : error);
    }
  };

  const postProduct = async () => {
    try {
      await axiosInstance.post('/product/postproduct.php', addFormData);
      clearAddFormData();
    } catch (error) {
      console.error(error);
    }
  };

  const updateProduct = async () => {
    try {
      await axiosInstance.post('/product/updateproduct.php', editFormData);
    } catch (error) {
      alert(error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axiosInstance.delete(`/product/deleteproductbyid.php?id=${id}`);
      await getProducts();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [openEditModal, openAddModal]);

  useEffect(() => {
    setEditFormData(clickedProduct);
  }, [clickedProduct]);

  const handleAddFormChange = (e) => {
    setAddFormData({ ...addFormData, [e.target.name]: e.target.value });
  };

  const handleUpdateFormChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center my-3">
        <h2 className="d-inline">Tuotteiden hallinta</h2>
        <AddButton clickAction={toggleAddModal} />
      </div>
      <Table hover responsive={'lg'} className="table-sm">
        <thead>
          <tr>
            <th></th>
            <th>Tuote ID</th>
            <th>Tuotenimi</th>
            <th>Brändi</th>
            <th>Kuvaus</th>
            <th>Tuotekuva</th>
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
              <tr key={product.product_id} item={product}>
                <TableDropDown>
                  <div
                    className="product-dropdown-item"
                    onClick={() => {
                      setClickedProduct(product);
                      toggleEditModal();
                    }}
                  >
                    Muokkaa
                  </div>
                  <div className="product-dropdown-item" onClick={() => deleteProduct(product.product_id)}>
                    Poista
                  </div>
                </TableDropDown>
                {Object.values(product).map((value, index) => {
                  return <td key={index}>{value !== null ? trimString(value) : '-'}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>

      {openEditModal ? (
        <EditModal title="Muokkaa tuotetta" action={updateProduct} onHide={toggleEditModal}>
          <ProductForm formData={editFormData} handleChange={handleUpdateFormChange} />
        </EditModal>
      ) : (
        <></>
      )}

      {openAddModal ? (
        <AddModal title="Lisää tuote" action={postProduct} onHide={toggleAddModal}>
          <ProductForm formData={addFormData} handleChange={handleAddFormChange} />
        </AddModal>
      ) : (
        <></>
      )}
    </Container>
  );
}
