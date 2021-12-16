import { useState, useEffect } from 'react';
import {
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import axiosInstance from '../axios';
import { getPaymentMethod, getProductState } from '../util/tableutil';

export default function Userpage() {
  const [activeTab, setActiveTab] = useState('1');
  const [user, setUser] = useState([]);
  const [orders, setOrders] = useState([]);
  const [modal, setModal] = useState(false);
  const [clickedOrder, setClickedOrder] = useState([]);
  const [formdata, setFormdata] = useState([]);

  const userID = sessionStorage.getItem('user_id');

  const getOrderDetails = async (orderId) => {
    try {
      const res = await axiosInstance.get(`/order/getorderdetailsbyid.php?id=${orderId}`, { withCredentials: true });
      setClickedOrder(res.data);
    } catch (error) {
      console.error(error.response ? error.response.data.error : error);
    }
  };

  // Get user info to user variable
  useEffect(() => {
    axiosInstance
      .get('/user/getuserbyid.php?id=' + userID, { withCredentials: true })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        alert(error.response ? error.response.data.error : error);
      });
  }, []);

  // Get order history to orderHistory variable
  useEffect(() => {
    axiosInstance
      .get('/order/getordersbyuserid.php?user_id=' + userID, { withCredentials: true })
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        alert(error.response ? error.response.data.error : error);
      });
  }, [userID]);

  // Update user info: firstname, lastname, email, address, city and postal code by ID. posts JSON data
  function update() {
    axiosInstance
      .post('/user/updateuserinfo.php?id=' + userID, formdata, { withCredentials: true })
      .then((response) => {})
      .catch((error) => {
        alert(error.response ? error.response.data.error : error);
      });
  }

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    setFormdata((values) => ({ ...values, [name]: value }));
  }

  return (
    <div className="col-8 offset-2 mt-4">
      <Nav tabs>
        <NavItem>
          <NavLink className={activeTab === '1' ? 'active' : 'text-dark'} onClick={() => setActiveTab('1')}>
            Omat tiedot
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={activeTab === '2' ? 'active' : 'text-dark'}
            onClick={() => {
              setFormdata(user[0]);
              setActiveTab('2');
            }}
          >
            Muokkaa tietoja
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={activeTab === '3' ? 'active' : 'text-dark'} onClick={() => setActiveTab('3')}>
            Tilaushistoria
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12" className="mt-4">
              <h4>Omat tiedot</h4>
              {user.map((item) => (
                <Table className="mt-4">
                  <tbody>
                    <tr>
                      <td>Käyttäjänimi</td>
                      <td>{item.username}</td>
                    </tr>
                    <tr>
                      <td>Etunimi</td>
                      <td>{item.firstname}</td>
                    </tr>
                    <tr>
                      <td>Sukunimi</td>
                      <td>{item.lastname}</td>
                    </tr>
                    <tr>
                      <td>Sähköposti</td>
                      <td>{item.email}</td>
                    </tr>
                    <tr>
                      <td>Osoite</td>
                      <td>
                        {item.address} {item.city} {item.postal_code}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              ))}
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="2">
          <Row>
            <Col sm="12" className="mt-4">
              <h4>Muokkaa tietoja</h4>

              <Form className="mt-4 mb-4" onSubmit={update}>
                <Row form>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="firstname">Etunimi</Label>
                      <Input
                        id="firstname"
                        name="firstname"
                        value={formdata.firstname}
                        type="text"
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="lastname">Sukunimi</Label>
                      <Input
                        id="lastname"
                        name="lastname"
                        value={formdata.lastname}
                        type="text"
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="email">Sähköposti</Label>
                      <Input id="email" name="email" value={formdata.email} type="email" onChange={handleChange} />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="address">Osoite</Label>
                      <Input id="address" name="address" value={formdata.address} onChange={handleChange} />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="city">Kaupunki</Label>
                      <Input id="city" name="city" value={formdata.city} onChange={handleChange} />
                    </FormGroup>
                  </Col>
                  <Col md={2}>
                    <FormGroup>
                      <Label for="postal_code">Postinumero</Label>
                      <Input id="postal_code" name="postal_code" value={formdata.postal_code} onChange={handleChange} />
                    </FormGroup>
                  </Col>
                </Row>
                <Button>Tallenna</Button>
              </Form>
            </Col>
          </Row>
        </TabPane>
        <TabPane tabId="3">
          <Row>
            <Col sm="12" className="mt-4">
              <h4>Tilaushistoria</h4>
              <Table responsive hover striped>
                <thead>
                  <tr>
                    <th>Tilausnumero</th>
                    <th>Tila</th>
                    <th>Laskutustapa</th>
                    <th>Tilauspäivä</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr
                      onClick={() => {
                        setModal(!modal);
                        getOrderDetails(order.order_id);
                      }}
                    >
                      {Object.values(order).map((item, index) => {
                        if (index === 1) return getProductState(item, index);
                        if (index === 2) return getPaymentMethod(item, index);

                        return <td key={index}>{item}</td>;
                      })}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
      <div>
        <Modal isOpen={modal}>
          <ModalHeader
            charCode="Y"
            toggle={() => {
              setModal(!modal);
            }}
          >
            Tilauksen tiedot
          </ModalHeader>
          <ModalBody>
            <Table>
              <thead>
                <tr>
                  <th>Tuotenimi</th>
                  <th>Määrä</th>
                  <th>Tuotehinta</th>
                  <th>Kokonaishinta</th>
                </tr>
              </thead>
              <tbody>
                {clickedOrder.map((order, index) => (
                  <tr>
                    <td>{order.name}</td>
                    <td>{order.quantity}</td>
                    <td>{order.price}€</td>
                    <td>{order.total}€</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
}
