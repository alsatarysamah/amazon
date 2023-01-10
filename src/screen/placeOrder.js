import axios from "axios";
import { useContext } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import CheckOutSteps from "../component/checkOutSteps";
import { Store } from "../store";

export default function PlaceOrder() {
  let navigate = useNavigate();

  const { state, dispatch } = useContext(Store);
  const { cart, userInfo } = state;
  let totalPrice = 0;
  cart.cartItem.forEach((element) => {
    totalPrice += element.price * element.qun;
  });

  ///////////////////////////////////////////////////////
  const placeOrderHandler = async () => {
    const { data } = await axios.post(
      "https://shoppingserver-production.up.railway.app/order",
      {
        orderItem: cart.cartItem,
        shippingAddress: cart.shippingAddress.city,
        paymentMethod: cart.paymentMethod,
        itemsPrice: totalPrice,
        totalPrice: totalPrice + 2,
        userId: userInfo.id,
      },
      {
        headers: { authorization: `Bearer ${userInfo.token}` },
      }
    );
    toast.success("Ordered");

    dispatch({ type: "CART_CLEAR" });
    localStorage.removeItem("cartItem");
    navigate(`/`);
  };
  return (
    <>
      <CheckOutSteps step1 step2 step3 step4 />
      <ToastContainer />
      <Helmet>
        <title>Preview Order</title>
      </Helmet>
      <h1 className="my-3">Preview Order</h1>
      <Col md={8}>
        <Row>
          <Card>
            <Card.Body>
              <Card.Title>Shipping</Card.Title>
              <Card.Text>
                <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                <strong>Address: </strong> {cart.shippingAddress.country},
                {cart.shippingAddress.address},{cart.shippingAddress.city},{" "}
                {cart.shippingAddress.postalCode}
              </Card.Text>
              <Link to="/shipping">Edit</Link>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>payment Method</Card.Title>
              <Card.Text>payment Method is {cart.paymentMethod} </Card.Text>
              <Link to="/payment">Edit</Link>
            </Card.Body>
          </Card>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {cart.cartItem.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.imgUrl}
                          alt={item.name}
                          className="img-fluid rounded img-th"
                        ></img>{" "}
                        <Link to={`/product/${item.id}`}>{item.name}</Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>${item.price}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Link to="/cart">Edit</Link>
            </Card.Body>
          </Card>
        </Row>
      </Col>
      <Col md={4}>
        <Card>
          <Card.Body>
            <Card.Title>Order Summary</Card.Title>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>$ {totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>$ 2</Col>
                </Row>
              </ListGroup.Item>
              {/* <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>${cart.taxPrice}</Col>
                  </Row>
                </ListGroup.Item> */}
              <ListGroup.Item>
                <Row>
                  <Col>
                    <strong> Order Total</strong>
                  </Col>
                  <Col>
                    <strong>$ {totalPrice + 2}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="d-grid">
                  <Button
                    type="button"
                    onClick={placeOrderHandler}
                    disabled={cart.cartItem.length === 0}
                  >
                    Place Order
                  </Button>
                </div>
                {/* {loading && <LoadingBox></LoadingBox>} */}
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
}
