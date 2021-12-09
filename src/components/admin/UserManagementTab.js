import { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import { Container, Table } from 'reactstrap';
import axiosInstance from '../../axios';
import { trimString } from '../../util/tableutil';
import EditModal from './modal/EditModal';
import TableDropdown from './TableDropdown';
import UserForm from './form/UserForm';

export default function UserManagementTab() {
  const [users, setUsers] = useState([]);
  const [clickedUser, setClickedUser] = useState({});

  const [editFormData, setEditFormData] = useState({});

  const [openEditModal, setOpenEditModal] = useState(false);
  const toggleEditModal = () => setOpenEditModal(!openEditModal);

  const getUsers = async () => {
    try {
      const res = await axiosInstance.get('/user/getallusers.php');
      setUsers(res.data);
    } catch (error) {
      alert(error);
    }
  };

  const updateUser = async () => {
    try {
      await axiosInstance.put('/user/updateuser.php', editFormData);
      await getUsers();
    } catch (error) {
      alert(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axiosInstance.delete(`/user/deleteuserbyid.php?id=${id}`);
      await getUsers();
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [openEditModal]);

  useEffect(() => {
    setEditFormData(clickedUser);
  }, [clickedUser]);

  const handleUpdateFormChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center my-3">
        <h2 className="d-inline">Käyttäjien hallinta</h2>
      </div>
      <Table hover responsive={'lg'} className="table-sm">
        <thead>
          <tr>
            <th></th>
            <th>Käyttäjä ID</th>
            <th>Ylläpitäjä</th>
            <th>Käyttäjänimi</th>
            <th>Etunimi</th>
            <th>Sukunimi</th>
            <th>Sähköposti</th>
            <th>Osoite</th>
            <th>Kaupunki</th>
            <th>Postinumero</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.user_id} item={user}>
                <TableDropdown>
                  <div
                    className="product-dropdown-item"
                    onClick={() => {
                      setClickedUser(user);
                      toggleEditModal();
                    }}
                  >
                    Muokkaa
                  </div>
                  <div className="product-dropdown-item" onClick={() => deleteUser(user.user_id)}>
                    Poista
                  </div>
                </TableDropdown>
                {Object.values(user).map((value, index) => {
                  if (index === 1) return <td key={index}>{value === '1' ? 'Kyllä' : 'Ei'}</td>;
                  return <td key={index}>{value !== null ? trimString(value) : '-'}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>
      {openEditModal ? (
        <EditModal title="Muokkaa käyttäjää" action={updateUser} onHide={toggleEditModal}>
          <UserForm formData={editFormData} handleChange={handleUpdateFormChange} />
        </EditModal>
      ) : (
        <></>
      )}
    </Container>
  );
}
