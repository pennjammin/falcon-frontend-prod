import React, { Component } from "react";
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const HeroStyled = styled.section`
  padding: 10em;
  background: papayawhip;
`;

class Hero extends Component {
    
        render () {
           return ( 
           <HeroStyled>
              <Title>
                Hello World, this is my first styled component!
              </Title>
            </HeroStyled>
            )
        }
    }

export default Hero;