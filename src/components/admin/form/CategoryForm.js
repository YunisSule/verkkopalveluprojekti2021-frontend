import { Form, FormGroup, Input, Label, Row } from 'reactstrap';

export default function CategoryForm({ formData, handleChange }) {
  return (
    <Form>
      <Row form>
        <FormGroup>
          <Label for="name">Tuoteryhmän nimi</Label>
          <Input id="name" name="name" type="text" value={formData.name} onChange={(e) => handleChange(e)} />
        </FormGroup>
      </Row>
    </Form>
  );
}
