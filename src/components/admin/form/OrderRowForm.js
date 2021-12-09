import { Form, FormGroup, Input, Label, Row } from 'reactstrap';

export default function OrderRowForm({ formData, handleChange }) {
  return (
    <Form>
      <Row form>
        <FormGroup>
          <Label for="product_id">Tuote ID</Label>
          <Input
            id="product_id"
            name="product_id"
            type="text"
            value={formData.product_id}
            onChange={(e) => handleChange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="quantity">Määrä</Label>
          <Input
            id="quantity"
            name="quantity"
            type="text"
            value={formData.quantity}
            onChange={(e) => handleChange(e)}
          />
        </FormGroup>
      </Row>
    </Form>
  );
}
