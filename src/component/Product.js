import { useContext } from "react";
import { Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../store";
import Rating from "./Rating";


export default function Product(props) {
    const {product}=props;
const navigate=useNavigate();
    const { state, dispatch } = useContext(Store);
    const { cart } = state;
  
    const addToCartHandler = () => {
      const existItem = cart.cartItem.find((x) => x.id === product.id);
  
      const quantity = existItem ? existItem.qun + 1 : 1;
      dispatch({ type: "ADD", payload: { ...product, qun: quantity } });
      // navigate("/cart")
    };
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
          <Button className="btn-add" onClick={()=>addToCartHandler(product)}>Add to cart</Button>
        </Card.Body>
      
      </Card>
    </>
  );
}
