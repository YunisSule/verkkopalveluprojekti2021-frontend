import { Suspense } from 'react';
import { useState } from 'react';
import { Container, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import ProductManagementPage from './ProductManagementTab';
import OrderManagementPage from './OrderManagementPage';
import UserManagementPage from './UserManagementPage';

export default function Adminpage() {
  const [activeTab, setactiveTab] = useState('1');

  return (
    <Container>
      <h1 className="mt-3">Hallintapaneeli</h1>
      <section className="my-4">
        <Nav tabs>
          <NavItem onClick={() => setactiveTab('1')}>
            <NavLink className={activeTab === '1' ? 'active' : ''}>Tuotteiden hallinta</NavLink>
          </NavItem>
          <NavItem onClick={() => setactiveTab('2')}>
            <NavLink className={activeTab === '2' ? 'active' : ''}>Tilausten hallinta</NavLink>
          </NavItem>
          <NavItem onClick={() => setactiveTab('3')}>
            <NavLink className={activeTab === '3' ? 'active' : ''}>Käyttäjien hallinta</NavLink>
          </NavItem>
        </Nav>
      </section>
      <section>
        <TabContent activeTab={activeTab}>
          <Suspense fallback={<h1>Loading...</h1>}>
            <TabPane tabId="1">
              <ProductManagementPage />
            </TabPane>
            <TabPane tabId="2">
              <OrderManagementPage />
            </TabPane>
            <TabPane tabId="3">
              <UserManagementPage />
            </TabPane>
          </Suspense>
        </TabContent>
      </section>
    </Container>
  );
}
