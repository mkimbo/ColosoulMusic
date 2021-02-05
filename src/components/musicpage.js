import styled from '@emotion/styled';
import { graphql, useStaticQuery } from 'gatsby';
import React, { useState } from 'react';
import Layout from './layout';
import CardGrid from './card-grid';
import SEO from './seo';
import { indexMenuLinks } from './_config/menu-links';
import { StyledPageHeader } from './_shared/styled-headings';
import { StyledFullHeightSection } from './_shared/styled-section';
import { StyledSeparator } from './_shared/styled-separator';
//audio library
import { useAudioPlayer } from 'react-use-audio-player';

const StyledProjectsH1 = styled(StyledPageHeader)`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;
const Music = ({}) => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        sort: { order: DESC, fields: frontmatter___date }
        filter: { fileAbsolutePath: { regex: "/content/projects/" }, frontmatter: { featured: { eq: false } } }
      ) {
        nodes {
          frontmatter {
            date(formatString: "D MMMM, YYYY")
            title
            repo_link
            demo_link
            techs
          }
          html
        }
      }
      cards: markdownRemark(fileAbsolutePath: { regex: "/content/sections/cards/" }) {
        frontmatter {
          cards {
            title
            icon
            prefix
            artists
            url
          }
        }
        html
      }
    }
  `);
  const {
    cards,
    allMarkdownRemark: { nodes },
  } = data;

  return (
    <Layout menuLinks={indexMenuLinks}>
      <SEO title="Music" />
      <StyledFullHeightSection>
        <StyledProjectsH1>Music</StyledProjectsH1>
        <StyledSeparator />
        <CardGrid cards={cards.frontmatter.cards} description={cards.html} title="Our Features" id="features" />
      </StyledFullHeightSection>
    </Layout>
  );
};

export default Music;
