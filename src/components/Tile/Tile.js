import React from 'react';
import PropTypes from 'prop-types';
import './Tile.scss';

const Tile = ({ id, children }) => (
  <div id={id} className="Tile">{children}</div>
);

Tile.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  children: PropTypes.oneOfType(PropTypes.node, PropTypes.arrayOf(PropTypes.node))
}

export default Tile;