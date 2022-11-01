import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import groceryStoreimg from "../assets/images/pexels-pixabay-264636.jpg";

const Container = styled.div`
  //   background-image: url(${groceryStoreimg});
  //   height: 100vh;
  //   background-repeat: no-repeat;
  //   background-size: cover;
  //   background-position: center center center;
  //   display: flex;
  //   align-items: center;
`;
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  place-items: center;
  grid-gap: 20px;
  padding-top: 40px;
  padding-bottom: 40px;
`;
const Content = styled.div``;
const Title = styled.h1``;
const Lead = styled.span``;
const Desc = styled.p`
  margin: 30px 0;
`;
const Button = styled(Link)`
  padding: 15px 42px;
  border: 0;
  background-color: #5ec401;
  border-radius: 4px;
  display: inline-block;
  color: white;
`;
const ImageContainer = styled.div`
  height: 300px;
  width: 400px;
  overflow: hidden;
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
