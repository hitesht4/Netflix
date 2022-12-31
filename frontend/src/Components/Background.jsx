import React from "react";
import styled from "styled-components";
import background from "../Assets/login.jpg";
const Container = styled.div`
  height: 100vh;
  width: 100vw;
`;
const Img = styled.img`
  height: 100%;
  width: 100%;
`;
const Background = () => {
  return (
    <Container>
      <Img src={background} alt="Background" />
    </Container>
  );
};

export default Background;
