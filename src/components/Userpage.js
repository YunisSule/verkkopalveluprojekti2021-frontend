import { useState, useEffect } from 'react';
import { Nav, NavItem, NavLink, TabContent, TabPane, Row, Col, Form, FormGroup, Input, Label, Button, Table, Collapse } from 'reactstrap';
import axios from 'axios';

const URL = 'http://localhost/verkkopalveluprojekti2021-backend/user/getalluserdata.php';

export default function Userpage() {
  const [activeTab, setActiveTab] = useState('1');
  const [user, setUser] = useState([]);
  const [orderInfo, setOrderInfo] = useState(false);

  const address = URL;

  useEffect(() => {
    axios
      .get(address)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <div className="col-8 offset-2">
      <Nav tabs>
        <NavItem>
          <NavLink className={activeTab == '1' ? 'active' : ''} onClick={() => setActiveTab('1')}>
            Omat tiedot
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={activeTab == '2' ? 'active' : ''} onClick={() => setActiveTab('2')}>
            Muokkaa tietoja
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink className={activeTab == '3' ? 'active' : ''} onClick={() => setActiveTab('3')}>
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
              <Table striped responsive hover>
                <thead>
                  <tr>
                    <th>Tilausnumero</th>
                    <th>Tilauspäivä</th>
                    <th>Tila</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    onClick={function noRefCheck() {
                      setOrderInfo(!orderInfo);
                    }}
                  >
                    <td>test text{}</td>
                    <td>test text{}</td>
                    <td>test text{}</td>
                  </tr>
                  <Collapse isOpen={orderInfo}>
                    <Table striped responsive hover>
                      <thead>
                        <tr>
                          <th>Tuotenumero</th>
                          <th>Tuotenimi</th>
                          <th>Hinta</th>
                          <th>Määrä</th>
                        </tr>
                      </thead>
                      <tbody>
                        <td>test text</td>
                        <td>test text</td>
                        <td>test text</td>
                        <td>test text</td>
                      </tbody>
                    </Table>
                  </Collapse>
                </tbody>
              </Table>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
}
