import React from "react";
import MarketDetail from "./components/MarketDetail";

export default class Home extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div>
                <MarketDetail />
            </div>
        )
    }
}