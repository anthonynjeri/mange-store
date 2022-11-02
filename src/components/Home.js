import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import groceryStoreimg from "../assets/images/pexels-pixabay-264636.jpg";

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 30px;
`;
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;
  grid-gap: 20px;
  padding-top: 40px;
  padding-bottom: 40px;
  @media screen and (max-width: 700px) {
    grid-template-columns: 1fr;
    flex-direction: column;
  }
`;
const Content = styled.div`
  width: 100%;
  order: 1;
  @media screen and (max-width: 700px) {
    order: 2;
  }
`;
const Title = styled.h1``;
const Lead = styled.span``;
const Desc = styled.p`
  margin: 30px 0;
`;
const Button = styled(Link)`
  padding: 15px 42px;
  border: 0;
  background-color: #00b157;
  font-weight: 600;

  border-radius: 3px;
  display: inline-block;
  color: white;
  transition: background-color 200ms, color 200ms;

  &:hover {
    background-color: #00997b;
  }
`;
const ImageContainer = styled.div`
  order: 2;
  height: 300px;
  width: 100%;
  overflow: hidden;
  @media screen and (max-width: 700px) {
    order: 1;
    width: 100%;
  }
`;
const Image = styled.img`
  object-fit: cover;
`;
const Home = () => {
  return (
    <Container>
      <Wrapper>
        <Content>
          <Title>Online Shopping at your finger-tips</Title>
          <Desc>
            Order your dairy products and groceries from{" "}
            <Lead>Mange-Store</Lead> with our easy to use app, and get your
            orders delivered straight to your doorstep.
          </Desc>
          <Button to="products">Start shopping</Button>
        </Content>
        <ImageContainer>
          <Image src={groceryStoreimg} />
        </ImageContainer>
      </Wrapper>
    </Container>
  );
};

export default Home;
