import React from 'react';
import styled from "react-emotion";

const Container = styled('div')`
    box-shadow: 0 1px 5px rgba(0,0,0,0.2), 0 2px 2px rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12);
    border-radius: 4px;
    vertical-align: top;
    background: #fff;
    flex: 1 0 28%;
    flex-direction: column;
    margin: 0 18px 18px 0;
    max-width: 320px;
    width: 28%;
    position: relative;
`;

const Title = styled('div')`
  color: #212121;
  flex: 1 0 auto;
  padding: 16px 16px 10px 16px;
  font-size: 1.25rem;
  font-weight: 500;
  line-height: 2rem;
  letter-spacing: 0.0125em;
`;

const Description = styled('div')`
  font-size: 14px;
  margin: 10px 15px 50px;
  padding-bottom: 15px;
  color: rgb(130, 130, 130);
`;

const StartButton = styled('a')`
  color: #027be3;
  border: 1px solid #027be3;
  padding: 8px 18px;
  position: absolute;
  right: 18px;
  bottom: 10px;
  border-radius: 3px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: #027be3;
    color: white;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    text-decoration: none;
  }
`;

// Returns a styled Material design card that can be stacked up to 3 per row
const Card = ({title, description, url }) => {
    return (
      <Container>
        {title && <Title>{title}</Title>}
        {description && <div className="separation-line"></div>}
        {description && <Description>{description}</Description>}
        {url && <StartButton href={url + '?collapsed=true'}>
          Start
          </StartButton>
        }
      </Container>
    )
};

export default Card;