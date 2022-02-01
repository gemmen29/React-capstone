import React from 'react';
// import PropTypes from 'prop-types';
import { BsFillMicFill } from 'react-icons/bs';
import { IoIosSettings } from 'react-icons/io';

const Header = () => (
  <header className="bg-sky-800 text-white">
    <nav className="flex justify-between items-center py-2 px-5">
      <div>2022</div>
      <div>All Cases</div>
      <div className="flex gap-3">
        <BsFillMicFill />
        <IoIosSettings />
      </div>
    </nav>
  </header>
);

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
