import React from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const MainHome = () => {
  const navigate = useNavigate();

  const handleExplore = () => {
    navigate("/choice");
  };

  return (
    <MainStyled>
      <div className="hero">
        <h1>
          Welcome to <span className="app-name">ExpensoMeter</span>
        </h1>
        <p>A safe place to keep your expense records.</p>
        <h4 className="title">
          Let's dive into the following wonderful features:
        </h4>
        <div className="features">
          <ul>
            <li>Categorize your expenses.</li>
            <li>Differentiate by dates.</li>
            <li>Perform mathematical operations on expenses.</li>
          </ul>
        </div>
        <button className="cta-btn" onClick={handleExplore}>
          Explore Here
        </button>
      </div>
    </MainStyled>
  );
};

const MainStyled = styled.div`
top: 12%;
  
    margin: auto;
    height: 76vh;
    width: 53%;
    display: flex
;
    align-items: center;
    justify-content: center;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    position: relative;
    font-weight: bold;
}


  .hero {

    height: 60vh;
    width: 791px;
    padding: 4.5rem;
    background: rgba(255, 255, 255, 0.3);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    box-shadow: 0px 1px 17px rgba(0, 0, 0, 0.06);
    text-align: center;
    color: rgba(34, 34, 96, 1);
}

    h1 {
      font-size: 50px;
      .app-name {
        color: #57007b;
      }
    }

    p {
      font-size: 20px;
      margin-top: 2rem;
      color: rgba(34, 34, 96, 0.7);
    }

    .title {
      margin-top: 2rem;
      font-size: 1.2rem;
    }

    .features {
      margin-top: 20px;
      text-align: left;

      ul {
        margin-top: 1.5rem;
        line-height: 2.2;
        li {
          font-size: 1.1rem;
          color: rgba(34, 34, 96, 0.8);
          list-style: disc;
        }
      }
    }

    .cta-btn {
      background: #57007b;
      color: white;
      padding: 12px 25px;
      font-size: 18px;
      border: none;
      border-radius: 8px;
      margin-top: 24px;
      cursor: pointer;
      transition: background 0.3s ease;

      &:hover {
        background: #3d005b;
      }
    }
  }
`;

export default MainHome;
