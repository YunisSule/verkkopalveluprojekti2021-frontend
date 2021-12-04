import { Form, FormGroup, Input, Label, Row } from 'reactstrap';

export default function UserForm({ formData, handleChange }) {
  return (
    <Form>
      <Row form>
        <FormGroup>
          <Label for="is_admin">Ylläpitäjä</Label>
          <Input
            id="is_admin"
            name="is_admin"
            type="select"
            value={formData.is_admin}
            onChange={(e) => handleChange(e)}
          >
            <option value="1">Kyllä</option>
            <option value="0">Ei</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="username">Käyttäjänimi</Label>
          <Input
            id="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={(e) => handleChange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="firstname">Etunimi</Label>
          <Input
            id="firstname"
            name="firstname"
            type="text"
            value={formData.firstname}
            onChange={(e) => handleChange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="lastname">Sukunimi</Label>
          <Input
            id="lastname"
            name="lastname"
            type="text"
            value={formData.lastname}
            onChange={(e) => handleChange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Sähköposti</Label>
          <Input id="email" name="email" type="text" value={formData.email} onChange={(e) => handleChange(e)} />
        </FormGroup>
        <FormGroup>
          <Label for="address">Osoite</Label>
          <Input id="address" name="address" type="text" value={formData.address} onChange={(e) => handleChange(e)} />
        </FormGroup>
        <FormGroup>
          <Label for="city">Kaupunki</Label>
          <Input id="city" name="city" type="text" value={formData.city} onChange={(e) => handleChange(e)} />
        </FormGroup>
        <FormGroup>
          <Label for="postal_code">Postinumero</Label>
          <Input
            id="postal_code"
            name="postal_code"
            type="text"
            value={formData.postal_code}
            onChange={(e) => handleChange(e)}
          />
        </FormGroup>
      </Row>
    </Form>
  );
}
