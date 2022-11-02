import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import mangeLogo from "../assets/images/Mange-Store.png";
import { CartContext } from "./CartProvider";

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 10px 30px;
`;
const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 700px) {
    // align-items: flex-start;
  }
`;
const NavBrandLink = styled(NavLink)``;
const Logo = styled.img`
  width: 177px;
`;
const NavItems = styled.ul`
  display: flex;
  align-items: center;
  @media screen and (max-width: 700px) {
    flex-direction: column;
  }
`;
const NavItem = styled.li`
  padding: 0 10px;
  @media screen and (max-width: 700px) {
    padding: 10px 0;
  }
`;
const Navlink = styled(NavLink)`
  font-weight: 600;
  color: #00997b;
  transition: all ease 200ms;
  &:hover {
    border-bottom: 2px solid #00b157;
    color: #00b157;
  }
  &.active {
    color: #00b157;
  }
`;
const ButtonCart = styled.button`
  display: inline-block;
  padding: 10px;
  background-color: #006379;
  color: white;
  font-weight: 600;
  border: 0;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 200ms, color 200ms;
  &:hover {
    background-color: #007e86;
  }
`;
const Navbar = () => {
  const { cart } = useContext(CartContext);
  const cartQuantity = cart.reduce((sum, product) => {
    return sum + product.quantity;
  }, 0);

  return (
    <Container>
      <Nav>
        <NavBrandLink to="/">
          <Logo src={mangeLogo} />
        </NavBrandLink>
        <NavItems>
          <NavItem>
            <Navlink exact activeClassName="active" to="/">
              Home
            </Navlink>
          </NavItem>
          <NavItem>
            <Navlink exact activeClassName="active" to="/about">
              About
            </Navlink>
          </NavItem>
          <NavItem>
            <Navlink exact activeClassName="active" to="/products">
              Products
            </Navlink>
          </NavItem>
          <NavItem>
            <Navlink exact activeClassName="active" to="/cart">
              <ButtonCart>Cart ({cartQuantity})</ButtonCart>
            </Navlink>
          </NavItem>
        </NavItems>
      </Nav>
    </Container>
  );
};

export default Navbar;
