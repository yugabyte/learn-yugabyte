const componentWithMDXScope = require("gatsby-mdx/component-with-mdx-scope");
const path = require("path");
const startCase = require("lodash.startcase");

exports.createPages = ({ graphql, page, actions }) => {
  const { createPage } = actions;
  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allMdx {
              edges {
                node {
                  fields {
                    id
                    slug
                  }
                  tableOfContents
                  code {
                    scope
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors); // eslint-disable-line no-console
          reject(result.errors);
        }

        // Create blog posts pages.
        result.data.allMdx.edges.forEach(({ node }) => {
          // Skip pages that start with underline
          const nodeSlug = node.fields.slug;
          const pos = nodeSlug.lastIndexOf('/');
          if (nodeSlug && nodeSlug.charAt(pos + 1) === '_') {
            return null;
          }
          
          if (nodeSlug && nodeSlug !== '/') {
              createPage({
                path: nodeSlug,
                component: path.resolve('./src/templates/docs.js'),
                context: {
                  id: node.fields.id
                }
              });
          } else {
            createPage({
              path: '/',
              component: path.resolve('./src/templates/home.js'),
              context: {
                id: node.fields.id
              }
            });
          }
        });
      })
    );
  });
};

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "src"), "node_modules"],
      alias: { $components: path.resolve(__dirname, "src/components") }
    }
  });
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /xterm/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
};

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPlugin({
    name: "@babel/plugin-proposal-export-default-from"
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent);
    let value = parent.relativePath.replace(parent.ext, "");

    if (value === "index") {
      value = "";
    }

    createNodeField({
      name: `slug`,
      node,
      value: `/${value}`
    });

    createNodeField({
      name: "id",
      node,
      value: node.id
    });

    createNodeField({
      name: "title",
      node,
      value: node.frontmatter.title || startCase(parent.name)
    });
  }
};
