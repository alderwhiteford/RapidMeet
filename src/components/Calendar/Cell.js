import React from 'react';
import styled from '@emotion/styled';

const CellWrapper = styled.div`
  border: 1px solid #ccc;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Cell() {
  return (
    <CellWrapper>
      <h1>CELL</h1>
    </CellWrapper>
  );
}

export default Cell;
