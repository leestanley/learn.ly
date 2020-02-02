import React from 'react';

import Button from '../Button';

import floating from '../../assets/floatingperson.svg';
import { NavLink } from 'react-router-dom';

import './style.less';

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="content">
        <h1> LEARN.LY </h1>
        <div className="subcontent">
          <h2> An education platform for learning globally  </h2>
          <p> A real-time translator, applicative knowledge tester, and education equity insturment whether you are an educator or learner </p>
        </div>
        <NavLink activeClassName="selected" to="/ibegin">
          <Button color='#B6CBFE' size='25px' width='250px'>
            Educators
          </Button>
        </NavLink>

        <NavLink activeClassName="selected" to="/lbegin">
          <Button color='#B6CBFE' size='25px' width='250px'>
            Learners
          </Button>
        </NavLink>
        <div className="floatingPerson">
          <img src={floating} alt="floating"/>
        </div>
      </div>
      <div className="footer">
        Made with ☕ at HackSC 20
      </div>
    </div>
  );
};

export default HomePage;
