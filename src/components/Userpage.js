import { useState, useEffect } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane, Row, Col, Form, FormGroup, Input, Label, Button, Table, Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios';

const URL = 'http://localhost/verkkopalveluprojekti2021-backend/';
const USER_INFO = '/user/getallusers.php';
const ORDER_INFO = '/order/getorderinfo.php?id=';
const ORDER_HISTORY = '/order/getorders.php?id=1';
const UPDATE_USER_INFO = '/user/updateuserinfo.php?id=1';

export default function Userpage() {
  const [activeTab, setActiveTab] = useState('1');
  const [user, setUser] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [orderInfo, setOrderInfo] = useState([]);
  const [modal, setModal] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [formdata, setFormdata] = useState({});

  const address = URL;

  // Get user info to user variable

  useEffect(() => {
    axios
      .get(address + USER_INFO)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  // Get order info to orderInfo variable

  useEffect(() => {
    axios
      .get(address + ORDER_INFO + orderId)
      .then((response) => {
        setOrderInfo(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  }, [orderId]);

  // Get order history to orderHistory variable

  useEffect(() => {
    axios
      .get(address + ORDER_HISTORY)
      .then((response) => {
        setOrderHistory(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  // Update user info: firstname, lastname, email, address, city and postal code by ID. posts JSON data

  function update() {
    axios
      .post(URL + UPDATE_USER_INFO, formdata, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {})
      .catch((error) => {
        alert(error);
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
          <NavLink className={activeTab === '2' ? 'active' : 'text-dark'} onClick={() => setActiveTab('2')}>
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
              {user.map((item) => (
                <Form className="mt-4 mb-4" onSubmit={update}>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="firstname">Etunimi</Label>
                        <Input id="firstname" name="firstname" placeholder={item.firstname} type="text" onChange={handleChange} />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="lastname">Sukunimi</Label>
                        <Input id="lastname" name="lastname" placeholder={item.lastname} type="text" onChange={handleChange} />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="email">Sähköposti</Label>
                        <Input id="email" name="email" placeholder={item.email} type="email" onChange={handleChange} />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="password">Salasana</Label>
                        <Input id="password" name="password" placeholder="*********" type="password" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="address">Osoite</Label>
                      <Input id="address" name="address" placeholder={item.address} onChange={handleChange} />
                    </FormGroup>
                  </Col>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="city">Kaupunki</Label>
                        <Input id="city" name="city" placeholder={item.city} onChange={handleChange} />
                      </FormGroup>
                    </Col>
                    <Col md={4}></Col>
                    <Col md={2}>
                      <FormGroup>
                        <Label for="postal_code">Postinumero</Label>
                        <Input id="postal_code" name="postal_code" placeholder={item.postal_code} onChange={handleChange} />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Button>Tallenna</Button>
                </Form>
              ))}
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
                    <th>Tilauspäivä</th>
                    <th>Tila</th>
                  </tr>
                </thead>

                <tbody>
                  {orderHistory.map((item) => (
                    <tr
                      onClick={function noRefCheck() {
                        setModal(!modal);
                        setOrderId(item.order_id);
                      }}
                    >
                      <td>{item.order_id}</td>
                      <td>{item.order_date}</td>
                      <td>{item.state}</td>
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
            toggle={function noRefCheck() {
              setModal(!modal);
            }}
          >
            Tilausten tiedot
          </ModalHeader>
          <ModalBody>
            <Table>
              <thead>
                <tr>
                  <th>Tuotenumero</th>
                  <th>Tuotenimi</th>
                  <th>Määrä</th>
                  <th>Hinta</th>
                </tr>
              </thead>
              {orderInfo.map((item) => (
                <tbody>
                  <tr>
                    <td>{item.product_id}</td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                  </tr>
                </tbody>
              ))}
            </Table>
          </ModalBody>
        </Modal>
      </div>
    </div>
  );
}
