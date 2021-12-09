import { Form, FormGroup, Input, Label, Row } from 'reactstrap';

export default function OrderForm({ formData, handleChange }) {
  return (
    <Form>
      <Row form>
        <FormGroup>
          <Label for="user_id">Käyttäjä ID</Label>
          <Input id="user_id" name="user_id" type="text" value={formData.user_id} onChange={(e) => handleChange(e)} />
        </FormGroup>
        <FormGroup>
          <Label for="state">Tila</Label>
          <Input id="state" name="state" type="select" value={formData.state} onChange={(e) => handleChange(e)}>
            <option value="ordered">Tilattu</option>
            <option value="shipped">Postitettu</option>
            <option value="completed">Valmis</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="payment_method">Laskutustapa</Label>
          <Input
            id="payment_method"
            name="payment_method"
            type="select"
            value={formData.payment_method}
            onChange={(e) => handleChange(e)}
          >
            <option value="email">Sähköposti</option>
            <option value="letter">Kirje</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="order_date">Tilauspäivämäärä</Label>
          <Input
            id="order_date"
            name="order_date"
            type="text"
            value={formData.order_date}
            onChange={(e) => handleChange(e)}
          />
        </FormGroup>
      </Row>
    </Form>
  );
}
