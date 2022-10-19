import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "./Rating";


export default function Product(props) {
    const {product}=props;
  return (
    <>
      <Card key={product.id} className="product">
        <Link to={`/product/${product.id}`}>
          <img src={product.imgUrl} className="card-img-top" alt={product.name}></img>
        </Link>
        <Card.Body>
        <Link to={`/product/${product.id}`}>
            <Card.Title>{product.name}</Card.Title>
          </Link>
          <Rating rating={2} num={3}></Rating>
          <Card.Text>{product.price}</Card.Text>
          <Button className="btn-add">Add to cart</Button>
        </Card.Body>
      
      </Card>
    </>
  );
}
