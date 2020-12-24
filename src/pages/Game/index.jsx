import React from 'react';
import Layout from '../../layouts';
import { Row, Col, Button, Input, Spin } from 'antd';
import styles from './index.less';
import axios from 'axios';
import { TwitterShareButton } from 'react-twitter-embed';

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
      answerMatrix: null,
      questionMatrix: null,
      questionList: null,
      loading: true,
    };
  }

  async componentDidMount() {
    const config = {
      method: 'get',
      url: 'https://api.game.orai.io/v1/gen_crossword',
    };

    const {
      data: { data },
    } = await axios(config);
    if (data.status === 200) {
      this.setState({
        questionList: data.questions_list,
        questionMatrix: data.question_matrix,
        answerMatrix: data.answer_matrix,
        loading: false,
      });
    }
  }

  getResult = () => {
    const { input, answerMatrix } = this.state;
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
              {/* {questionIndex.includes([i, j].toString()) && (
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
              )} */}
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
    const { result, questionMatrix, questionList, loading } = this.state;
    const children = loading ? (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Spin />
      </div>
    ) : (
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
                  url="http://market.orai.io/christmasGame"
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
