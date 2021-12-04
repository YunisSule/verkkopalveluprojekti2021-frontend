import { Form, FormGroup, Input, Label, Row } from 'reactstrap';

export default function ProductForm({ formData, handleChange }) {
  return (
    <Form>
      <Row form>
        <FormGroup>
          <Label for="name">Nimi</Label>
          <Input id="name" name="name" type="text" value={formData.name} onChange={(e) => handleChange(e)} />
        </FormGroup>
        <FormGroup>
          <Label for="brand">Brändi</Label>
          <Input id="brand" name="brand" type="text" value={formData.brand} onChange={(e) => handleChange(e)} />
        </FormGroup>
        <FormGroup>
          <Label for="description">Kuvaus</Label>
          <Input
            id="description"
            name="description"
            type="textarea"
            value={formData.description}
            onChange={(e) => handleChange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="image_path">Kuvan polku</Label>
          <Input
            id="image_path"
            name="image_path"
            type="text"
            value={formData.image_path}
            onChange={(e) => handleChange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="price">Hinta</Label>
          <Input id="price" name="price" type="text" value={formData.price} onChange={(e) => handleChange(e)} />
        </FormGroup>
        <FormGroup>
          <Label for="category_id">Kategoria ID</Label>
          <Input
            id="category_id"
            name="category_id"
            type="text"
            value={formData.category_id}
            onChange={(e) => handleChange(e)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="color">Väri</Label>
          <Input id="color" name="color" type="text" value={formData.color} onChange={(e) => handleChange(e)} />
        </FormGroup>
        <FormGroup>
          <Label for="stock">Varastossa</Label>
          <Input id="stock" name="stock" type="text" value={formData.stock} onChange={(e) => handleChange(e)} />
        </FormGroup>
        <FormGroup>
          <Label for="speed">Nopeus</Label>
          <Input id="speed" name="speed" type="text" value={formData.speed} onChange={(e) => handleChange(e)} />
        </FormGroup>
        <FormGroup>
          <Label for="glide">Liito</Label>
          <Input id="glide" name="glide" type="text" value={formData.glide} onChange={(e) => handleChange(e)} />
        </FormGroup>
        <FormGroup>
          <Label for="turn">Vakaus</Label>
          <Input id="turn" name="turn" type="text" value={formData.turn} onChange={(e) => handleChange(e)} />
        </FormGroup>
        <FormGroup>
          <Label for="fade">Feidi</Label>
          <Input id="fade" name="fade" type="text" value={formData.fade} onChange={(e) => handleChange(e)} />
        </FormGroup>
      </Row>
    </Form>
  );
}
