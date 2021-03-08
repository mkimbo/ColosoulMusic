import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import React from 'react';
import ButtonLink from './links/button-link';
import ScrollIndicator from './scroll-indicator';
import { mq } from './_shared/media';
import { StyledSection } from './_shared/styled-section';
import classes from '../styles/BackgroundVideo.module.css';
const StyledHeroSection = styled(StyledSection)`
  min-height: calc(100vh - 2 * var(--header-height));
  position: relative;

  ${mq.gt.sm} {
    min-height: calc(100vh - var(--header-height));
    margin-top: 0px !important;
  }
`;
const StyledIntroduction = styled.div`
  color: var(--primary-color);
  font-weight: normal;
`;
const StyledAuthor = styled.h1`
  margin-left: -4px !important;
  font-size: 40px;
  line-height: 1.1;
  margin: 0;
  word-break: break-word;

  ${mq.gt.xs} {
    font-size: 80px;
  }
`;
const StyledTagline = styled.h2`
  margin-left: -4px !important;
  font-size: 40px;
  line-height: 1.1;
  margin: 0;
  color: var(--primary-color);
  word-break: break-word;

  ${mq.gt.xs} {
    font-size: 80px;
  }
`;
const StyledDescription = styled.div`
  margin-top: 0.5rem;
  width: 100%;
  max-width: 500px;
`;

const Hero = ({ data }) => {
  const { introduction, author, tagline, description, ctaLink, ctaLabel } = data;
  const videoSource = '../assets/background.mp4';
  return (
    <div className={classes.Container}>
      <video
        autoPlay="autoplay"
        loop="loop"
        playsinline="true"
        disablePictureInPicture="true"
        muted
        className={classes.Video}
      >
        <source src="video/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className={classes.Content}>
        <div className={classes.SubContent}>
          <StyledHeroSection>
            <StyledIntroduction>{introduction}</StyledIntroduction>
            <StyledAuthor>{author}</StyledAuthor>
            <StyledTagline>{tagline}</StyledTagline>
            <StyledDescription dangerouslySetInnerHTML={{ __html: description }} />
            <ButtonLink label={ctaLabel} link={ctaLink} />
            <ScrollIndicator />
          </StyledHeroSection>
        </div>
      </div>
    </div>
  );
};

Hero.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Hero;
