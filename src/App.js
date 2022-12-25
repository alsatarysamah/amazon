import { BrowserRouter, Routes, Route, Link,  useNavigate } from "react-router-dom";
import Home from "./screen/home";
import Product from "./screen/product";
import NavBar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Badge, Nav, NavDropdown } from "react-bootstrap";
import { useContext } from "react";
import { Store } from "./store";
import CartScreen from "./screen/cartScreen";
import SigninScreen from "./screen/signinScreen";
import ShippingAddressScreen from "./screen/shippingAddresScreen";
import Signup from "./screen/signup";
import PaymentScreen from "./screen/payment";
import PlaceOrder from "./screen/placeOrder";

function App() {
 

  const {state,dispatch}=useContext(Store);
  const {cart,userInfo}=state;

  const signoutHandler=()=>{
    dispatch({type:"SIGNOUT"});
    localStorage.removeItem("userInfo")
    localStorage.removeItem("shippingAdress")
    localStorage.removeItem('paymentMethod');

   

  }
  return (
    <BrowserRouter>
      <div className="d-flex flex-column site">
      {/* <ToastContainer position="top-center" limit={1} /> */}

        <header>
          <NavBar bg="dark" variant="dark">
            <Container className="mt-3">
              <LinkContainer to="/">
                <NavBar.Brand>T-shirtee</NavBar.Brand>
              </LinkContainer>
              {/* <LinkContainer className="me-auto "> */}
                <Nav  className="mr-auto">
                  <Link to="/cart" className="nav-link"> 
                  <i className="fas fa-shopping-cart"></i>Cart
                  {cart?.cartItem?.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItem.length}
                      </Badge>
                    )}</Link>
                 
                {userInfo ? (
                    <NavDropdown title={userInfo.username} id="basic-nav-dropdown"  >
                      <LinkContainer to="/profile">
                        <NavDropdown.Item>User Profile</NavDropdown.Item>
                      </LinkContainer>
                      <LinkContainer to="/orderhistory">
                        <NavDropdown.Item>Order History</NavDropdown.Item>
                      </LinkContainer>
                      <NavDropdown.Divider />
                      <Link
                        className="dropdown-item"
                        to="#signout"
                        onClick={signoutHandler}
                      >
                        Sign Out
                      </Link>
                    </NavDropdown>
                  ) : (
                    <Link className="nav-link" to="/signin">
                      Sign In
                    </Link>
                  )}
                </Nav>
                  
            </Container>
          </NavBar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:id" element={<Product />} />
              <Route path="/shipping" element={<ShippingAddressScreen />}></Route>
              <Route path="/" element={<Home />}></Route>
              <Route path="/cart" element={<CartScreen />}></Route>
              <Route path="/signin" element={<SigninScreen />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/payment" element={<PaymentScreen />}></Route>
              <Route path="/placeorder" element={<PlaceOrder/>}></Route>





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
