import React, { useContext } from "react";
import styled from "styled-components";
import { CartContext } from "./CartProvider";
const Container = styled.div``;
const Desc = styled.p``;
const Button = styled.button`
  display: inline-block;
  cursor: pointer;
  background-color: #00b157;
  color: white;
  width: 100%;
  font-size: 14px;
  font-weight: 600;
  padding: 13px 40px;
  border-radius: 3px;
  border: 0;
  transition: background-color 200ms, color 200ms;

  &:hover {
    background-color: #00997b;
  }
`;
export default function ProductDetailInfo({ details }) {
  const { handleProductAdd } = useContext(CartContext);

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
