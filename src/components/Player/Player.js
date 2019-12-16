import React from 'react';
import './Player.scss';

const Player = ({ reference }) => (
  <div ref={reference} className="player" />
);

export default Player;