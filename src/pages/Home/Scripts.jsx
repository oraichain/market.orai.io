import React, { Component } from "react";
import { List, Pagination } from "antd";
import { Link } from "umi";
import { UserOutlined, CheckCircleTwoTone } from "@ant-design/icons";
import styles from "./Scripts.less";
import { connect } from "dva";

class Scripts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentPage: 1
        }
    }

    componentDidMount(){
        const { dispatch } = this.props
        dispatch({
            type: "market/fetch",
            payload: {
                limit: 1000000,
                page: 1
            }
        })
    }

    render() {
        const { scripts, loading, total, pageSize, dispatch } = this.props
        const { currentPage } = this.state
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
                        style={loading? {
                            minHeight: "60vh"
                        }:{}}
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
            </div>
        )
    }
}

export default connect(({ market, loading })=>({
    scripts: market.scripts,
    loading: loading.effects["market/fetch"],
    total: market.total,
    pageSize: market.pageSize,
}))(Scripts)