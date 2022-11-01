import React, { useState, useEffect } from "react";
import Product from "./Product";
import useFetch from "../hooks/useFetch";
import styled from "styled-components";
import Loader from "./Loader";

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 40px 0;
`;
const Title = styled.h1``;
const Desc = styled.p``;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 25px;
`;

const Products = () => {
  const [products, setProducts] = useState([]);
  const { get, loading } = useFetch(
    "https://react-tutorial-demo.firebaseio.com/"
  );

  useEffect(() => {
    get("supermarket.json")
      .then((data) => setProducts(data))
      .catch((error) =>
        console.log(`There was an error fetching the data ${error}`)
      );
  }, []);

  return (
    <Container>
      <Wrapper>
        <Title>Products</Title>
        <Desc>Take a look at our products</Desc>
        <GridContainer>
          {loading && <Loader />}
          {products.map((product) => (
            <Product key={product.id} details={product} />
          ))}
        </GridContainer>
      </Wrapper>
    </Container>
  );
};

export default Products;
