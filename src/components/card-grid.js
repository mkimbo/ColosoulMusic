import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import React, { Fragment, useState } from 'react';
import { AiOutlinePlayCircle } from 'react-icons/ai';
import { AiOutlinePauseCircle } from 'react-icons/ai';
import { AiOutlineShareAlt } from 'react-icons/ai';
import { mq } from './_shared/media';
import { StyledSection } from './_shared/styled-section';
import { ThreeDots } from 'svg-loaders-react';
import { WhatsappShareButton } from 'react-share';
//audio library
import { useAudioPlayer } from 'react-use-audio-player';

const StyledTextSection = styled.section`
  white-space: pre-line;
`;
const StyledFeatureGridContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 2.5rem;
  margin-top: 2.5rem;
  width: 100%;

  ${mq.gt.xs} {
    grid-template-columns: repeat(2, 1fr);
  }
  ${mq.gt.sm} {
    grid-template-columns: repeat(3, 1fr);
  }
`;
const StyledFeatureCard = styled.article`
  border: 2px dotted black;
  border-radius: var(--radius);

  display: flex;
  align-items: center;
  flex-direction: column;
  min-height: 255px;
  padding: 1rem;

  & svg {
    height: 2rem;
    width: 2rem;
    font-size: 2rem;
  }
`;
const StyledCardLabel = styled.h2`
  font-size: 1.2rem;
  margin: 1rem 0;
  color: var(--body-color);
`;
const StyledDivider = styled.div`
  width: 15%;
  height: 2px;
  background-color: var(--primary-color);
  margin-bottom: 1rem;
`;
const StyledFeatureDescription = styled.p`
  font-size: 0.9rem;
  margin-top: 5px;
  margin-bottom: 0px;
  text-align: center;
`;
const StyledShareButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;

const CardGrid = ({ cards, description, title, id = null }) => {
  const [currentUrl, setCurrentURL] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const { loading, playing, togglePlayPause } = useAudioPlayer({
    src: currentUrl,
    format: 'mp3',
    autoplay: true,
  });
  const featureCards = cards.map(({ icon, prefix, title, artists, url }, index) => {
    return (
      <StyledFeatureCard key={index}>
        <StyledCardLabel>{title}</StyledCardLabel>
        <StyledDivider></StyledDivider>
        {currentSong !== index ? (
          <AiOutlinePlayCircle
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setCurrentSong(index);
              setCurrentURL(url);
            }}
          />
        ) : (
          <Fragment>
            {!loading && !playing ? (
              <AiOutlinePlayCircle style={{ cursor: 'pointer' }} onClick={togglePlayPause} />
            ) : (
              <Fragment>
                {loading ? (
                  <ThreeDots />
                ) : (
                  <AiOutlinePauseCircle style={{ cursor: 'pointer' }} onClick={togglePlayPause} />
                )}
              </Fragment>
            )}
          </Fragment>
        )}
        <StyledFeatureDescription>{artists}</StyledFeatureDescription>
        <StyledShareButtons>
          <WhatsappShareButton
            title={`Listen to ${title} by ${artists}`}
            url={`https://colosoul-music.netlify.app/music`}
          >
            <AiOutlineShareAlt size={26} style={{ cursor: 'pointer', color: 'lightgray' }} />
          </WhatsappShareButton>
        </StyledShareButtons>
      </StyledFeatureCard>
    );
  });

  return (
    <StyledSection id={id}>
      <StyledTextSection dangerouslySetInnerHTML={{ __html: description }} />
      <StyledFeatureGridContainer>{featureCards}</StyledFeatureGridContainer>
    </StyledSection>
  );
};

CardGrid.propTypes = {
  cards: PropTypes.array.isRequired,
  description: PropTypes.string.isRequired,
  id: PropTypes.string,
  title: PropTypes.string,
};

export default CardGrid;
