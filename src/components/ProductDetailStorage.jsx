import React from "react";
import styled from "styled-components";

const Container = styled.div``;
const Desc = styled.p``;
const Lead = styled.strong``;

const ProductDetailStorage = ({ storage }) => {
  return (
    <>
      <Container>
        <Desc>
          <Lead>Storage instructions:</Lead> {storage}
        </Desc>
      </Container>
    </>
  );
};
export default ProductDetailStorage;
