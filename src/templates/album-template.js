import styled from '@emotion/styled';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import React from 'react';
import Layout from '../components/layout';
import TagList from '../components/tag-list';
import { indexMenuLinks } from '../components/_config/menu-links';
import { StyledH1 } from '../components/_shared/styled-headings';
import { StyledSection } from '../components/_shared/styled-section';

const StyledBlogSection = styled(StyledSection)`
  min-height: calc(100vh - var(--header-height));

  & > .gatsby-image-wrapper {
    width: 100%;
  }
`;
const StyledBlogTitle = styled(StyledH1)`
  margin-top: 3rem;
`;
const StyledDate = styled.div`
  font-size: 0.8rem;

  & span {
    font-weight: 500;
  }
`;
const StyledBlogText = styled.div`
  padding: 2rem;
  width: 100%;
  background: var(--bg-code);
  border-radius: var(--radius);
  border-top-left-radius: 0;
  border-top-right-radius: 0;
`;

const Album = ({ data }) => {
  const post = data.markdownRemark;
  const coverImage = post.frontmatter.cover_image ? post.frontmatter.cover_image.childImageSharp.fluid : null;
  const { artists = [], title, date } = post.frontmatter;

  return (
    <Layout menuLinks={indexMenuLinks}>
      <StyledBlogSection>
        <StyledBlogTitle>{title}</StyledBlogTitle>
        <StyledDate>Released on {date}.</StyledDate>
        <TagList artists={artists} />
        {coverImage && <Img fluid={coverImage} />}
        <StyledBlogText dangerouslySetInnerHTML={{ __html: post.html }} />
      </StyledBlogSection>
    </Layout>
  );
};

Album.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Album;

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        artists
        date(formatString: "D. MMMM YYYY")
        cover_image {
          childImageSharp {
            fluid(maxWidth: 800) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
