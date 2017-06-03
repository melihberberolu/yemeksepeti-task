import React, {
  PropTypes,
} from 'react';
require("./Header.styles.scss");

const Header = (props) => {
  return (
    <header id="header">
      <p className="title">{`YemekSepeti Task Melih Berberoğlu`}</p>
    </header>
  );
};

export default Header;
