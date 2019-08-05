import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import GitHubButton from 'react-github-btn'
import Link from "./link";
import ybLogo from './images/yb-horizontal-alt-logo.png';
import './styles.css';

import Sidebar from "./sidebar";

const Header = ({location}) => (
  <StaticQuery
    query={
      graphql`
        query headerTitleQuery {
          site {
            siteMetadata {
              headerTitle
              githubUrl
              helpUrl
              tweetText
              logo {
                link
              }
              headerLinks {
                link
                text
              }
            }
          }
        }
        `}
    render={(data) => {
      const twitter = require('./images/twitter.svg');
      const {
        site: {
          siteMetadata: {
            headerTitle,
            githubUrl,
            helpUrl,
            tweetText,
            logo,
            headerLinks,
          }
        }
      } = data;
      const finalLogoLink = logo.link !== '' ? logo.link : '/';
      return (
        <div className={'navBarWrapper'}>
          <nav className={'navbar navbar-default navBarDefault'}>
            <div className={'navbar-header'}>
              <button type="button" className={'navbar-toggle collapsed navBarToggle'} data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                <span className={'sr-only'}>Toggle navigation</span>
                <span className={'icon-bar'}></span>
                <span className={'icon-bar'}></span>
                <span className={'icon-bar'}></span>
              </button>
              <Link to={finalLogoLink} className={'navbar-brand navBarBrand'}>
                <img className={'img-responsive'} src={ybLogo} alt={'logo'} />
                <div className={"headerTitle"} dangerouslySetInnerHTML={{__html: headerTitle}} />
              </Link>
            </div>
            <div id="navbar" className={'navbar-collapse collapse navBarCollapse'}>
              <div className={'visible-xs'}>
                <Sidebar location={location} />
                <hr/>
              </div>
                <ul className={'nav navbar-nav navBarUL'}>
                  {githubUrl !== '' ?
                    (<li className={'githubBtn'}>
                      <GitHubButton href={githubUrl} data-show-count="true" aria-label="Star on GitHub">Star</GitHubButton>
                    </li>) : null}
                  {helpUrl !== '' ? 
                    (<li><a href={helpUrl}>Need Help?</a></li>) : null
                  }
                </ul>
              }
              <ul className={'nav navbar-nav navBarUL navbar-right'}>
                {tweetText !== '' ? 
                  (<li>
                    <a href={'https://twitter.com/intent/tweet?&text=' + tweetText} target="_blank" rel="noopener noreferrer">
                      <img className={'twitterIcon'} src={twitter} alt={'Twitter'} />
                    </a>
                   </li>) : null
                }
                {headerLinks.map((link, key) => {
                  if(link.link !== '' && link.text !== '') {
                    return(
                      <li key={key}>
                        <a href={link.link} target="_blank" rel="noopener noreferrer">{link.text}</a>
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            </div>
          </nav>
        </div>
      );
    }}
  />
);

export default Header;
