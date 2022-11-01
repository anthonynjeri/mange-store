import React, { useContext, useState } from "react";
import { CartContext } from "./CartProvider";
import styled from "styled-components";
import { loadStripe } from "@stripe/stripe-js";

const stripeKey =
  "pk_test_51KZG2fHrJWQTUDnecxdmO2tjWUEGVNXnC8n2sEvta93pSiW5JyIXiodzfmiyr9acDAzuj6eMdOSEINMwKxGIFXwz002v7e2hNt";
// const stripeLoadedPromise = loadStripe(
//   "pk_test_51HsqkCGuhXEITAut89vmc4jtjYd7XPs8hWfo2XPef15MFqI8rCFc8NqQU9WutlUBsd8kmNqHBeEmSrdMMpeEEyfT00KzeVdate"
// );
const stripeLoadedPromise = loadStripe(stripeKey);
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
          successUrl: "http://localhost:3000/",
          cancelUrl: "http://localhost:3000/",
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
    <div>
      <div className="cart-layout">
        {cart.length === 0 && (
          <div>
            <h1>Your Cart</h1>
            <p>You have not added any product to your cart yet.</p>
          </div>
        )}
        {cart.length > 0 && (
          <TableContainer>
            <Table class="table table-cart">
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
                      <Image
                        width="30"
                        src={product.image}
                        height="30"
                        alt=""
                      />
                      {product.name}
                    </TableData>
                    <TableData>${product.price}</TableData>
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
            <form className="pay-form" onSubmit={handleFormSubmit}>
              <p>
                Enter your email and then click on pay and your products will be
                delivered to you on the same day!
              </p>
              <input
                value={email}
                onChange={(event) => handleEmailChange(event)}
                autoComplete="email"
                placeholder="Email"
                type="email"
                required
              />
              <button type="submit">Pay</button>
            </form>
          </TableContainer>
        )}
      </div>
    </div>
  );
};

export default Cart;
