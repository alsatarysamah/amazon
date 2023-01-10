import data from "../data";

import { useEffect, useState } from "react";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import Product from "../component/Product";
import { Helmet } from "react-helmet-async";
import {items} from "../../src/data"

export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("https://shoppingserver-production.up.railway.app/item");
      console.log(res.data);
      setProducts(res.data);

    };
    fetchData();
 
  }, []);
  return (
    <>
    <Helmet>
      <title>T-shirtee</title>
    </Helmet>
      <h1>list of product</h1>
      <Row>
        <div className="products">
          {products.map((product, idx) => (
            <Col sm={6} md={4} lg={3} className="mb-3">
              <Product product={product} id={idx}></Product>
            </Col>
          ))}
        </div>
      </Row>
    </>
  );
}
