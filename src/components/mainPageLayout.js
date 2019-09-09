import React from "react";
import styled from "react-emotion";
import ThemeProvider from "./themeProvider";
import Footer from './Footer';
import Card from './Card';

const MainPanel = styled('div')`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 100%;
  position: relative;
  min-height: 0;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  background: #eceff1;
`;

const HeaderContainer = styled('header')`
  background-color: #fff;
  box-shadow: 0 3px 6px -3px #bdbdbd;
  padding: 40px 0 48px;
  width: 100%;
`;

const WelcomeSection = styled('div')`
  margin: 0 auto;
  max-width: 1024px;
  width: 90vw;
`;

const Content = styled('div')`
  margin: 60px auto;
  max-width: 1024px;
  width: 90vw;
`;

const LessonTable = styled('div')`
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Layout = ({ children, location, courseData }) => (
  <ThemeProvider location={location}>
    <MainPanel>
      <HeaderContainer>
        <WelcomeSection>
          <h1>Welcome to YugaByte DB Tutorials!</h1>
          <p>Learn YugaByte DB and more through these guided lessons.</p>  
        </WelcomeSection>
      </HeaderContainer>
      <Content>
        <LessonTable>
          {courseData.map((val, idx) => (
            <Card key={`${idx}-${val.title}`} title={val.title} description={val.description} time={val.duration} url={!val.disabled && (val.url || '/ysql/Home')} />
          ))}
        </LessonTable>
      </Content>
      <Footer></Footer>
    </MainPanel>
  </ThemeProvider>
);

export default Layout;
