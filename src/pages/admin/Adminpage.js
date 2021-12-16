import { Suspense } from 'react';
import { useState } from 'react';
import { Container, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import ProductManagementPage from './ProductManagementTab';
import UserManagementTab from './UserManagementTab';
import OrderManagementTab from './OrderManagementTab';
import CategoryManagementTab from './CategoryManagementTab';

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
          <NavItem onClick={() => setactiveTab('4')}>
            <NavLink className={activeTab === '4' ? 'active' : ''}>Tuoteryhmien hallinta</NavLink>
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
              <OrderManagementTab />
            </TabPane>
            <TabPane tabId="3">
              <UserManagementTab />
            </TabPane>
            <TabPane tabId="4">
              <CategoryManagementTab />
            </TabPane>
          </Suspense>
        </TabContent>
      </section>
    </Container>
  );
}
