import React from "react";
import styled from "styled-components";

const Container = styled.div``;
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 20px;
  padding-top: 40px;
  padding-bottom: 40px;
`;
const Content = styled.div``;
const Title = styled.h1``;
const Desc = styled.p``;
const Bold = styled.em``;

const ImageContainer = styled.div``;
const Image = styled.img`
  height: 275px;
  width: 183px;
`;

const About = () => {
  return (
    <Container>
      <Wrapper>
        <Content>
          <Title>About Us</Title>
          <Desc>
            We started operations in 2020. We guarantee fresh produce.
            <br />
            Save time by shopping on our app and we'll deliver the products
            right to your home. <br />
            <Bold>We use Stripe to process your payment.</Bold>
          </Desc>
        </Content>
        <ImageContainer>
          <Image
            src={
              "https://res.cloudinary.com/dbfn5lnvx/image/upload/q_auto,w_550/v1607770215/react-tutorial/supermarket/about.jpg"
            }
          />
        </ImageContainer>
      </Wrapper>
    </Container>
  );
};

export default About;
