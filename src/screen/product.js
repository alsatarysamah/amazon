import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Badge, Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import Rating from "../component/Rating";
import { Store } from "../store";

export default function Product() {
  const [product, setProduct] = useState();
  const parms = useParams();
  const { id } = parms;
  const navigate=useNavigate();

  const fetchData = async () => {
    const res = await axios.get(`https://shoppingserver-production.up.railway.app/item/${id}`);
    setProduct(res.data);
    // console.log(product.name);
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = () => {
    const existItem = cart.cartItem.find((x) => x.id === product.id);

    const quantity = existItem ? existItem.qun + 1 : 1;
    dispatch({ type: "ADD", payload: { ...product, qun: quantity } });
    navigate("/cart")
  };
  return (
    <div>
      {product && (
        <Row>
          <Col md={6}>
            <img className="image-large" src={product.imgUrl}></img>
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Helmet>
                  <title>{product.name}</title>
                </Helmet>
                <h1>{product.name}</h1>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating num="3" rating="3"></Rating>
              </ListGroup.Item>

              <ListGroup.Item>
                <p>{product.description}</p>
              </ListGroup.Item>
              <ListGroup.Item>
                <p>Price : {product.price}</p>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>
                        <Row>Price :</Row>
                        <Row><strong>{product.price}</strong> </Row>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <p>
                      Statues :{" "}
                      {product.price > 6 ? (
                        <Badge bg="success">High</Badge>
                      ) : (
                        <Badge bg="danger">Unavailable</Badge>
                      )}
                    </p>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {product.price > 0 ? (
                      <Button
                        onClick={addToCartHandler}
                        variant="primary"
                        className="btn-add"
                      >
                        Add to cart
                      </Button>
                    ) : null}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
}
