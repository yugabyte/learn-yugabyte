import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import Link from "./link";
import ybLogo from './images/yb-horizontal-alt-logo.png';
import slackLogo from './images/slack-white.svg';
import githubLogo from './images/github-white.svg';
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
              slackUrl
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
      const {
        site: {
          siteMetadata: {
            headerTitle,
            githubUrl,
            slackUrl,
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
                <ul className={'nav navbar-nav navBarUL navbar-right'}>
                  {githubUrl !== '' ?
                    (<li class="github-container">
                      <a className="social-media-btn" href={githubUrl} target="_blank" rel="noopener noreferrer">
                        <span>Star on</span>
                        <img className="github-icon" src={githubLogo} alt={'Github'} />
                      </a>
                    </li>) : null}
                  {slackUrl !== '' ? 
                    (<li>
                      <a className="social-media-btn" href={slackUrl} target="_blank" rel="noopener noreferrer">
                        <span>Join on</span>
                        <img className="slack-icon" src={slackLogo} alt={'Slack'} />
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
