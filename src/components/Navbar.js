import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import mangeLogo from "../assets/images/Mange-Store-dark.png";
import { CartContext } from "./CartProvider";

const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const NavBrandLink = styled(NavLink)``;
const Logo = styled.img`
  width: 177px;
`;
const NavItems = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;
const NavItem = styled.li`
  padding: 0 10px;
`;
const Navlink = styled(NavLink)``;
const ButtonCart = styled.button`
  display: inline-block;
  padding: 10px;
  background-color: #006379;
  color: white;
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
  );
};

export default Navbar;
