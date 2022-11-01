import React, { useContext } from "react";
import styled from "styled-components";
import { CartContext } from "./CartProvider";
const Container = styled.div``;
const Desc = styled.p``;
const Button = styled.button`
  display: inline-block;
  cursor: pointer;
  background-color: #5ec401;
  color: white;
  width: 100%;
  font-size: 14px;
  font-weight: 600;
  padding: 13px 40px;
  border-radius: 3px;
  border: 0;
  transition: background-color 200ms, color 200ms;

  &:hover {
    background-color: rgba(94, 196, 1, 0.8);
  }
`;
export default function ProductDetailInfo({ details }) {
  const { handleProductAdd, cart } = useContext(CartContext);
  console.log(cart);
  return (
    <>
      <Container>
        <Desc>
          {details.description} goes for <strong>${details.price}</strong> per
          piece.
        </Desc>
        <Button onClick={() => handleProductAdd(details)}>
          ${details.price}
        </Button>
      </Container>
    </>
  );
}
