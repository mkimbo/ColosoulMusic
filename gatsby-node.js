const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require('path');

exports.onCreateNode = ({ node, getNode, actions }) => {
  //called when node created/updated
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
      //adds slug to pages graphql query -> allMarkdownRemark { edges { node { fields { slug }}}}
      node,
      name: `slug`,
      value: slug,
    });
  }
};
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          filter: { fileAbsolutePath: { regex: "/content/albums/" }, frontmatter: { published: { eq: true } } }
          limit: 2000
        ) {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `
  );

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: `albums${node.fields.slug}`,
      component: path.resolve(`./src/templates/album-template.js`),
      context: {
        // Data passed to context is available in page queries as GraphQL vars.
        // (when we query data it will set $slug var auto)
        slug: node.fields.slug,
      },
    });
  });
};
