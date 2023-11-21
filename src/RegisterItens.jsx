import React, { Component } from "react";

import {
    Row,
    Col,
    Button
} from "react-bootstrap"
import { detectFilled } from "./assistentFunction.js";
import { defaultText } from "./events.js";

import { newRequest } from "./request.js";

import { ToastContainer, toast } from 'react-toastify';

class RegisterItens extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }

        defaultText(this)

    }

    componentDidMount(){
    }

    registerItem(){
        let config = {
            method:"POST",
            url:"/admin/register-item"
        }

        let form = {
            item_name: this.state.itemName,
            item_amount: this.state.itemAmount
        }

        newRequest(config, form).then((r) => {
            if(r.success){
                toast.success('Item registrado com suceso!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    theme: "light",
                });
                this.setState({
                    itemName: "",
                    itemAmount: ""
                })
            }else{
                toast.error('Erro ao registrar item!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    theme: "light",
                });
            }
        })
    }

    render() {
        return (
            <div>
                <div className="register-box">
                    <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        theme="light"
                    />
                    <Row className="register-input-space">
                        <Col className="register-input-col">
                            <p id="item-name-text" className="register-input-text">Nome do item</p>
                            <input
                                className="register-input"
                                id="item-name"
                                value={this.state.itemName}
                                onChange={(e) => {this.changeText(e, "itemName", detectFilled(e))}}
                            />
                        </Col>
                    </Row>
                    <Row className="register-input-space">
                        <Col className="register-input-col">
                            <p id="item-amount-text" className="register-input-text">Quantidade em estoque</p>
                            <input
                                className="register-input"
                                id="item-amount"
                                value={this.state.itemAmount}
                                type="number"
                                onChange={(e) => {this.changeText(e, "itemAmount", detectFilled(e))}}
                            />
                        </Col>
                    </Row>
                    <Row className="button-position">
                        <Col md={12}>
                            <Button onClick={() => this.registerItem()}>Cadastrar Item</Button>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default RegisterItens