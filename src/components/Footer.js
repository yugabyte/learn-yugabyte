import React from 'react';
import styled from "react-emotion";
import YBLogo from './images/ybsymbol-white.svg';
import GithubLogo from './images/github-white.svg';
import TwitterLogo from './images/twitter.svg';
import LinkedInLogo from './images/linkedin.svg';

const FooterContainer = styled('footer')`
  text-align: left;
  width: 100%;
  font-size: 13px;
  line-height: 1.3;
  color: #F7F8F9;
  background: #202951;
  font-size: 14px;
  color: #fff;
`

const Content = styled('div')`
  padding: 30px 0;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
  @media (min-width: 576px) {
    max-width: 540px;
  }
  @media (min-width: 768px) {
    max-width: 720px;
  }
  @media (min-width: 992px) {
    max-width: 960px;
  }
  @media (min-width: 1200px) {
    max-width: 1140px;
  }
`

const List = styled('ul')`
  margin: 0;
  padding: 0;
  list-style: none;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
`;

const Copyright = styled('div')`
  display: inline-block;
  color: #fff;
  font-weight: 300;
  line-height: 18px;
  font-size: 13px;
`;

const FooterItem = styled('li')`
  padding: 10px 0;
`;

const AnchorTag = styled('a')`
  text-decoration: none;
  color: #fff;
  font-weight: 300;

  &:hover {
    text-decoration: none;
    color: #fff
  }
`;

const FooterTitle = styled('div')`
  text-transform: uppercase;
  padding-bottom: 8px;
  margin-bottom: 15px;
  border-bottom: 1px solid #f95000;
  color: #fff;
`;

const SocialMediaLink = styled('a')`
display: inline-block;
padding-right: 15px;
`;

const Footer = () => (
<FooterContainer>
  <Content>
    <List>
      <FooterItem>
          <div style={{paddingTop: '10px'}}>
            <img width="50px" height="30px" alt="YugabyteDB logo" src={YBLogo} />
            <Copyright>
              <div style={{marginBottom: '3px'}}>© 2019 Yugabyte, Inc.</div>
              <AnchorTag href="https://www.yugabyte.com/privacy-policy/">Privacy Policy</AnchorTag>
            </Copyright>
          </div>
      </FooterItem>
      <FooterItem>
        <AnchorTag href="https://www.yugabyte.com/about">ABOUT</AnchorTag>
      </FooterItem>
      <FooterItem>
        <AnchorTag href="https://www.yugabyte.com/yugabytedb">OPEN SOURCE</AnchorTag>
      </FooterItem>
      <FooterItem>
        <AnchorTag href="https://github.com/Yugabyte/yugabyte-db">GITHUB</AnchorTag>
      </FooterItem>
      <FooterItem>
        <FooterTitle>Address</FooterTitle>
        <AnchorTag href="https://goo.gl/maps/SJ7TCYKbA6jezdfM6" target="_blank" rel="noopener" id="office-map">
          771 Vaqueros Ave<br />
          Sunnyvale, CA 94085<br />
          United States
        </AnchorTag>
      </FooterItem>
      <FooterItem>
        <FooterTitle>Follow Us</FooterTitle>
        <div>
          <SocialMediaLink target="_blank" rel="noopener" href="https://github.com/yugabyte/yugabyte-db" id="github"><img width="30" src={GithubLogo} alt="Github link" /></SocialMediaLink>
          <SocialMediaLink target="_blank" rel="noopener" href="https://www.twitter.com/yugabyte" id="twitter"><img width="30" src={TwitterLogo} alt="Twitter link" /></SocialMediaLink>
          <SocialMediaLink target="_blank" rel="noopener" href="https://www.linkedin.com/company/yugabyte" id="linkedin"><img width="30" src={LinkedInLogo} alt="LinkedIn link" /></SocialMediaLink>
        </div>
      </FooterItem>
    </List>
  </Content>
</FooterContainer>
);

export default Footer;
/**
 * <footer class="footer">
      <div class="container-fluid">
            <ul class="footer-nav">
              <li class="footer-items" >
                <div class="logo-white">
                  <img width="50px" height="30px" alt="YugabyteDB logo" src="../assets/ybsymbol-white.svg" />
                  <div class="copyright">
                    <div style="margin-bottom: 3px">© 2019 Yugabyte, Inc.</div>
                    <a href="https://www.yugabyte.com/privacy-policy/">Privacy Policy</a>
                  </div>
                </div>
              </li>
              <li class="footer-items" data-footer="community-links">
                <a target="_blank" class="footer-link" href="https://www.yugabyte.com/about" rel="noopener">About</a>
              </li>
              <li class="footer-items" data-footer="community-links">
                <a target="_blank" class="footer-link" href="https://www.yugabyte.com/yugabytedb" rel="noopener">Open Source</a>
              </li>
              <li class="footer-items" data-footer="community-links">
                <a target="_blank" class="footer-link" href="https://github.com/Yugabyte/yugabyte-db" rel="noopener">GitHub</a>
              </li>
              <li class="footer-items" data-footer="address">
                <div class="footer-title">Address</div>
                <a href="https://goo.gl/maps/SJ7TCYKbA6jezdfM6" target="_blank" rel="noopener" id="office-map">
                  771 Vaqueros Ave<br class="hidden-xs hidden-sm">
                  Sunnyvale, CA 94085 <br class="hidden-xs hidden-sm">
                  United States
                </a>
              </li>
              <li class="footer-items" >
                <div class="footer-title">Follow Us</div>
                <div class="footer-social">
                  <a target="_blank" rel="noopener" href="https://github.com/yugabyte/yugabyte-db" id="github"><img src="../assets/github-small.svg" alt="Github link"></a>
                  <a target="_blank" rel="noopener" href="https://www.twitter.com/yugabyte" id="twitter"><img src="../assets/twitter-small.svg" alt="Twitter link"></a>
                  <a target="_blank" rel="noopener" href="https://www.linkedin.com/company/yugabyte" id="linkedin"><img src="../assets/linkedin-small.svg" alt="LinkedIn link"></a>
                </div>
              </li>
            </ul>
          </div>
        </footer>
 */