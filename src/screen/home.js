import data from "../data";

import { useEffect, useState } from "react";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import Product from "../component/Product";
import { Helmet } from "react-helmet-async";

export default function Home() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:5000/item");
      setProducts(res.data);
    };
    fetchData();
  }, []);
  return (
    <>
    <Helmet>
      <title>Amazon</title>
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
