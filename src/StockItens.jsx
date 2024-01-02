import React, { Component } from "react";

import {
    Row,
    Col,
    Button
} from "react-bootstrap"
import { defaultText } from "./events.js";

import { newRequest } from "./request.js";

import { ToastContainer, toast } from 'react-toastify';

class StockItens extends Component {
    constructor(props) {
        super(props);

        this.state = {
            itens: []
        }

        defaultText(this)

    }

    componentDidMount(){
    }

    render() {
        return (
            <div>
                {this.props.itens.map((value, index) => {
                    return(
                        <>
                            <Row>
                                <Col md={6} xs={10}>
                                    <p>{value.nome}</p>
                                </Col>
                                <Col md={6} xs={2}>
                                    <p>{value.quantidade}</p>
                                </Col>
                            </Row>
                        </>
                    )
                })}
            </div>
        )
    }
}

export default StockItens