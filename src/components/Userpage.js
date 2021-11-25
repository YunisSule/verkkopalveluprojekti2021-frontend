import { useState, useEffect } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane, Row, Col, Form, FormGroup, Input, Label, Button, Table, Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios';

const URL = 'http://localhost/verkkopalveluprojekti2021-backend/';
const USER_INFO = '/user/getallusers.php';
const ORDER_INFO = '/order/getorderinfo.php?id=';
const ORDER_HISTORY = '/order/getorders.php?id=1';

export default function Userpage() {
  const [activeTab, setActiveTab] = useState('1');
  const [user, setUser] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const [orderInfo, setOrderInfo] = useState([]);
  const [modal, setModal] = useState(false);
  const [orderId, setOrderId] = useState('');

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

  return (
    <div className="col-8 offset-2 mb-5">
      <Nav tabs>
        <NavItem>
          <NavLink className={activeTab === '1' ? 'active' : ''} onClick={() => setActiveTab('1')}>
            Omat tiedot
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={activeTab === '2' ? 'active' : ''} onClick={() => setActiveTab('2')}>
            Muokkaa tietoja
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={activeTab === '3' ? 'active' : ''} onClick={() => setActiveTab('3')}>
            Tilaushistoria
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Row>
            <Col sm="12">
              <h4>Omat tiedot</h4>
              {user.map((item) => (
                <Table>
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
            <Col sm="12">
              <h4>Muokkaa tietoja</h4>
              {user.map((item) => (
                <Form className="userinfo">
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="exampleEmail">Sähköposti</Label>
                        <Input id="exampleEmail" name="email" placeholder={item.email} type="email" />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="examplePassword">Salasana</Label>
                        <Input id="examplePassword" name="password" placeholder="*********" type="password" />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleAddress">Osoite</Label>
                      <Input id="exampleAddress" name="address" placeholder={item.address} />
                    </FormGroup>
                  </Col>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="exampleCity">Kaupunki</Label>
                        <Input id="exampleCity" name="city" placeholder={item.city} />
                      </FormGroup>
                    </Col>
                    <Col md={4}></Col>
                    <Col md={2}>
                      <FormGroup>
                        <Label for="exampleZip">Postinumero</Label>
                        <Input id="exampleZip" name="zip" placeholder={item.postal_code} />
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
            <Col sm="12">
              <h4>Tilaushistoria</h4>

              <Table responsive hover>
                <thead>
                  <tr>
                    <th>Tilausnumero</th>
                    <th>Tilauspäivä</th>
                    <th>Tila</th>
                  </tr>
                </thead>
                {orderHistory.map((item) => (
                  <tbody>
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
                  </tbody>
                ))}
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
