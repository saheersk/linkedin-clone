import styled from "styled-components";
import React from "react";
import Leftside from "./Leftside";
import Main from "./Main";
import Rightside from "./Rightside";
import { Redirect } from "react-router";
import { connect } from "react-redux";

function Home(props) {
  return (
    <Container>
      {!props.user && <Redirect to="/" />}
      <Section>
        <h5>
          <a>Hiring in a hurry? - </a>
        </h5>
        <h5>
          <span>
            Find talented pros in record time with Upwork and keep business
            moving.
          </span>
        </h5>
      </Section>
      <Layout>
        <Leftside />
        <Main />
        <Rightside />
      </Layout>
    </Container>
  );
}

const Container = styled.div`
  padding-top: 52px;
  max-width: 100%;
  margin-top: 50px;
`;

const Section = styled.section`
  min-height: 50px;
  padding: 16px 0;
  box-sizing: content-box;
  text-align: center;
  text-decoration: underline;
  display: flex;
  justify-content: center;
  h5 {
    color: #0a66c2;
    font-size: 14px;
    a {
      font-weight: 700;
    }
  }
  h5 {
    span {
      color: #434649;

      font-size: 14px;
      font-weight: 600;
    }
  }
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 0 5px;
  }
`;
const Layout = styled.div`
  display: grid;
  grid-template-areas: "leftside main rightside";
  grid-template-columns: minmax(0, 5fr) minmax(0, 12fr) minmax(300px, 7fr);
  column-gap: 25px;
  row-gap: 25px;
  margin: 25px 0;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    padding: 0 5px;
  }
`;
const mapStateToProps = (state) => {
  return {
    user: state.userState.user,
  }
}
export default connect(mapStateToProps)(Home);
