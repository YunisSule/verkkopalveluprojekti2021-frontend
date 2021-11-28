import { Container, Table } from 'reactstrap';

export default function ProductManagementPage() {
  return (
    <Container>
      <h2 className="text-center mt-3">Tilausten hallinta</h2>
      <Table striped hover responsive>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Order row</th>
            <th>User ID</th>
            <th>Product ID</th>
            <th>Quantity</th>
            <th>State</th>
            <th>Order date</th>
          </tr>
        </thead>
        <tbody></tbody>
      </Table>
    </Container>
  );
}
