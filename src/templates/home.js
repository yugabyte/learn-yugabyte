import React, { Component } from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import { injectGlobal } from "react-emotion";
import '../components/styles.css';
import config from '../../config';
import LandingPage from '../components/mainPageLayout';

injectGlobal`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    font-family: -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",
      "Roboto",
      "Roboto Light",
      "Oxygen",
      "Ubuntu",
      "Cantarell",
      "Fira Sans",
      "Droid Sans",
      "Helvetica Neue",
      sans-serif,
      "Apple Color Emoji",
      "Segoe UI Emoji",
      "Segoe UI Symbol";

    font-size: 16px;
  }

  a {
    transition: color 0.15s;
    color: #663399;
  }
`;

export default class MDXRuntimeTest extends Component {
  render() {
    const { data } = this.props;
    const {
      site: {
        siteMetadata: { title, description }
      },
      allMdx: { edges }
    } = data;

    let canonicalUrl = config.gatsby.siteUrl;
    const courseList = [];
    edges.sort((a, b) => {
      const str1 = a.node.fields.relativePath
      const str2 = b.node.fields.relativePath;
      return str1.localeCompare(str2);
    }).forEach(e => {
      const { 
        fields: { topLevelDir, slug },
        frontmatter: { title: mdxTitle, description }
      } = e.node;
      const slugStripLeadingSlash = slug.substring(1, slug.length-1);
      const slugArr = slugStripLeadingSlash.split('/');
      if (slugArr.length === 1) {
        const data = {
          description,
          title: mdxTitle,
          category: topLevelDir,
          url: slug,
        }
        courseList.push(data);
      }
    });
    
    return (
      <div className="home-layout">
        <Helmet>
          {title ? <title>{'Home | ' + title}</title> : null }
          {title ? <meta name="title" content={title} /> : null}
          {description ? <meta name="description" content={description} /> : null}
          {title ? <meta property="og:title" content={title} /> : null}
          {description ? <meta property="og:description" content={description} /> : null}
          {title ? <meta property="twitter:title" content={title} /> : null}
          {description ? <meta property="twitter:description" content={description} /> : null}
          <link rel="canonical" href={canonicalUrl} />
        </Helmet>
        <LandingPage courseData={courseList}></LandingPage>
      </div>
    );
  }
}

export const pageQuery = graphql`
  {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMdx {
      edges {
        node {
          fields {
            slug
            relativePath
            topLevelDir
          }
          frontmatter {
            title
            description
          }
        }
      }
    }
  }
`;
