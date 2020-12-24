import React from 'react';
import Layout from '../../layouts';
import { Row, Col, Button, Input } from 'antd';
import styles from './index.less';
import axios from 'axios';
import { TwitterShareButton } from 'react-twitter-embed';

let questionMatrix = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0],
  [0, 1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const answerMatrix = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 'A', 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 'C', 0, 0, 0, 0, 'W', 0, 'K', 0, 0, 0],
  [0, 'S', 'A', 'T', 'O', 'S', 'H', 'I', 'N', 'A', 'K', 'A', 'M', 'O', 'T', 'O', 0],
  [0, 0, 0, 'E', 0, 0, 'U', 0, 'O', 0, 0, 'L', 0, 'N', 0, 0, 0],
  [0, 'D', 'U', 'C', 0, 0, 'N', 0, 'O', 0, 0, 'L', 0, 0, 0, 0, 0],
  [0, 0, 0, 'H', 0, 0, 'G', 0, 'B', 0, 0, 'E', 0, 0, 0, 0, 0],
  [0, 0, 0, 'N', 0, 0, 0, 0, 'N', 0, 0, 'T', 'H', 'A', 'O', 0, 0],
  [0, 0, 0, 'I', 0, 0, 0, 0, 'O', 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 'C', 0, 0, 0, 0, 'O', 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 'V', 'A', 'U', 'L', 'T', 0, 'B', 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 'L', 0, 'M', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 'E', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

const questionList = [
  'What kind of questions can be asked in https://t.me/oraitech',
  'You put your cryptocurrency in a ',
  'CEO of Oraichain',
  'Famous singer that is building the first "crypto-city"',
  'Creator of Bitcoin',
  'First liquidity provider program for Orai',
  'CPO of Oraichain',
  'Community leader/MOD that is known for killing FUD',
  'Best place to hold Orai',
  'CTO of Oraichain',
];

const questionIndex = [
  [2, 3].toString(),
  [1, 11].toString(),
  [1, 6].toString(),
  [0, 13].toString(),
  [2, 1].toString(),
  [9, 2].toString(),
  [4, 1].toString(),
  [2, 8].toString(),
  [9, 2].toString(),
  [6, 11].toString(),
];

class Game extends React.Component {
  constructor(props) {
    super(props);
    const input = new Array(17);
    for (let i = 0; i < 17; i++) {
      input[i] = new Array(17);
    }
    for (let i = 0; i < 17; i++) {
      for (let j = 0; j < 17; j++) {
        input[i][j] = '';
      }
    }
    this.state = {
      input,
      result: null,
    };
  }

  async componentDidMount() {
    var config = {
      method: 'get',
      url: 'http://128.199.241.140:8085/v1/gen_crossword',
    };

    const { data } = axios(config);
    console.log(data);
  }

  getResult = () => {
    const { input } = this.state;
    let result = true;
    loop1: for (let i = 0; i < answerMatrix.length; i++) {
      for (let j = 0; j < answerMatrix[i].length; j++) {
        if (answerMatrix[i][j] === 0) continue;
        if (answerMatrix[i][j] !== input[i][j]) {
          result = false;
          break loop1;
        }
      }
    }
    const arr = new Array(17);
    for (let i = 0; i < 17; i++) {
      arr[i] = new Array(17);
    }
    for (let i = 0; i < 17; i++) {
      for (let j = 0; j < 17; j++) {
        arr[i][j] = '';
      }
    }
    this.setState({
      result,
      input: arr,
    });
  };

  renderMatrix = (matrix) => {
    var questionMatrix = matrix.map(function (arr) {
      return arr.slice();
    });
    const { input } = this.state;
    for (let i = 0; i < questionMatrix.length; i++) {
      for (let j = 0; j < questionMatrix[i].length; j++) {
        if (questionMatrix[i][j]) {
          questionMatrix[i][j] = (
            <div
              key={[i, j].toString()}
              style={{
                width: 34,
                height: 34,
                border: '1px solid #E7E7E7',
                boxSizing: 'border-box',
                position: 'relative',
              }}
            >
              <Input
                style={{
                  fontSize: 12,
                  textTransform: 'capitalize',
                  width: '100%',
                  height: '100%',
                  fontFamily: 'Roboto',
                  fontStyle: 'normal',
                  fontWeight: 'normal',
                  fontSize: '14px',
                  lineHeight: '150%',
                  color: '#181818',
                  padding: 0,
                  textAlign: 'center',
                }}
                defaultValue={''}
                maxLength={1}
                onChange={(e) => {
                  const newInput = [...input];
                  newInput[i][j] = e.target.value.toUpperCase();
                  this.setState({
                    input,
                  });
                }}
              />
              {questionIndex.includes([i, j].toString()) && (
                <div
                  style={{
                    position: 'absolute',
                    top: -3,
                    left: 3,
                    zIndex: 15,
                    fontSize: 12,
                  }}
                >
                  {questionIndex.indexOf([i, j].toString()) + 1}
                </div>
              )}
            </div>
          );
        } else {
          questionMatrix[i][j] = (
            <div
              key={[i, j].toString()}
              style={{
                width: 34,
                height: 34,
                border: '1px solid #E7E7E7',
                boxSizing: 'border-box',
                visibility: 'hidden',
              }}
            ></div>
          );
        }
      }
    }
    return questionMatrix;
  };

  render() {
    const { result } = this.state;
    const children = (
      <div className={styles.game}>
        <div className={styles.container}>
          {result === null && (
            <>
              <Row className={styles.header}>
                <Col span={12} className={styles.img}>
                  <img src={require('../../assets/Happy-Christmas.png')} width={260} height={48} />
                </Col>
              </Row>
              <Row className={styles.content}>
                <Col
                  span={12}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRight: '1px solid #E7E7E7',
                  }}
                >
                  <div className={styles.title}>
                    Let’s play a crossword game with us <br />
                    You may have a gift if you finish it!
                  </div>
                  <div className={styles.matrix}>{this.renderMatrix(questionMatrix)}</div>
                </Col>
                <Col span={12} className={styles.questions}>
                  <div className={styles.across}>Questions</div>
                  {questionList.map((item, idx) => (
                    <div className={styles.question}>
                      {idx + 1}. {item}
                    </div>
                  ))}
                  <div className={styles.sure}>Are you sure this is your final answer? </div>
                  <Button
                    className={styles.submit}
                    onClick={() => {
                      this.getResult();
                    }}
                  >
                    Submit Answer
                  </Button>
                </Col>
              </Row>
            </>
          )}
          {result && (
            <>
              <div className={styles.image}>
                <img
                  src={require('../../assets/santa.png')}
                  width={223}
                  height={250}
                  style={{ marginRight: 70 }}
                />
                <img src={require('../../assets/qr.png')} width={161} height={160} />
              </div>
              <div className={styles.success}>Yeah! You just completed our misson!</div>
              <div className={styles.description}>
                You done it very quick, well done!
                <br />
                Use the QR code above or click below button to share to your friends
              </div>
              <div className={styles.buttonGroup}>
                <Button className={styles.button1} onClick={() => this.setState({ result: null })}>
                  Play Again
                </Button>
                <TwitterShareButton
                  url="http://market.orai.io/game"
                  options={{
                    text: '#reactjs is awesome',
                    via: 'oraichain',
                    size: 'large',
                  }}
                  placeholder={<div />}
                />
              </div>
            </>
          )}
          {result === false && (
            <>
              <div className={styles.image}>
                <img src={require('../../assets/sorry.png')} />
              </div>
              <div className={styles.fail}>Oh! Sorry about that!</div>
              <div className={styles.description}>
                You picked the wrong answer
                <br />
                You can play again, maybe this time will be better!
              </div>
              <div className={styles.buttonGroup}>
                <Button className={styles.button2} onClick={() => this.setState({ result: null })}>
                  Play Again
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    );
    return <Layout children={children}></Layout>;
  }
}

export default Game;
