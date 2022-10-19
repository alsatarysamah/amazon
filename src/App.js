import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./screen/home";
import Product from "./screen/product";
import NavBar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { NavLink } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Badge, Nav } from "react-bootstrap";
import { useContext } from "react";
import { Store } from "./store";

function App() {

  const {state}=useContext(Store);
  const {cart}=state;
  console.log(cart.cartItem.length);
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site">
        <header>
          <NavBar bg="dark" variant="dark">
            <Container className="mt-3">
              <LinkContainer to="/">
                <NavBar.Brand>Amazon</NavBar.Brand>
              </LinkContainer>
              {/* <LinkContainer className="me-auto "> */}
                <Nav  className="me-auto ">
                  <Link to="/cart" className="nav-link"> Cart
                  {cart?.cartItem?.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItem.length}
                      </Badge>
                    )}</Link>
                 
                </Nav>
              
            </Container>
          </NavBar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:id" element={<Product />} />

              <Route path="/" element={<Home />}></Route>
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All right is reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
