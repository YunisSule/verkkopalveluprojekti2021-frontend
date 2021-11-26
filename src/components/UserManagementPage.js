import { Container, Table } from 'reactstrap';

export default function ProductManagementPage() {
  return (
    <Container>
      <h2 className="text-center mt-3">Käyttäjien hallinta</h2>
      <Table striped hover responsive>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Is admin</th>
            <th>Username</th>
            <th>First name</th>
            <th>Last name</th>
            <th>Email</th>
            <th>Address</th>
            <th>City</th>
            <th>Postal code</th>
          </tr>
        </thead>
        <tbody></tbody>
      </Table>
    </Container>
  );
}
