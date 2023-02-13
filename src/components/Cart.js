import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "./CartProvider";
import styled from "styled-components";
import { loadStripe } from "@stripe/stripe-js";

// Intergrating stripe payment for checkout
const stripeKey =
  "pk_test_51KZG2fHrJWQTUDnecxdmO2tjWUEGVNXnC8n2sEvta93pSiW5JyIXiodzfmiyr9acDAzuj6eMdOSEINMwKxGIFXwz002v7e2hNt";

const stripeLoadedPromise = loadStripe(stripeKey);

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 30px;
`;
const Wrapper = styled.div``;
const TableContainer = styled.div``;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
`;
const TableHead = styled.thead`
  color: white;
  border: 1px solid white;
  border-top: 0;
  background-color: #006379;
`;
const TableRow = styled.tr``;
const TableHeader = styled.th`
  width: ${(props) => props.width};
  padding: 15px;

  &.th-product {
    text-align: left;
    padding-left: 25px;
  }
`;
const TableData = styled.td`
  padding: 10px;
  &:first-child {
    display: flex;
    align-items: center;
    gap: 15px;
    padding-left: 20px;
  }
`;
const TableBody = styled.tbody`
  font-size: 18px;
  border: 1px solid white;
`;
const TableFooter = styled.tfoot`
  background-color: #006379;
  color: white;
`;
const Image = styled.img`
  height: 30px;
  width: 30px;
`;
const TextContent = styled.div``;
const Title = styled.h1``;
const Desc = styled.p``;
const Form = styled.form`
  padding-top: 30px;
  width: 85%;
`;
const Input = styled.input`
  padding: 15px;
  border: 0;
  background-color: #e4f7d2;

  caret-color: #00ab72;
  &:focus {
    outline: 0;
  }
`;
const Button = styled.button`
  cursor: pointer;
  padding: 15px 30px;
  font-weight: 600;
  border: 0;
  color: white;
  display: block;
  background-color: #00b947;
  border-radius: 3px;
  margin-top: 15px;
  transition: background-color 200ms, color 200ms;

  &:hover {
    background-color: #00997b;
  }
`;
const ButtonShop = styled(Link)`
  padding: 15px 42px;
  border: 0;
  background-color: #00b157;
  border-radius: 3px;
  display: inline-block;
  color: white;
  transition: background-color 200ms, color 200ms;

  &:hover {
    background-color: #00997b;
  }
`;
const Cart = () => {
  const [email, setEmail] = useState("");
  const { cart } = useContext(CartContext);
  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  // handlers
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    console.log(email);
  };

  const priceIds = {
    Tomato: "price_1LzQXeHrJWQTUDneTXS2qSLN",
    Pineapple: "price_1LzQZLHrJWQTUDneAmNHmmVB",
    Cheese: "price_1LvxwrHrJWQTUDneYdA24dvT",
    Milk: "price_1LzQWPHrJWQTUDnew9N4UeJo",
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const lineItems = cart.map((product) => {
      return {
        price: `${priceIds[product.name]}`,
        quantity: product.quantity,
      };
    });
    stripeLoadedPromise.then((stripe) => {
      stripe
        .redirectToCheckout({
          lineItems: lineItems,
          mode: "payment",
          successUrl: "https://papaya-churros-7b8cfb.netlify.app",
          cancelUrl: "https://papaya-churros-7b8cfb.netlify.app",
          customerEmail: email,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };
  return (
    <Container>
      <Wrapper>
        {cart.length === 0 && (
          <TextContent>
            <Title>Cart</Title>
            <Desc>Your cart is currently empty</Desc>
            <ButtonShop to="products">Shop Products</ButtonShop>
          </TextContent>
        )}
        {cart.length > 0 && (
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader width="25%" className="th-product">
                    Product
                  </TableHeader>
                  <TableHeader width="20%">Unit price</TableHeader>
                  <TableHeader width="10%">Quanity</TableHeader>
                  <TableHeader width="25%">Total</TableHeader>
                </TableRow>
              </TableHead>

              <TableBody>
                {cart.map((product) => (
                  <TableRow key={product.id}>
                    <TableData>
                      <Image src={product.image} alt={product.name} />
                      {product.name}
                    </TableData>
                    <TableData>${product.price.toFixed(2)}</TableData>
                    <TableData>{product.quantity}</TableData>
                    <TableData>
                      <strong>${product.price * product.quantity}</strong>
                    </TableData>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableHeader colSpan="2"></TableHeader>
                  <TableHeader>Total</TableHeader>
                  <TableHeader>${totalPrice}</TableHeader>
                </TableRow>
              </TableFooter>
            </Table>
            <Form onSubmit={handleFormSubmit}>
              <Desc>
                Enter your email and then click on checkout to proceed with your
                payment, once confirmed your goods will be delivered to you in a
                couple of hours!
              </Desc>
              <Input
                value={email}
                onChange={(event) => handleEmailChange(event)}
                autoComplete="email"
                placeholder="Email"
                type="email"
                required
              />
              <Button type="submit">Checkout</Button>
            </Form>
          </TableContainer>
        )}
      </Wrapper>
    </Container>
  );
};

export default Cart;
