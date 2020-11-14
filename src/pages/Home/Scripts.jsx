import React, {Component} from "react";
import {List, Table, Button, Modal, Form, Input, InputNumber, Select, Upload, notification, Switch, Tooltip} from "antd";
import {UserOutlined, CheckCircleTwoTone, CopyOutlined, InfoCircleTwoTone} from "@ant-design/icons";
import styles from "./Scripts.less";
import {connect} from "dva";

const {Option} = Select;

const defaultImages = {
  "goldfish": {
    "image_hash": "QmX1LNNUzmvskEBKpy4F76xQRbw47dp9eDM6Ppi3Qyk25N",
    "image_name": "a.jpg",
    "label": "goldfish",
    "expected_output": "Z29sZGZpc2g="
  },
  "great_white_shark": {
    "image_hash": "QmUwX5mCSopqV883PpoWuE21w38JciB3RCrVbuKR7tH5Ai",
    "image_name": "a.jpg",
    "label": "great_white_shark",
    "expected_output": "Z3JlYXRfd2hpdGVfc2hhcms="
  },
  "tree_frog": {
    "image_hash": "QmVqiHB2xdgoL3vv5bzhvHgRVPmRPjFQn7DQ67fN4C7Sqx",
    "image_name": "a.jpg",
    "label": "tree_frog",
    "expected_output": "dHJlZV9mcm9n"
  },
  "Samoyed": {
    "image_hash": "QmZqMFADQqLiK1PH1Afp3V9C1SghUi6DmdMKJp1JMDPTmi",
    "image_name": "a.jpg",
    "label": "Samoyed",
    "expected_output": "U2Ftb3llZA=="
  },
  }

  const ocrList = {
    "0": {
      "image_hash": "QmRBkP87C9x9HGtZDL2RDF3baXXLY4uJBv7A2HZuaZufHa",
      "image_name": "a.jpg"
    },
    "1": {
      "image_hash": "QmcVyP9d4Dr3DDoQF9rDCE7Eh46zS49fMfXbEhAe9Fwxn8",
      "image_name": "a.jpg"
    },
    "2": {
      "image_hash": "QmRdv74LPufdquq5TZkMuwZbtNK9PB1JpYEZrwcTs94Vsx",
      "image_name": "a.jpg"
    },

  }

const columns = [
  {
    title: 'Validator address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Result',
    dataIndex: 'result',
    key: 'result',
  },
]

class Scripts extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPage: 1,
      visible: false,
      currentScript: null,
      result: null,
      tx_hash: null,
      file: null,
      isDefault: true,
      defaultImage: "great_white_shark",
      handling: false,
      defaultOcr: "0"
    }
  }

  form = React.createRef();

  classificationForm = React.createRef();

  componentDidMount() {
    const {dispatch} = this.props
    dispatch({
      type: "market/fetch",
      payload: {
        limit: 1000000,
        page: 1
      }
    })
  }

  tryOut = async (values) => {
    const {dispatch} = this.props;
    const {currentScript, file, isDefault, defaultImage, defaultOcr} = this.state;
    const {expected_price, fees, validator_count, expected_output} = values;
    if (["oscript_classification", "oscript_ocr", "oscript_classification_v2"].includes(currentScript)) {
      if (!isDefault) {
        if (!file) {
          notification.error({
            message: "Please upload image"
          });
          return;
        }
        const payload = new FormData();
        payload.append("oscript_name", currentScript);
        payload.append("input", btoa("asdas"));
        payload.append("image", file[file.length - 1].originFileObj);
        payload.append("expected_output", btoa(expected_output));
        payload.append("fees", fees);
        payload.append("validator_count", validator_count);

        const res = (await dispatch({
          type: currentScript === "oscript_ocr" ? "market/ocr" : "market/classification",
          payload
        })).data
        if (res.message === "You have successfully signed and broadcast your tx") {
          this.setState({
            result: res.results[0],
            tx_hash: res.tx_hash
          })
        } else if (res.message === "The given fee is smaller / equal to the required fee or the oracle script does not exist. Provided fees should at least be higher") {
          notification.error({
            message: `Fees must be greater than ${res.required_fee}`
          })
        } else if(res.message === "The requests are still being handled on Oraichain. Please check them later using the transaction hash"){
           this.setState({
             handling: true
           })
        } else {
          notification.error({
            message: res.message
          })
        }
      } else {
        const payload = {
          "oscript_name": currentScript,
          "expected_output": btoa(expected_output),
          "input": btoa("asdas"),
          "fees": fees,
          "validator_count": validator_count,
          "image_hash": currentScript === "oscript_ocr"?ocrList[defaultOcr].image_hash:defaultImages[defaultImage].image_hash,
          "image_name": currentScript === "oscript_ocr"?ocrList[defaultOcr].image_name:defaultImages[defaultImage].image_name
        }
        const res = (await dispatch({
          type: currentScript === "oscript_ocr" ? "market/ocrHash" : "market/classificationHash",
          payload
        })).data
        if (res.message === "You have successfully signed and broadcast your tx") {
          this.setState({
            result: res.results[0],
            tx_hash: res.tx_hash
          })
        } else if (res.message === "The given fee is smaller / equal to the required fee or the oracle script does not exist. Provided fees should at least be higher") {
          notification.error({
            message: `Fees must be greater than ${res.required_fee}`
          })
        } else if(res.message === "The requests are still being handled on Oraichain. Please check them later using the transaction hash"){
           this.setState({
             handling: true
           })
        } else {
          notification.error({
            message: res.message
          })
        }
      }
    } else {
      const res = (await dispatch({
        type: "market/priceRequest",
        payload: {
          oscript_name: currentScript,
          expected_price: btoa(expected_price),
          price: btoa("50000"),
          fees,
          validator_count
        }
      })).data
      if (res.message === "You have successfully signed and broadcast your tx") {
        this.setState({
          result: res.results[0],
          tx_hash: res.tx_hash
        })
      } else if (res.message === "The given fee is smaller / equal to the required fee or the oracle script does not exist. Provided fees should at least be higher") {
        notification.error({
          message: `Fees must be greater than ${res.required_fee}`
        })
      } else if(res.message === "The requests are still being handled on Oraichain. Please check them later using the transaction hash"){
          this.setState({
             handling: true
           })
      } else {
        notification.error({
          message: `An error occurred`
        })
      }
    }
  }

  copyTextToClipboard = () => {
    var textArea = window.document.createElement('textarea');
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = 0;
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.value = this.state.tx_hash;
    window.document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      var successful = window.document.execCommand('copy');
      var msg = successful ? 'successful' : 'unsuccessful';
      if (msg === 'successful') notification.success({
        message: 'Copy was ' + msg,
      });
      else notification.error({
        message: 'Copy was ' + msg,
      });
    } catch (err) {
      alert('Oops, unable to copy');
    }

    window.document.body.removeChild(textArea);
  };

  render() {
    const {scripts, loading, dispatch, requestLoading, classificationLoading, ocrLoading, classificationHashLoading, ocrHashLoading} = this.props;
    const {visible, currentScript, result, tx_hash, file, isDefault, defaultImage, handling, defaultOcr} = this.state;
    const props = {
      accept: "image/*",
      multiple: false,
      name: 'file',
      onChange: info => {
        if (info.file.status === 'done') {
          if (!info.file.type.includes("image/")) {
            notification.error({
              message: "Please upload image"
            })
            return;
          }
          this.setState({file: info.fileList})
        }
      },
      fileList: file ? [file[file.length - 1]] : []
    };
    const dataSource = [];
    if (result) result.aggregatedPrices.forEach((item, idx) => {
      dataSource.push({
        key: idx,
        address: item.value.validator_address,
        result: atob(item.value.result)
      })
    })
    return (
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.script}>
            Oracle price scripts
          </div>
          <List
            rowKey="id"
            loading={loading}
            grid={{
              gutter: 24,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 3,
              xl: 3,
              xxl: 3,
            }}
            style={loading ? {
              minHeight: "60vh"
            } : {}}
            dataSource={scripts.filter(item=>["oscript_btc", "oscript_eth"].includes(item.name))}
            renderItem={item => {
              return (
                <List.Item style={{borderRadius: 10}}>
                  <div className={styles.card}>
                    <div className={styles.block}>
                      <span className={styles.title}>Name</span>: {item.name}
                    </div>
                    <div className={styles.block} style={{height: 75}}>
                      <span className={styles.title}>Name</span>: {item.description}
                    </div>
                    <div className={styles.action}>
                      <a href={`https://scan.orai.io/account/${item.owner}`} target="_blank">
                        <UserOutlined style={{fontSize: 25}} className={styles.button} title="Owner"/>
                      </a>
                      <a href="#">
                        <CheckCircleTwoTone
                          className={styles.button}
                          title="Transaction id"
                          twoToneColor="rgb(82, 196, 26)" style={{fontSize: 25}}/>
                      </a>
                    </div>
                    <Button
                      style={{
                        width: "100%",
                        height: 60,
                        border: "1px solid #e0dada",
                        borderRadius: 10,
                        padding: 15,
                        backgroundColor: "#1890ff",
                        outlineColor: "#1890ff",
                        color: "white",
                        fontSize: 16,
                        margin: "0 auto",
                        marginTop: 10,
                      }}
                      onClick={() => this.setState({
                        visible: true,
                        currentScript: item.name
                      })}
                    >
                      Try it out
                    </Button>
                  </div>
                </List.Item>
              );
            }}
          />
          <div className={styles.script}>
            Oracle AI scripts
          </div>
          <List
            rowKey="id1"
            loading={loading}
            grid={{
              gutter: 24,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 3,
              xl: 3,
              xxl: 3,
            }}
            style={loading ? {
              minHeight: "60vh"
            } : {}}
            dataSource={scripts.filter(item=>!(["oscript_btc", "oscript_eth"].includes(item.name)))}
            renderItem={item => {
              return (
                <List.Item style={{borderRadius: 10}}>
                  <div className={styles.card}>
                    <div className={styles.block}>
                      <span className={styles.title}>Name</span>: {item.name}
                    </div>
                    <div className={styles.block} style={{height: 75}}>
                      <span className={styles.title}>Name</span>: {item.description}
                    </div>
                    <div className={styles.action}>
                      <a href={`https://scan.orai.io/account/${item.owner}`} target="_blank">
                        <UserOutlined style={{fontSize: 25}} className={styles.button} title="Owner"/>
                      </a>
                      <a href="#">
                        <CheckCircleTwoTone
                          className={styles.button}
                          title="Transaction id"
                          twoToneColor="rgb(82, 196, 26)" style={{fontSize: 25}}/>
                      </a>
                    </div>
                    <Button
                      style={{
                        width: "100%",
                        height: 60,
                        border: "1px solid #e0dada",
                        borderRadius: 10,
                        padding: 15,
                        backgroundColor: "#1890ff",
                        outlineColor: "#1890ff",
                        color: "white",
                        fontSize: 16,
                        margin: "0 auto",
                        marginTop: 10,
                      }}
                      onClick={() => this.setState({
                        visible: true,
                        currentScript: item.name
                      })}
                    >
                      Try it out
                    </Button>
                  </div>
                </List.Item>
              );
            }}
          />
        </div>
        <Modal
          title={`Oracle script (${currentScript})`}
          visible={visible}
          footer={null}
          onCancel={() => this.setState({
            visible: false,
            result: null,
            handling: false
          })}
          width={1000}
        >
          <div>
            {
              (["oscript_classification", "oscript_ocr", "oscript_classification_v2"].includes(currentScript)) ?
                <Form
                  ref={this.classificationForm}
                  onFinish={this.tryOut}
                  initialValues={{
                    expected_output: "great_white_shark",
                    fees: 120000,
                    validator_count: 2
                  }}
                >
                  {
                    currentScript !== "oscript_ocr" &&
                      <>
                        <div style={{
                    marginTop: 10,
                    marginBottom: 10,
                  }}>
                    Expected output :{" "}
                          <Tooltip title="The label you expect after the AI services run your image ">
                              <InfoCircleTwoTone style={{fontSize: 15}} />
                          </Tooltip>
                  </div>
                  <Form.Item
                    name="expected_output"
                    rules={[
                      {
                        required: true,
                        message: 'Please fill your expected output!',
                      },
                    ]}
                  >
                    <Input
                      style={{
                        width: "100%",
                      }}
                      min={0}
                    />
                  </Form.Item>
                      </>
                  }
                  <div style={{
                    marginTop: 10,
                    marginBottom: 10,
                  }}>
                    Fees:{" "}
                          <Tooltip title="The total fees you have to spend to execute the oracle script">
                              <InfoCircleTwoTone style={{fontSize: 15}} />
                          </Tooltip>
                  </div>
                  <Form.Item
                    name="fees"
                    rules={[
                      {
                        required: true,
                        message: 'Please fill your fees',
                      },
                    ]}
                  >
                    <InputNumber
                      style={{
                        width: "100%",
                      }}
                      min={0}
                    />
                  </Form.Item>
                  <div style={{
                    marginTop: 10,
                    marginBottom: 10,
                  }}>
                    Validator count:{" "}
                          <Tooltip title="The number of validators that execute the oracle scripts">
                              <InfoCircleTwoTone style={{fontSize: 15}} />
                          </Tooltip>
                  </div>
                  <Form.Item
                    name="validator_count"
                  >
                    <Select>
                      <Option value={1}>
                        1
                      </Option>
                      <Option value={2}>
                        2
                      </Option>
                      <Option value={3}>
                        3
                      </Option>
                    </Select>
                  </Form.Item>
                  <div style={{
                    marginTop: 10,
                    marginBottom: 10,
                  }}>
                    Image:{" "}
                          <Tooltip title="The image you want to classify">
                              <InfoCircleTwoTone style={{fontSize: 15}} />
                          </Tooltip>
                  </div>
                  <div style={{
                    marginTop: 10,
                    marginBottom: 10,
                  }}>
                    Use example image <Switch checked={!isDefault}
                                              onChange={checked => this.setState({isDefault: !checked})}/> Upload image
                  </div>
                  {
                    isDefault ?
                      (currentScript !== "oscript_ocr")?
                        <div style={{
                        marginTop: 10,
                        marginBottom: 10,
                        display: "flex"
                      }}>
                        <div
                          onClick={() => {
                            this.setState({defaultImage: "tree_frog"})
                            this.classificationForm.current.setFieldsValue({
                              expected_output: "tree_frog"
                            })
                          }}
                          style={{
                            border: defaultImage === "tree_frog" ? "3px solid blue" : "3px solid white",
                            marginRight: 20
                          }}
                        >
                          <img
                            src={"/images/tree_frog.jpg"}
                            width={150}
                            height={150}
                          />
                        </div>
                        <div
                          onClick={() => {
                            this.setState({defaultImage: "great_white_shark"})
                            this.classificationForm.current.setFieldsValue({
                              expected_output: "great_white_shark"
                            })
                          }}
                          style={{
                            border: defaultImage === "great_white_shark" ? "3px solid blue" : "3px solid white",
                            marginRight: 20
                          }}
                        >
                          <img
                            src={"/images/great_white_shark.jpg"}
                            width={150}
                            height={150}
                          />
                        </div>
                        <div
                          onClick={() => {
                            this.setState({defaultImage: "goldfish"})
                            this.classificationForm.current.setFieldsValue({
                              expected_output: "goldfish"
                            })
                          }}
                          style={{
                            border: defaultImage === "goldfish" ? "3px solid blue" : "3px solid white",
                            marginRight: 20
                          }}
                        >
                          <img
                            src={"/images/goldfish.jpg"}
                            width={150}
                            height={150}
                          />
                        </div>
                        <div
                          onClick={() => {
                            this.setState({defaultImage: "Samoyed"})
                            this.classificationForm.current.setFieldsValue({
                              expected_output: "Samoyed"
                            })
                          }}
                          style={{
                            border: defaultImage === "Samoyed" ? "3px solid blue" : "3px solid white",
                            marginRight: 20
                          }}
                        >
                          <img
                            src={"/images/Samoyed.jpg"}
                            width={150}
                            height={150}
                          />
                        </div>
                      </div>
                        :<div style={{
                        marginTop: 10,
                        marginBottom: 10,
                        display: "flex"
                      }}>
                        <div
                          onClick={() => {
                            this.setState({defaultOcr: "0"})
                          }}
                          style={{
                            border: defaultOcr === "0" ? "3px solid blue" : "3px solid white",
                            marginRight: 20
                          }}
                        >
                          <img
                            src={"/images/ocr0.jpg"}
                            width={150}
                            height={150}
                          />
                        </div>
                        <div
                          onClick={() => {
                            this.setState({defaultOcr: "1"})
                          }}
                          style={{
                            border: defaultOcr === "1" ? "3px solid blue" : "3px solid white",
                            marginRight: 20
                          }}
                        >
                          <img
                            src={"/images/ocr1.jpg"}
                            width={150}
                            height={150}
                          />
                        </div>
                        <div
                          onClick={() => {
                            this.setState({defaultOcr: "2"})
                          }}
                          style={{
                            border: defaultOcr === "2" ? "3px solid blue" : "3px solid white",
                            marginRight: 20
                          }}
                        >
                          <img
                            src={"/images/ocr2.jpg"}
                            width={150}
                            height={150}
                          />
                        </div>
                      </div>
                      : <Upload {...props}>
                        <Button
                          style={{
                            padding: 10,
                            height: 50,
                            border: "1px solid #e0dada",
                            backgroundColor: "#1890ff",
                            outlineColor: "#1890ff",
                            color: "white",
                          }}
                        >Click to upload image</Button>
                      </Upload>
                  }
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      marginTop: 10
                    }}
                  >
                    <Button
                      htmlType="submit"
                      style={{
                        margin: "0 auto",
                        width: 200,
                        padding: 10,
                        height: 50,
                        borderRadius: 10,
                        border: "1px solid #e0dada",
                        backgroundColor: "#1890ff",
                        outlineColor: "#1890ff",
                        color: "white",
                      }}
                      loading={["oscript_classification", "oscript_classification_v2"].includes(currentScript) ? (isDefault? classificationHashLoading: classificationLoading) : (isDefault? ocrHashLoading:ocrLoading)}
                    >
                      Try it out
                    </Button>
                  </div>
                  {
                    handling &&
                      <div style={{
                        marginTop: 20
                      }}>
                        <div style={{padding: "5px 0"}}>
                          The requests are still being handled on Oraichain. Please check them later using the transaction hash
                        </div>
                      </div>
                  }
                  {
                    result &&
                    <div style={{
                      marginTop: 20
                    }}>
                      <div style={{display: "flex", padding: "5px 0"}}>
                        <div style={{width: 128}}>Transaction Hash:</div>
                        <div>
                          {tx_hash.slice(0, 25)}...
                          <CopyOutlined
                            onClick={() => this.copyTextToClipboard()}
                            style={{
                              marginLeft: 10,
                              cursor: 'pointer',
                              fontSize: 20,
                            }}
                            title="Copy"
                          />
                        </div>
                      </div>
                      <div style={{display: "flex", padding: "5px 0"}}>
                        <div style={{width: 128}}>Request Id:</div>
                        <div>
                          {result.requestId}
                        </div>
                      </div>
                      <div style={{display: "flex", padding: "5px 0"}}>
                        <div style={{width: 128}}>Request Status:</div>
                        <div>
                          {result.requestStatus}
                        </div>
                      </div>
                      <div style={{padding: "5px 0"}}>
                        <div style={{width: 128}}>Aggregated detail:</div>
                      </div>
                      <Table
                        columns={columns}
                        dataSource={dataSource}
                        pagination={false}
                        bordered={true}
                      />
                      <div style={{display: "flex", padding: "5px 0"}}>
                        <div style={{width: 128}}>Aggregated:</div>
                        <div>
                          {
                            atob(result.aggregatedPrices[0].value.result)
                          }
                        </div>
                      </div>
                    </div>
                  }
                </Form>
                :
                <Form
                  onFinish={this.tryOut}
                  ref={this.form}
                  initialValues={{
                    price: 50000,
                    expected_price: 17000,
                    fees: 500000,
                    validator_count: 2
                  }}
                >
                  <div style={{
                    marginTop: 10,
                    marginBottom: 10,
                  }}>
                    Expected price:{" "}
                          <Tooltip title="The approximate price you expect to receive from this cryptocurrency">
                              <InfoCircleTwoTone style={{fontSize: 15}} />
                          </Tooltip>
                  </div>
                  <Form.Item
                    name="expected_price"
                    rules={[
                      {
                        required: true,
                        message: 'Please fill your expected price!',
                      },
                    ]}
                  >
                    <InputNumber
                      style={{
                        width: "100%",
                      }}
                      min={0}
                    />
                  </Form.Item>
                  <div style={{
                    marginTop: 10,
                    marginBottom: 10,
                  }}>
                    Fees:{" "}
                          <Tooltip title="The total fees you have to spend to execute the oracle script">
                              <InfoCircleTwoTone style={{fontSize: 15}} />
                          </Tooltip>
                  </div>
                  <Form.Item
                    name="fees"
                    rules={[
                      {
                        required: true,
                        message: 'Please fill your fees!',
                      },
                    ]}
                  >
                    <InputNumber
                      style={{
                        width: "100%",
                      }}
                      min={0}
                    />
                  </Form.Item>
                  <div style={{
                    marginTop: 10,
                    marginBottom: 10,
                  }}>
                    Validator count:{" "}
                          <Tooltip title="The number of validators that execute the oracle scripts">
                              <InfoCircleTwoTone style={{fontSize: 15}} />
                          </Tooltip>
                  </div>
                  <Form.Item
                    name="validator_count"
                  >
                    <Select>
                      <Option value={1}>
                        1
                      </Option>
                      <Option value={2}>
                        2
                      </Option>
                      <Option value={3}>
                        3
                      </Option>
                    </Select>
                  </Form.Item>
                  <div
                    style={{
                      width: "100%",
                      display: "flex"
                    }}
                  >
                    <Button
                      htmlType="submit"
                      style={{
                        margin: "0 auto",
                        width: 200,
                        padding: 10,
                        height: 50,
                        borderRadius: 10,
                        border: "1px solid #e0dada",
                        backgroundColor: "#1890ff",
                        outlineColor: "#1890ff",
                        color: "white",
                      }}
                      loading={requestLoading}
                    >
                      Try it out
                    </Button>
                  </div>
                  {
                    handling &&
                      <div style={{
                        marginTop: 20
                      }}>
                        <div style={{padding: "5px 0"}}>
                          The requests are still being handled on Oraichain. Please check them later using the transaction hash
                        </div>
                      </div>
                  }
                  {
                    result &&
                    <div style={{
                      marginTop: 20
                    }}>
                      <div style={{display: "flex", padding: "5px 0"}}>
                        <div style={{width: 128}}>Transaction Hash:</div>
                        <div>
                          {tx_hash.slice(0, 25)}...
                          <CopyOutlined
                            onClick={() => this.copyTextToClipboard()}
                            style={{
                              marginLeft: 10,
                              cursor: 'pointer',
                              fontSize: 20,
                            }}
                            title="Copy"
                          />
                        </div>
                      </div>
                      <div style={{display: "flex", padding: "5px 0"}}>
                        <div style={{width: 128}}>Request Id:</div>
                        <div>
                          {result.requestId}
                        </div>
                      </div>
                      <div style={{display: "flex", padding: "5px 0"}}>
                        <div style={{width: 128}}>Request Status:</div>
                        <div>
                          {result.requestStatus}
                        </div>
                      </div>
                      <div style={{padding: "5px 0"}}>
                        <div style={{width: 128}}>Aggregated detail:</div>
                      </div>
                      <Table
                        columns={columns}
                        dataSource={dataSource}
                        pagination={false}
                        bordered={true}
                      />
                      <div style={{display: "flex", padding: "5px 0"}}>
                        <div style={{width: 128}}>Aggregated:</div>
                        <div>
                          {
                            result.aggregatedPrices.filter(i => isNaN(atob(i.value.result))).length > 0
                              ? atob(result.aggregatedPrices[0].value.result)
                              : (result.aggregatedPrices.reduce((a, b) => {
                              return a + parseFloat(atob(b.value.result))
                            }, 0)) / result.aggregatedPrices.length
                          }
                        </div>
                      </div>
                    </div>
                  }
                </Form>
            }
          </div>
        </Modal>
      </div>
    )
  }
}

export default connect(({market, loading}) => ({
  scripts: market.scripts,
  loading: loading.effects["market/fetch"],
  requestLoading: loading.effects["market/priceRequest"],
  classificationLoading: loading.effects["market/classification"],
  ocrLoading: loading.effects["market/ocr"],
  classificationHashLoading: loading.effects["market/classificationHash"],
  ocrHashLoading: loading.effects["market/ocrHash"],
  total: market.total,
  pageSize: market.pageSize,
}))(Scripts)
