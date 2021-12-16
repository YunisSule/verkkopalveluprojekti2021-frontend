import { useEffect, useState } from 'react/cjs/react.development';
import { Container, Table } from 'reactstrap';
import axiosInstance from '../../axios';
import { getPaymentMethod, getProductState, trimString } from '../../util/tableutil';
import DetailModal from './modal/DetailModal';
import OrderForm from './form/OrderForm';
import TableDropdown from './TableDropdown';
import EditModal from './modal/EditModal';
import OrderRowForm from './form/OrderRowForm';

export default function OrderManagementTab() {
  const [orders, setOrders] = useState([]);
  const [clickedOrder, setClickedOrder] = useState({});
  const [orderDetails, setOrderDetails] = useState([]);
  const [editFormData, setEditFormData] = useState({});
  const [openEditModal, setOpenEditModal] = useState(false);
  const toggleEditModal = () => setOpenEditModal(!openEditModal);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const toggleDetailModal = () => setOpenDetailModal(!openDetailModal);

  const [clickedOrderRow, setClickedOrderRow] = useState({});
  const [editRowFormData, setEditRowFormData] = useState({});
  const [openEditRowModal, setOpenEditRowModal] = useState(false);
  const toggleEditRowModal = () => setOpenEditRowModal(!openEditRowModal);

  const getOrders = async () => {
    try {
      const res = await axiosInstance.get('/order/getallorders.php', { withCredentials: true });
      setOrders(res.data);
    } catch (error) {
      alert(error);
    }
  };

  const getOrderDetails = async (orderId) => {
    try {
      const res = await axiosInstance.get(`/order/getorderdetailsbyid.php?id=${orderId}`, { withCredentials: true });
      setOrderDetails(res.data);
    } catch (error) {
      alert(error);
    }
  };

  const updateOrder = async () => {
    try {
      await axiosInstance.put('/order/updateorder.php', editFormData, { withCredentials: true });
      await getOrders();
    } catch (error) {
      alert(error);
    }
  };

  const updateOrderRow = async () => {
    try {
      await axiosInstance.put('/order/updateorderdetails.php', editRowFormData, { withCredentials: true });
      await getOrderDetails(editRowFormData.order_id);
    } catch (error) {
      alert(error);
    }
  };

  const deleteOrder = async (id) => {
    try {
      await axiosInstance.delete(`/order/deleteorderbyid.php?id=${id}`, { withCredentials: true });
      await getOrders();
    } catch (error) {
      alert(error);
    }
  };

  const deleteOrderRow = async (orderId, orderRow) => {
    try {
      await axiosInstance.delete(`/order/deleteorderrowbyid.php?id=${orderId}&row=${orderRow}`, {
        withCredentials: true,
      });
      await getOrderDetails(orderId);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, [openEditModal]);

  useEffect(() => {
    setEditFormData(clickedOrder);
  }, [clickedOrder]);

  useEffect(() => {
    setEditRowFormData(clickedOrderRow);
  }, [clickedOrderRow]);

  const handleUpdateOrderChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleUpdateOrderRowChange = (e) => {
    setEditRowFormData({ ...editRowFormData, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <div className="d-flex justify-content-between align-items-center my-3">
        <h2 className="d-inline">Tilausten hallinta</h2>
      </div>
      <Table hover responsive={'lg'} className="table-sm">
        <thead>
          <tr>
            <th></th>
            <th>Tilaus ID</th>
            <th>Käyttäjä ID</th>
            <th>Tila</th>
            <th>Laskutustapa</th>
            <th>Tilauspäivämäärä</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            return (
              <tr key={order.order_id}>
                <TableDropdown>
                  <div
                    className="admin-dropdown-item"
                    onClick={() => {
                      getOrderDetails(order.order_id);
                      toggleDetailModal();
                    }}
                  >
                    Näytä tiedot
                  </div>
                  <div
                    className="admin-dropdown-item"
                    onClick={() => {
                      setClickedOrder(order);
                      toggleEditModal();
                    }}
                  >
                    Muokkaa
                  </div>
                  <div className="admin-dropdown-item" onClick={() => deleteOrder(order.order_id)}>
                    Poista
                  </div>
                </TableDropdown>
                {Object.values(order).map((value, index) => {
                  if (index === 2) return getProductState(value, index);
                  if (index === 3) return getPaymentMethod(value, index);

                  return <td key={index}>{value !== null ? trimString(value) : '-'}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </Table>

      {openEditModal ? (
        <EditModal title="Muokkaa tuotetta" action={updateOrder} onHide={toggleEditModal}>
          <OrderForm formData={editFormData} handleChange={handleUpdateOrderChange} />
        </EditModal>
      ) : (
        <></>
      )}

      {openEditRowModal ? (
        <EditModal title="Muokkaa tilausriviä" action={updateOrderRow} onHide={toggleEditRowModal}>
          <OrderRowForm formData={editRowFormData} handleChange={handleUpdateOrderRowChange} />
        </EditModal>
      ) : (
        <></>
      )}

      <DetailModal title="Tilauksen tiedot" isOpen={openDetailModal} onHide={toggleDetailModal}>
        <Table hover>
          <thead>
            <tr>
              <td></td>
              <td>Tilausrivi</td>
              <td>Tuote ID</td>
              <td>Tuotenimi</td>
              <td>Määrä</td>
              <td>Tuotehinta</td>
              <td>Kokonaishinta</td>
            </tr>
          </thead>
          <tbody>
            {orderDetails.map((row, index) => (
              <tr key={index}>
                <TableDropdown>
                  <div
                    className="admin-dropdown-item"
                    onClick={() => {
                      setClickedOrderRow(row);
                      toggleEditRowModal();
                    }}
                  >
                    Muokkaa
                  </div>
                  <div
                    className="admin-dropdown-item"
                    onClick={() => {
                      deleteOrderRow(row.order_id, row.order_row);
                    }}
                  >
                    Poista
                  </div>
                </TableDropdown>
                <td key={index + row.order_row}>{row.order_row}</td>
                <td key={index + row.product_id}>{row.product_id}</td>
                <td key={index + row.name}>{row.name}</td>
                <td key={index + row.quantity}>{row.quantity}</td>
                <td key={index + row.price}>{row.price} €</td>
                <td key={index + row.total}>{row.total} €</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </DetailModal>
    </Container>
  );
}
