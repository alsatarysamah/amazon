import { useContext } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../store";
import MessageBox from "../component/MessageBox";
import axios from "axios";

export default function CartScreen(props) {
const navigate=useNavigate();
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItem },
  } = state;
  const updateCart = async (item, qun) => {
    
    // const { data } = await axios.get(`/api/products/${item.id}`);
    // if (data.countInStock < quantity) {
    //   window.alert('Sorry. Product is out of stock');
    //   return;
    // }
    dispatch({
      type: "ADD",
      payload: { ...item, qun },
    });
  };

  const handleRemove=(item)=>{
    console.log("remove");
    console.log({item});
    dispatch({type:"REMOVE",payload:item})
  }

  const checkoutHandler = ()=>{
    navigate("/signin?redirect=/shipping")
  }
  
  return (
    <>
      <Helmet>
        <title>Shop Cart</title>
      </Helmet>
      <h1>Shop Cart</h1>
      <Row>
        <Col md={8}>
          {cartItem.length === 0 ? (
            <MessageBox>
              Cart is empty<Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItem.map((item) => (
                <ListGroup.Item key={item.id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <img
                        src={item.imgUrl}
                        alt={item.name}
                        className="img-fluid rounded img-th"
                      ></img>{" "}
                      <Link to={`/product/${item.id}`}>{item.name}</Link>
                    </Col>
                    <Col>
                      <Button
                        variant="light"
                        onClick={() => updateCart(item, item.qun - 1)}
                        disabled={item.qun === 1}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{" "}
                      <span>{item.qun}</span>
                      <Button
                        variant="light"
                        onClick={() => updateCart(item, item.qun + 1)}
                        // disabled={item.qun === 1}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>{" "}
                    </Col>
                    <Col>{item.price}</Col>
                    <Col>
                      <Button variant="light"  onClick={()=>handleRemove(item)}>
                        <i className="fas fa-trash"></i>
                      </Button>{" "}
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal ({cartItem.reduce((a, c) => a + c.qun, 0)} Items) :
                    JD {cartItem.reduce((a, c) => a + c.price * c.qun, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                        onClick={checkoutHandler}
                      disabled={cartItem.length === 0}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
