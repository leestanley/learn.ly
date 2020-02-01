import React from 'react';

import Button from '../Button';

import floating from '../../assets/floatingperson.svg';
import { NavLink } from 'react-router-dom';

import './style.less';

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="content">
        <h1> TEMP APP NAME </h1>
        <div className="subcontent">
          <h2> The newest platform for education </h2>
          <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since  </p>
        </div>
        <NavLink activeClassName="selected" to="/ibegin">
          <Button color='#B6CBFE' size='25px' width='250px'>
            Educators
          </Button>
        </NavLink>

        <Button color='#B6CBFE' size='25px' width='250px'>
          Learners
        </Button>
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
