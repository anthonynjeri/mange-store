import React from "react";
import styled from "styled-components";
import aboutImg from "../assets/images/leonie-wise-NLU117HCVuc-unsplash.jpg";

const Container = styled.div`
max-width: 1440px;
  margin: 0 auto;
  padding 0 30px;
`;
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 20px;
  padding-top: 40px;
  padding-bottom: 40px;
  @media screen and (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;
const Content = styled.div`
  width: 100%;
  order: 1;
  @media screen and (max-width: 700px) {
    order: 2;
    width: 100%;
  }
`;
const Title = styled.h1``;
const Desc = styled.p``;
const Bold = styled.span`
  font-weight: bold;
  font-style: italic;
`;

const ImageContainer = styled.div`
  width: 100%;
  order: 2;
  @media screen and (max-width: 700px) {
    order: 1;
  }
`;
const Image = styled.img`
  // height: 275px;
  width: 100%;
  object-fit: contain;
`;

const About = () => {
  return (
    <Container>
      <Wrapper>
        <Content>
          <Title>About Us</Title>
          <Desc>
            We are an Online groceries that offers a variety of groceries and
            dairy. 100% guaranteed fresh produce.
            <br />
            Save some time today by shopping on our app and we'll deliver the
            goods straight to your doorstep. <br />
          </Desc>
          <Desc>
            For safe and secure online payments.
            <Bold> We use Stripe to process your payment.</Bold>
          </Desc>
        </Content>
        <ImageContainer>
          <Image src={aboutImg} />
        </ImageContainer>
      </Wrapper>
    </Container>
  );
};

export default About;
