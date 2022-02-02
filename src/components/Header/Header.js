import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BsFillMicFill } from 'react-icons/bs';
import { IoIosSettings } from 'react-icons/io';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import { resetRegions } from '../../redux/covid/covid';

const Header = () => {
  const show = useSelector((state) => state.data.show);
  const dispatch = useDispatch();

  const backButtonHandler = () => {
    dispatch(resetRegions());
  };

  return (
    <header className="bg-sky-800 text-white">
      <nav className="flex justify-between items-center py-2 px-5">
        {show && (
          <div className="flex gap-2">
            <NavLink to="/">
              <MdKeyboardArrowLeft
                className="text-2xl"
                onClick={backButtonHandler}
              />
            </NavLink>
            <span>2022</span>
          </div>
        )}
        <div>All Cases</div>
        <div className="flex gap-3">
          <BsFillMicFill />
          <IoIosSettings />
        </div>
      </nav>
    </header>
  );
};

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
