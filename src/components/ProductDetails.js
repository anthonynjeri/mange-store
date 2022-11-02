import React, { useEffect, useState } from "react";
import {
  NavLink,
  Route,
  useParams,
  useRouteMatch,
  Switch,
} from "react-router-dom";

import styled from "styled-components";
import useFetch from "../hooks/useFetch";
import Loader from "./Loader.js";
import ProductDetailStorage from "./ProductDetailStorage.js";
import ProductDetailNutrition from "./ProductDetailNutrition.js";
import ProductDetailInfo from "./ProductDetailInfo.js";

const Container = styled.div`max-width: 1440px;
margin: 0 auto;
padding 0 30px;`;
const TopContainer = styled.div``;
const BottomContainer = styled.div``;

const ImageContainer = styled.div`
  background-color: white;
  padding: 10px;
  border-radius: 20px;
`;
const Image = styled.img`
  width: 125px;
  height: 125px;
`;
const TabsContainer = styled.div`
  margin: 0 0 40px 0;
`;
const TabsUl = styled.ul`
  margin: 0;
  padding: 0;
  padding-bottom: 10px;
`;
const TabsLi = styled.li`
  display: inline-block;
`;
const NavlinkDetails = styled(NavLink)`
  padding-bottom: 10px;
  color: var(--black);
  padding-left: 15px;
  padding-right: 15px;

  &.active {
    border-bottom: 7px solid #00b157;
  }
`;

const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState([]);
  const params = useParams();
  const { id } = params;
  const match = useRouteMatch();

  const { get, loading } = useFetch(
    "https://react-tutorial-demo.firebaseio.com/"
  );
  useEffect(() => {
    get(`productinfo/id${id}.json`)
      .then((data) => setProductDetails(data))
      .catch((error) => console.log(error));
  }, [id, get]);
  return (
    <>
      <Container>
        {loading && <Loader />}
        <TopContainer>
          <h2>{productDetails.name}</h2>
          <ImageContainer>
            <Image
              src={productDetails.image}
              className="product-details-image"
              alt={productDetails.name}
            />
          </ImageContainer>
        </TopContainer>
        <BottomContainer>
          <TabsContainer>
            <TabsUl>
              <TabsLi>
                <NavlinkDetails
                  exact
                  activeClassName="active"
                  to={`${match.url}`}
                >
                  Details
                </NavlinkDetails>
              </TabsLi>
              <TabsLi>
                <NavlinkDetails
                  exact
                  activeClassName="active"
                  to={`${match.url}/nutrition`}
                >
                  Nutrition
                </NavlinkDetails>
              </TabsLi>
              <TabsLi>
                <NavlinkDetails
                  exact
                  activeClassName="active"
                  to={`${match.url}/storage`}
                >
                  Storage
                </NavlinkDetails>
              </TabsLi>
            </TabsUl>
          </TabsContainer>
        </BottomContainer>
        <Switch>
          <Route exact path={`${match.path}`}>
            <ProductDetailInfo details={productDetails} />
          </Route>
          <Route path={`${match.path}/nutrition`}>
            <ProductDetailNutrition nutrition={productDetails.nutrition} />
          </Route>
          <Route path={`${match.path}/storage`}>
            <ProductDetailStorage storage={productDetails.storage} />
          </Route>
        </Switch>
      </Container>
    </>
  );
};
export default ProductDetails;
