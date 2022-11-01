import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CartContext } from "./CartProvider";

const Container = styled.div``;
const ProductWrapper = styled.div`
  background-color: white;
  padding: 15px 20px;
  border-radius: 25px;
  display: grid;
  grid-template-columns: auto 1fr auto;
`;
const ProductImageContainer = styled.div`
  position: relative;
`;
const ImageContainer = styled.div`
  width: 100px;
  height: 100px;
  background-color: coral;
  padding: 10px;
  border-radius: 20px;
  transition: transform 180ms ease-out;
`;
const Image = styled.img`
  width: 100px;
  height: 100px;
`;

const ProductQuantityContainer = styled.div`
  position: absolute;
  top: 8px;
  right: -15px;
  background-color: white;
  border-radius: 50%;
  padding: 5px;
`;
const ProductQuantity = styled.div`
  background-color: #5ec401;
  color: white;
  border-radius: 50%;
  font-size: 14px;
  width: 23px;
  height: 23px;
  display: grid;
  place-items: center;
`;
const ProductInfo = styled.div`
  padding-left: 25px;
`;
const ProductCheckout = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  justify-items: end;
`;
const ButtonDelete = styled.button`
  background-color: white;
  display: inline-block;
  padding: 5px 10px;
  color: red;
  border: 2px solid red;
  border-radius: 3px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: #5ec401;
    color: white;
    transition: background-color 200ms, color 200ms;
  }
`;
const PriceButton = styled.button`
  border-radius: 3px;
  display: inline-block;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  padding: 13px 40px;
  border: 0;
  background-color: #5ec401;
  transition: background-color 200ms, color 200ms;
  &:hover {
    background-color: rgba(94, 196, 1, 0.8);
    color: white;
  }
`;
const Product = ({ details }) => {
  const { id } = details;
  const { handleProductAdd, handleProductDelete, cart } =
    useContext(CartContext);

  const productFromCart = cart.find((product) => product.id === id);
  const quantity = productFromCart ? productFromCart.quantity : 0;
  return (
    <Container>
      <ProductWrapper>
        <ProductImageContainer>
          <ImageContainer>
            <Link to={`/products/${id}`}>
              <Image
                src={details.image}
                width="100"
                height="100"
                className="product-image"
                alt="product name here"
              />
            </Link>
          </ImageContainer>
          <ProductQuantityContainer>
            {quantity > 0 && <ProductQuantity>{quantity}</ProductQuantity>}
          </ProductQuantityContainer>
        </ProductImageContainer>
        <ProductInfo>
          <h3>{details.name}</h3>
          <p>{details.description}</p>
        </ProductInfo>
        <ProductCheckout>
          <div>
            {quantity > 0 && (
              <ButtonDelete
                className="product-delete"
                onClick={() => handleProductDelete(id)}
              >
                x
              </ButtonDelete>
            )}
          </div>
          <PriceButton onClick={() => handleProductAdd(details)}>
            ${details.price}
          </PriceButton>
        </ProductCheckout>
      </ProductWrapper>
    </Container>
  );
};

export default Product;
