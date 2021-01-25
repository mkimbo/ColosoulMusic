import styled from '@emotion/styled';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import React from 'react';
import Icon from './icon';
import TextLink from './links/text-link';
import TagList from './tag-list';
import { mq } from './_shared/media';
import { StyledContentLink } from './_shared/styled-content-link';
import { StyledH1, StyledH2 } from './_shared/styled-headings';
import { StyledImageContainer } from './_shared/styled-image-container';
import { contentBox, flexCenter, flexEnd } from './_shared/styled-mixins';
import { StyledSection } from './_shared/styled-section';

const StyledFeaturedProject = styled.article`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 2.5rem;
  padding: 2.5rem 0;

  ${mq.gt.sm} {
    grid-template-columns: repeat(2, 1fr);
  }
  &:nth-of-type(even) {
    direction: rtl;
  }
  &:nth-of-type(even) * {
    direction: ltr;
  }
`;
const StyledProjectInfoContainer = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
`;
const StyledDescription = styled.section`
  ${contentBox}
  max-height: 180px;
  position: relative;
  padding: 10px;

  > p {
    height: 100%;
    margin: 0;
    font-size: 0.8rem;
    overflow: hidden;
  }
`;
const StyledLinkContainer = styled.section`
  ${flexEnd};
  margin: 10px 0;

  & > a {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--body-color);

    &:hover {
      color: var(--primary-color);
    }
  }

  & svg {
    margin: 0 0.5rem;
  }
`;
const StyledArchiveContainer = styled.div`
  ${flexCenter};
  width: 100%;
  margin-top: 2.5rem;
`;

const FeaturedAlbums = ({ featured }) => {
  const featuredAlbums = featured.map((project, index) => {
    const coverImage = project.node.frontmatter.cover_image
      ? project.node.frontmatter.cover_image.childImageSharp.fluid
      : null;

    const title = project.node.frontmatter.title;
    const soundCloudLink = project.node.frontmatter.soundcloud_link;
    const soundCloudLinkLabel = `featured project ${title} demo`;

    return (
      <StyledFeaturedProject key={title + index}>
        <a
          aria-label={`featured project ${title}`}
          href={soundCloudLink ? soundCloudLink : '#'}
          target="_blank"
          rel="noopener"
        >
          {coverImage && (
            <StyledImageContainer hasHover>
              <Img fluid={coverImage} />
            </StyledImageContainer>
          )}
        </a>
        <StyledProjectInfoContainer>
          <Link to={`/albums${project.node.fields.slug}`}>
            <StyledContentLink>
              <StyledH2>{title}</StyledH2>
            </StyledContentLink>
          </Link>
          <StyledDescription dangerouslySetInnerHTML={{ __html: project.node.frontmatter.description }} />
          <TagList artists={project.node.frontmatter.artists} />
          <StyledLinkContainer>
            {soundCloudLink && (
              <a
                href={soundCloudLink}
                target="_blank"
                rel="noopener"
                title="Buy on Soundcloud"
                aria-label={soundCloudLinkLabel}
              >
                <Icon icon="external-link-alt" />
              </a>
            )}
          </StyledLinkContainer>
        </StyledProjectInfoContainer>
      </StyledFeaturedProject>
    );
  });

  return (
    <StyledSection id="projects">
      <StyledH1>Featured Albums</StyledH1>
      {featuredAlbums}
      <StyledArchiveContainer>
        <TextLink label="View More Albums" link="/albums" />
      </StyledArchiveContainer>
    </StyledSection>
  );
};

FeaturedAlbums.propTypes = {
  featured: PropTypes.array.isRequired,
};

export default FeaturedAlbums;
