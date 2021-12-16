import { Link } from 'react-router-dom';
import { ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { IMAGE_PATH } from '../config';

export default function ListItem({ item }) {
  return (
    <Link className="item" to={{ pathname: '/product', state: { id: item.product_id } }}>
      <ListGroupItem>
        <ListGroupItemHeading className="item-heading">{item.name}</ListGroupItemHeading>
        <img className="item-image" src={IMAGE_PATH + item.image_path} alt="Product" />
        <ListGroupItemText className="item-price">Hinta {item.price}€</ListGroupItemText>
      </ListGroupItem>
    </Link>
  );
}
