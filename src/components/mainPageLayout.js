import React, { useState } from "react";
import Select from 'react-select';
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
  margin: 0 auto 60px;
  max-width: 1024px;
  width: 90vw;
`;

const LessonTable = styled('div')`
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const AlphabeticalBtn = styled('div')`
  color: #383838;
  opacity: 0.8;
  margin: auto 7px;
  padding: 10px 5px;
  overflow: hidden;
  cursor: pointer;
  flex: 0 0 auto;
  font-weight: 600;
`;

const SectionHeader = styled('h2')`
  font-size: 26px;
  margin: 15px 0;
  line-height: 32px;
`;

const SortContainer = styled('div')`
  justify-content: center;
  display: inline-flex;
`;

const lessonOrder = [
  { value: 'basic', label: 'YSQL Basics'},
  { value: 'advanced', label: 'YSQL Advanced Topics'},
  { value: 'distributedsql', label: 'Distributed SQL Concepts'},
  { value: 'buildingorm', label: 'Building Apps with ORM\'s'}
];

const Layout = ({ children, location, courseData }) => {
  const [selectedOption, setOption] = useState('');
  const [sortingType, setSortingFn] = useState('series');

  const shownCourses = selectedOption.value ? courseData.filter(c => c.category === selectedOption.label) : [...courseData];
  let displayedCourses = null;
  if (sortingType === 'alphabetical') {
    displayedCourses = (<div>
      <LessonTable>
        {shownCourses.sort((a, b) => {
          if (a.title > b.title) {
            return 1;
          } else if (a.title < b.title) {
            return -1;
          } else {
            return 0;
          }
        }).map((val, index) => (
          <Card key={`${index}-${val.title}`} title={val.title} description={val.description} time={val.duration} url={!val.disabled && (val.url || '/prerequisites')} />
        ))}
      </LessonTable>   
    </div>);
  } else {
    const seriesList = shownCourses.map(x => x.category).reduce((acc, cur) => {
      if (acc.includes(cur)) {
        return acc;
      }
      return [...acc, cur];
    });
    displayedCourses = seriesList.map(seriesName => {
      const sectionCourses = shownCourses.filter(c => c.category === seriesName);
      if (sectionCourses.length || selectedOption.value) {
        return (
          <div key={`section-${seriesName}`}>
            <SectionHeader>{seriesName}</SectionHeader>
            <LessonTable>
              {sectionCourses.map((val, idx) => (
                <Card key={`${idx}-${val.title}`} title={val.title} description={val.description} time={val.duration} url={!val.disabled && (val.url || '/')} />
              ))}
            </LessonTable>   
          </div>
        );
      }
      return null;
    });
  }

  return (
  <ThemeProvider location={location}>
    <MainPanel>
      <HeaderContainer>
        <WelcomeSection>
          <h1>Welcome to Learn YugabyteDB!</h1>
          <p className="welcome-description">Learn YugabyteDB provides a guided, tutorial, hands-on coding experience. Most courses will explain a distributed SQL concept and step you through the process of building, or adding a new feature to an existing application. They cover a wide range of topics such as YSQL Basics, Distributed SQL Concepts, and ORM Examples.</p>  
        </WelcomeSection>
      </HeaderContainer>
      <Content>
        <div id="filters">
          <SortContainer>
            <AlphabeticalBtn className={sortingType === 'series' && 'sorting-active'} onClick={() => setSortingFn('series')}>Series</AlphabeticalBtn>
            <AlphabeticalBtn className={sortingType === 'alphabetical' && 'sorting-active'} onClick={() => setSortingFn('alphabetical')}>A-Z</AlphabeticalBtn>
          </SortContainer>
            <Select
              value={selectedOption}
              onChange={e => setOption(e)}
              options={selectedOption ? [{ value: '', label: 'Show all'}, ...lessonOrder]: lessonOrder}
              placeholder={'Filter by category'}
              styles={{
                container: (provided) => ({
                  ...provided,
                  lineHeight: '32px',
                  flex: '1 1 auto',
                  maxWidth: '250px',
                  margin: '0px 28px 0px auto',
                }),
                control: (provided) => ({
                  ...provided,
                  border: 'none',
                  boxShadow: '0 1px 5px rgba(0,0,0,0.2)'
                })
              }}
            />
        </div>
        {displayedCourses}
      </Content>
      <Footer></Footer>
    </MainPanel>
  </ThemeProvider>
);
};

export default Layout;
