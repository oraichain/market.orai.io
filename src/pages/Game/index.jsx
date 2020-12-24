import React from 'react';
import Layout from '../../layouts';
import { Row, Col, Button, Input, Spin } from 'antd';
import styles from './index.less';
import axios from 'axios';
import { TwitterShareButton } from 'react-twitter-embed';
import { v4 as uuidv4 } from 'uuid';

const id = uuidv4().slice(0, 4).toUpperCase();

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
    this.fetchData();
  }

  fetchData = async () => {
    this.setState({
      loading: true,
    });
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
  };

  getResult = async () => {
    const { input, answerMatrix, questionList } = this.state;
    let count = 0;

    questionList.forEach((item) => {
      let result = true;
      if (item[4] === 0) {
        for (let i = item[3]; i < item[3] + item[0]; i++) {
          if (answerMatrix[item[2]][i] !== input[item[2]][i]) {
            result = false;
            break;
          }
        }
        if (result) count++;
      } else {
        for (let i = item[2]; i < item[2] + item[0]; i++) {
          if (answerMatrix[i][item[3]] !== input[i][item[3]]) {
            result = false;
            break;
          }
        }
        if (result) count++;
      }
    });

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
      result: true,
      input: arr,
    });
  };

  renderMatrix = (matrix) => {
    var questionMatrix = matrix.map(function (arr) {
      return arr.slice();
    });
    const { input, questionList } = this.state;
    const across = questionList.filter((i) => i[4] === 0).map((i) => [i[2], i[3]].toString());
    const down = questionList.filter((i) => i[4] === 1).map((i) => [i[2], i[3]].toString());

    for (let i = 0; i < questionMatrix.length; i++) {
      for (let j = 0; j < questionMatrix[i].length; j++) {
        if (questionMatrix[i][j]) {
          questionMatrix[i][j] = (
            <div key={[i, j].toString()} className={styles.box}>
              <Input
                className={styles.input}
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
              {across.includes([i, j].toString()) && (
                <div className={styles.order}>{across.indexOf([i, j].toString()) + 1}</div>
              )}
              {down.includes([i, j].toString()) && (
                <div className={styles.order}>
                  {down.indexOf([i, j].toString()) + 1 + across.length}
                </div>
              )}
            </div>
          );
        } else {
          questionMatrix[i][j] = (
            <div
              key={[i, j].toString()}
              style={{
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
    let across;
    let down;
    if (!loading) {
      across = questionList.filter((i) => i[4] === 0);
      down = questionList.filter((i) => i[4] === 1);
    }
    const children = loading ? (
      <div className={styles.game}>
        <div
          className={styles.container}
          style={{
            minHeight: '70vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Spin size="large" />
        </div>
      </div>
    ) : (
      <div className={styles.game}>
        <div className={styles.container}>
          {result === null && (
            <>
              <Row className={styles.header}>
                <Col span={24} lg={12} className={styles.img}>
                  <img src={require('../../assets/Happy-Christmas.png')} width={260} height={48} />
                </Col>
              </Row>
              <Row className={styles.content}>
                <Col
                  span={24}
                  lg={12}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRight: '1px solid #E7E7E7',
                  }}
                >
                  <div className={styles.title}>
                    Finish the crossword puzzle and receive one of our many prizes!
                  </div>
                  <div className={styles.matrix}>{this.renderMatrix(questionMatrix)}</div>
                </Col>
                <Col span={24} lg={12} className={styles.questions}>
                  <div className={styles.across}>Across</div>
                  {across.map((item, idx) => (
                    <div className={styles.question}>
                      {idx + 1}. {item[1]}
                    </div>
                  ))}
                  <div className={styles.down}>Down</div>
                  {down.map((item, idx) => (
                    <div className={styles.question}>
                      {idx + 1 + across.length}. {item[1]}
                    </div>
                  ))}
                  <div className={styles.sure}>Are you sure this is your final answer? </div>
                  <Button
                    className={styles.submit}
                    onClick={() => {
                      this.getResult();
                      this.setState({
                        loading: true,
                      });
                      setTimeout(() => this.setState({ loading: false }), 1000);
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
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?data=${id}%27&amp;size=50x50`}
                  width={161}
                  height={160}
                />
              </div>
              <div className={styles.success}>Yeah! You just completed our misson!</div>
              <div className={styles.buttonGroup}>
                <Button
                  className={styles.button1}
                  onClick={() => {
                    this.setState({ result: null });
                    this.fetchData();
                  }}
                >
                  Play Again
                </Button>
                <TwitterShareButton
                  url={'.'}
                  options={{
                    text:
                      "It's almost Christmas🎄celebration time🎉!\nWin up to $112.12 in $ORAI by solving our AI-generated crossword puzzle!\n- Go to https://market.orai.io/christmasGame\n- Submit answers\n- Tweet result: " +
                      id +
                      ' + #chungmas\nReceive $11.21 in🏆 on 1/1/2021\n🍀1 person wins $112.1💰\nMax. 200 winners✨',
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
                <Button
                  className={styles.button2}
                  onClick={() => {
                    this.setState({ result: null });
                    this.fetchData();
                  }}
                >
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
