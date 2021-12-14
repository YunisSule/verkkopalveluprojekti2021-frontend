import { useEffect, useState } from 'react';
import { Container, Table } from 'reactstrap';
import TableDropDown from './TableDropdown';
import { trimString } from '../../util/tableutil';
import AddModal from './modal/AddModal';
import axiosInstance from '../../axios';
import CategoryForm from './form/CategoryForm';
import EditModal from './modal/EditModal';
import AddButton from './AddButton';

export default function CategoryManagementTab() {
  const [categories, setCategories] = useState([]);
  const [clickedCategory, setClickedCategory] = useState({});

  const [addFormData, setAddFormData] = useState({});
  const clearAddFormData = () => setAddFormData({});

  const [editFormData, setEditFormData] = useState({});

  const [openAddModal, setOpenAddModal] = useState(false);
  const toggleAddModal = () => setOpenAddModal(!openAddModal);

  const [openEditModal, setOpenEditModal] = useState(false);
  const toggleEditModal = () => setOpenEditModal(!openEditModal);

  const getCategories = async () => {
    try {
      const res = await axiosInstance.get('/category/getallcategories.php', { withCredentials: true });
      setCategories(res.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const postCategory = async () => {
    try {
      await axiosInstance.post('/category/postcategory.php', addFormData, { withCredentials: true });
      clearAddFormData();
    } catch (error) {
      console.error(error);
    }
  };

  const updateCategory = async () => {
    try {
      await axiosInstance.post('/category/updatecategory.php', editFormData, { withCredentials: true });
      await getCategories();
    } catch (error) {
      alert(error);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axiosInstance.delete(`/category/deletecategorybyid.php?id=${id}`, { withCredentials: true });
      await getCategories();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, [openEditModal, openAddModal]);

  useEffect(() => {
    setEditFormData(clickedCategory);
  }, [clickedCategory]);

  const handleAddFormChange = (e) => {
    setAddFormData({ ...addFormData, [e.target.name]: e.target.value });
  };

  const handleUpdateFormChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center my-3">
        <h2 className="d-inline">Tuoteryhmien hallinta</h2>
        <AddButton clickAction={toggleAddModal} />
      </div>
      <Table hover responsive={'lg'} className="table-sm">
        <thead>
          <tr>
            <th></th>
            <th>Tuoteryhmä ID</th>
            <th>Tuoteryhmän nimi</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => {
            return (
              <tr key={category.category_id} item={category}>
                <TableDropDown>
                  <div
                    className="admin-dropdown-item"
                    onClick={() => {
                      setClickedCategory(category);
                      toggleEditModal();
                    }}
                  >
                    Muokkaa
                  </div>
                  <div className="admin-dropdown-item" onClick={() => deleteCategory(category.category_id)}>
                    Poista
                  </div>
                </TableDropDown>
                {Object.values(category).map((value, index) => {
                  return <td key={index}>{value !== null ? trimString(value) : '-'}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>

      {openEditModal ? (
        <EditModal title="Muokkaa tuoteryhmää" action={updateCategory} onHide={toggleEditModal}>
          <CategoryForm formData={editFormData} handleChange={handleUpdateFormChange} />
        </EditModal>
      ) : (
        <></>
      )}

      {openAddModal ? (
        <AddModal title="Lisää tuoteryhmä" action={postCategory} onHide={toggleAddModal}>
          <CategoryForm formData={addFormData} handleChange={handleAddFormChange} />
        </AddModal>
      ) : (
        <></>
      )}
    </Container>
  );
}
