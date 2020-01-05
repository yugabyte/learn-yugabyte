const componentWithMDXScope = require("gatsby-mdx/component-with-mdx-scope");
const { createFilePath } = require('gatsby-source-filesystem');
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

const getSlugParents = (slug) => {
	const slugParentString = slug.substring(1, slug.length-1);
	return slugParentString.split('/');
};

const numberedRegex = /^\d{1,2}-(.*)/i;

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const slug = createFilePath({ node, getNode, basePath: 'content' });
    const slugParentsArr = getSlugParents(slug);
    const parent = getNode(node.parent);

    let strippedSlugArr = slugParentsArr.map(fp => {
      if (fp === '_index') {
        return '';
      } else if (numberedRegex.test(fp)) {
        const name = numberedRegex.exec(fp)[1];
        return name;
      } else {
        return fp;
      }
    });
    
    let topLevelDir = '';
    if (slugParentsArr.length > 1) {      
      strippedSlugArr.splice(0, 1); // Remove first element which is series name      
      if (numberedRegex.test(slugParentsArr[0])) {
        topLevelDir = numberedRegex.exec(slugParentsArr[0])[1].replace(/-/g, ' ');
      }
    }

    createNodeField({
      name: 'relativePath',
      node,
      value: slug,
    });

    createNodeField({
      name: 'topLevelDir',
      node,
      value: topLevelDir,
    });

    createNodeField({
      name: 'slug',
      node,
      value: `/${strippedSlugArr.join('/')}`
    });

    createNodeField({
      name: 'id',
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
