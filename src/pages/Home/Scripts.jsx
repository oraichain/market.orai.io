import React, { Component } from "react";
import { List, Pagination, Button, Modal, Form, Input, InputNumber, notification } from "antd";
import { UserOutlined, CheckCircleTwoTone, CopyOutlined } from "@ant-design/icons";
import styles from "./Scripts.less";
import { connect } from "dva";

class Scripts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage: 1,
            visible: false,
            currentScript: null,
            result: null,
            tx_hash: null
        }
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch({
            type: "market/fetch",
            payload: {
                limit: 1000000,
                page: 1
            }
        })
    }

    tryOut = async (values) => {
        const { dispatch } = this.props;
        const { currentScript } = this.state;
        const { price, expected_price, fees } = values;
        const res = (await dispatch({
            type: "market/tryOut",
            payload: {
                oscript_name: currentScript,
                price: btoa(price),
                expected_price: btoa(expected_price),
                fees,
            }
        })).data
        if(res.message === "You have successfully signed and broadcast your tx"){
            this.setState({
                result: res.results[0],
                tx_hash: res.tx_hash
            })
        }
        else if(res.message === "The given fee is smaller / equal to the required fee or the oracle script does not exist. Provided fees should at least be higher"){
            notification.error({
                message: `Fees must be greater than ${res.required_fee}`
            })
        }
        else{
            notification.error({
                message: `An error occurred`
            })
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
        const { scripts, loading, total, pageSize, dispatch, trying } = this.props
        const { currentPage, visible, currentScript, result, tx_hash } = this.state
        console.log(tx_hash)
        return (
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.script}>
                        Oracle scripts
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
                        dataSource={scripts}
                        renderItem={item => {
                            return (
                                <List.Item style={{ borderRadius: 10 }}>
                                    <div className={styles.card}>
                                        <div className={styles.block}>
                                            <span className={styles.title}>Name</span>: {item.name}
                                        </div>
                                        <div className={styles.block} style={{ height: 75 }}>
                                            <span className={styles.title}>Name</span>: {item.description}
                                        </div>
                                        <div className={styles.action}>
                                            <a href={`https://scan.orai.io/account/${item.owner}`} target="_blank">
                                                <UserOutlined style={{ fontSize: 25 }} className={styles.button} title="Owner" />
                                            </a>
                                            <a href="#">
                                                <CheckCircleTwoTone
                                                    className={styles.button}
                                                    title="Transaction id"
                                                    twoToneColor="rgb(82, 196, 26)" style={{ fontSize: 25 }} />
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
                    {/* <div
                        style={{
                            textAlign: 'center',
                            marginBottom: 20,
                        }}
                    >
                        <Pagination
                            showSizeChanger={true}
                            current={currentPage}
                            size="large"
                            pageSizeOptions={['3', '6', '9', '12']}
                            // onChange={page => {
                            //     console.log(pageSize)
                            //     console.log(page)
                            //     this.setState({ currentPage: page });
                            //     dispatch({
                            //         type: 'market/fetch',
                            //         payload: {
                            //             limit: pageSize,
                            //             page
                            //         },
                            //     });
                            // }}
                            onShowSizeChange={(_, size) => {
                                console.log(_)
                                console.log(size)
                                dispatch({
                                    type: 'market/savePageSize',
                                    payload: size,
                                });
                                dispatch({
                                    type: 'market/fetch',
                                    payload: {
                                        limit: size,
                                        page: currentPage
                                    },
                                });
                            }}
                            total={total}
                            pageSize={pageSize}
                        />
                    </div> */}
                </div>
                <Modal
                    title="Oracle script"
                    visible={visible}
                    footer={null}
                    onCancel={() => this.setState({ 
                        visible: false,
                        result: null,
                     })}
                >
                    <div>
                        <Form 
                            onFinish={this.tryOut}
                            initialValues={{
                                price: 5000,
                                expected_price: 5000,
                                fees: 50000
                            }}
                        >
                            <div style={{
                                marginBottom: 10,
                            }}>
                                Price:
                            </div>
                            <Form.Item
                                name="price"
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
                                Expected price:
                            </div>
                            <Form.Item
                                name="expected_price"
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
                                Fees:
                            </div>
                            <Form.Item
                                name="fees"
                            >
                                <InputNumber 
                                    style={{
                                        width: "100%",
                                    }} 
                                    min={0}
                                />
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
                                    loading={trying}
                                >
                                    Try it out
                                </Button>
                            </div>
                            {
                                result && 
                                <div style={{
                                    marginTop: 20
                                }}>
                                    <div style={{display: "flex", padding: "5px 0"}}>
                                        <div style={{width: 128}}>Transaction Hash:</div> 
                                        <div>
                                            {tx_hash.slice(0,25)}... 
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
                                        <div style={{width: 128}}>Validator Address:</div> 
                                        <div>
                                            {result.validatorAddrs[0]}
                                        </div>
                                    </div>
                                    <div style={{display: "flex", padding: "5px 0"}}>
                                        <div style={{width: 128}}>Block Height:</div> 
                                        <div>
                                            {result.blockHeight}
                                        </div>
                                    </div>
                                    <div style={{display: "flex", padding: "5px 0"}}>
                                        <div style={{width: 128}}>Aggregated Prices:</div> 
                                        <div>
                                            {atob(result.aggregatedPrices[0])}
                                        </div>
                                    </div>
                                    <div style={{display: "flex", padding: "5px 0"}}>
                                        <div style={{width: 128}}>Request Status:</div> 
                                        <div>
                                            {result.requestStatus}
                                        </div>
                                    </div>
                                </div>
                            }
                        </Form>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default connect(({ market, loading }) => ({
    scripts: market.scripts,
    loading: loading.effects["market/fetch"],
    trying: loading.effects["market/tryOut"],
    total: market.total,
    pageSize: market.pageSize,
}))(Scripts)