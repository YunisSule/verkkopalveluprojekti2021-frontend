import { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import { Container, Spinner, Table } from 'reactstrap';
import axiosInstance from '../../axios';
import { trimString } from '../../util/tableutil';
import EditModal from './modal/EditModal';
import TableDropdown from './TableDropdown';
import UserForm from './UserForm';

export default function UserManagementTab() {
  const [users, setUsers] = useState([]);
  const [clickedUser, setClickedUser] = useState({});

  const [editFormData, setEditFormData] = useState({});

  const [openEditModal, setOpenEditModal] = useState(false);
  const editModalShow = () => setOpenEditModal(true);
  const editModalHide = () => setOpenEditModal(false);

  const fetchUsers = async () => {
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
      fetchUsers();
    } catch (error) {
      alert(error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axiosInstance.delete(`/user/deleteuserbyid.php?id=${id}`);
      await fetchUsers();
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [openEditModal]);

  useEffect(() => {
    setEditFormData(clickedUser);
  }, [clickedUser]);

  const handleUpdateFormChange = (e) => {
    console.log(`${e.target.name} : ${e.target.value}`);
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center my-3">
        <h2 className="d-inline">Käyttäjien hallinta</h2>
      </div>
      {users.length !== 0 ? (
        <Table hover responsive={'lg'} className="table-sm">
          <thead>
            <tr>
              <th></th>
              <th>Käyttäjä ID</th>
              <th>Admin</th>
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
                <>
                  <tr key={user.user_id} item={user}>
                    <TableDropdown
                      onEditClick={() => {
                        setClickedUser(user);
                        editModalShow();
                      }}
                      onDeleteClick={() => deleteUser(user.user_id)}
                    />
                    {Object.values(user).map((value, index) => {
                      if (index === 1) return <td key={index}>{value === '1' ? 'Kyllä' : 'Ei'}</td>;
                      return <td key={index}>{value !== null ? trimString(value) : '-'}</td>;
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
        <EditModal title="Muokkaa käyttäjää" action={updateUser} afterAction={fetchUsers} onHide={editModalHide}>
          <UserForm formData={editFormData} handleChange={handleUpdateFormChange} />
        </EditModal>
      ) : (
        <></>
      )}
    </Container>
  );
}
