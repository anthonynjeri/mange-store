import React from "react";
import styled from "styled-components";

const Container = styled.div``;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;
const TableHead = styled.thead`
  color: white;
  border: 1px solid white;
  border-top: 0;
  background-color: #00b157;
`;
const TableRow = styled.tr`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const TableHeader = styled.th`
  padding: 15px;
`;
const TableBody = styled.tbody`
  font-size: 18px;
  border: 1px solid white;
`;
const TableData = styled.td`
  padding: 10px;
`;

const ProductDetailNutrition = ({ nutrition }) => {
  return (
    <Container>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>Nutrients</TableHeader>
            <TableHeader>Value</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableData>Protein</TableData>
            <TableData>{nutrition.protein} g</TableData>
          </TableRow>
          <TableRow>
            <TableData>Carbohydrates</TableData>
            <TableData>{nutrition.carbs} g</TableData>
          </TableRow>
          <TableRow>
            <TableData>Fat</TableData>
            <TableData>{nutrition.fat} g</TableData>
          </TableRow>
          <TableRow>
            <TableData>Salt</TableData>
            <TableData>{nutrition.salt} g</TableData>
          </TableRow>
        </TableBody>
      </Table>
    </Container>
  );
};

export default ProductDetailNutrition;
