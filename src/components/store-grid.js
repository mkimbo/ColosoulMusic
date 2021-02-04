import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';
import { mq } from './_shared/media';
import { StyledSection } from './_shared/styled-section';
const StyledTextSection = styled.section`
  white-space: pre-line;
`;
const StyledStoreGridContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0.5rem;
  margin-top: 2.5rem;
  width: 100%;
  min-height: 500px;

  ${mq.gt.xs} {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2.5rem;
  }
`;
const StyledItemCard = styled.div`
  border-radius: var(--radius);
  display: flex;
  background-color: #ddd;
  align-items: center;
  flex-direction: column;
  min-height: 400px;
  padding: 1rem;
`;
const StyledItemLabel = styled.h2`
  font-size: 1.5rem;
  margin: 1rem 0;
  color: var(--body-color);
`;
const StyledDivider = styled.div`
  width: 15%;
  height: 2px;
  background-color: var(--primary-color);
  margin-bottom: 1rem;
`;
const StyledItemDetails = styled.p`
  font-size: 0.8rem;
`;

const StoreGrid = () => {
  return (
    <StyledSection>
      <StyledStoreGridContainer>
        <StyledItemCard />
        <StyledItemCard />
        <StyledItemCard />
        <StyledItemCard />
        <StyledItemCard />
      </StyledStoreGridContainer>
    </StyledSection>
  );
};

StoreGrid.propTypes = {
  cards: PropTypes.array.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string,
  title: PropTypes.string,
};

export default StoreGrid;
