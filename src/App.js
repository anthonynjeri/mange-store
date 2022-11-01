import { BrowserRouter, Routes, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import About from "./components/About";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import { CartProvider } from "./components/CartProvider";

const Container = styled.div``;
function App() {
  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <Navbar />
          <Container>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/about">
                <About />
              </Route>
              <Route exact path="/products">
                <Products />
              </Route>
              <Route exact path="/cart">
                <Cart />
              </Route>
              <Route path="/products/:id">
                <ProductDetails />
              </Route>
            </Switch>
          </Container>
        </CartProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
