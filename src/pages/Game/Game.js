import React, { Component } from "react";
import { Row, Col, Button } from "antd";
import { TweenLite } from 'gsap';
import { Tile } from "../../components";
import "antd/dist/antd.css";
import "./Game.scss";
import { calculatePoints, success, error } from "../../helpers";

const SLIDER_SPEED = 1;
const SLIDER_MAX_DISTANCE = 134

class Game extends Component {

  state = {
    slider: 0,
    started: false,
    currentTile: 0,
    startTime: null,
    endTime: null,
    totalPoints: 0,
  }

  constructor (props) {
    super(props);
    this.player = null;
    this.playerTween = null;
    this.playerTween = TweenLite.to(this.player, 0.5, {x: '+=100' });
    this.playerTween.pause();
  }

  startGame = () => {
    this.setState({ startTime: new Date().getTime() / 1000 });
    let direction = 1;
      setInterval(() => {
        if (this.state.slider === SLIDER_MAX_DISTANCE) {
          direction = -1;
        }
        else if (this.state.slider === 0) {
          direction = 1;
        }
        this.setState({ slider: this.state.slider + (direction * SLIDER_SPEED) });
      }, 10);
  }

  onButtonPress = () => {
    if (!this.state.started) {
      this.setState({ started: true });
      this.startGame();
      return;
    }

    const { currentTile, slider } = this.state;

    if (slider <= 77 && slider >= 57) {
      if (!this.playerTween.isActive()) {
        if (this.state.currentTile < 2) {
          this.playerTween = TweenLite.to(this.player, 0.5, {x: '+=100' });
        } else if (currentTile === 2) {
          this.playerTween = TweenLite.to(this.player, 0.5, {y: '+=100' });
        } else if (currentTile > 2 && currentTile < 5) {
          this.playerTween = TweenLite.to(this.player, 0.5, {x: '-=100' });
        } else if (currentTile === 5) {
          this.playerTween = TweenLite.to(this.player, 0.5, {y: '+=100' });
        } else if (currentTile > 5 && currentTile < 7) {
          this.playerTween = TweenLite.to(this.player, 0.5, {x: '+=100' });
        } 
        else if (currentTile === 7) {
          this.playerTween = TweenLite.to(this.player, 0.5, {x: '+=100' }).then(() => {
            this.playerTween = TweenLite.to(this.player, 0.5, {x: '-=200', y: '-=200' });
          });
          this.finishRound();
        }
      }
      this.setState({ currentTile: currentTile !== 8 ? currentTile + 1 : 0 });
    } else {
      error();
      this.playerTween = TweenLite.to(this.player, 0.5, {x: 0, y: 0 });
      this.setState({ currentTile: 0 });
    }
  }

  finishRound = () => {
    this.setState({ end: new Date().getTime() / 1000 });
    const roundPoints = calculatePoints(Math.floor(this.state.endTime - this.state.startTime));
    this.setState({ totalPoints: this.state.totalPoints + roundPoints });
    success(roundPoints);
  }
  
  render () {
    const { slider, started, totalPoints } = this.state;
    return (
      <div className="game-page-container">
        <div>
          <p>{`Score ${totalPoints}`}</p>
          <div className="game-board">
            <div className="player" ref={div => this.player = div} />
            <Row>
              <Col span={8}>
                <Tile id={0}>0</Tile>
              </Col>
              <Col span={8}>
                <Tile id={1}>1</Tile>
              </Col>
              <Col span={8}>
                <Tile id={2}>2</Tile>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Tile id={5}>5</Tile>
              </Col>
              <Col span={8}>
                <Tile id={4}>4</Tile>
              </Col>
              <Col span={8}>
                <Tile id={3}>3</Tile>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <Tile id={6}>6</Tile>
              </Col>
              <Col span={8}>
                <Tile id={7}>7</Tile>
              </Col>
              <Col span={8}>
                <Tile id={8}>8</Tile>
              </Col>
            </Row>
          </div>
          <div className="controls-block">
            <div className="slider">
              <div className="marker"/>
              <div style={{ left: slider }} className="knob" />
            </div>
            <Button style={{ width: 300 }} type="primary" size="large" onClick={this.onButtonPress}>
              {started ? 'Go' : 'Start Game'}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
