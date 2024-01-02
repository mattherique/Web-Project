import React, { Component } from "react";

import {
    Row,
    Col,
    Button
} from "react-bootstrap"
import RegisterItens from "./RegisterItens.jsx";

import { newRequest } from "./request.js";
import StockItens from "./StockItens.jsx";

import { ToastContainer, toast } from 'react-toastify';

class AdminStock extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }

    }

    componentDidMount(){
    }

    listItens(){
        let config = {
            method:"GET",
            url:"/admin/list-itens"
        }

        let form = {
        }

        newRequest(config, form).then((r) => {
            if(r.success){
                this.setState({
                    itens: r.response.itens
                }, ()=>this.changeTab("itensTab"))
            }else{
                toast.error('Erro ao listar itens', {
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

    changeTab(page){
        this.setState({
            itensTab: page == "itensTab",
            registerItemTab: page == "registerItemTab"
        })
    }

    render() {
        return (
            <div className="container">
                <main>
                    <Row>
                        <Col md={12}>
                            <h2 className="title-style">Estoque</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12} xs={12}>
                            <Button
                                className={this.state.itensTab ? "button-tab-active" : "button-tab-inactive"}
                                onClick={() => {this.listItens()}}
                            >Itens no estoque
                            </Button>
                            <Button
                                className={this.state.registerItemTab ? "button-tab-active" : "button-tab-inactive"}
                                onClick={() => this.changeTab("registerItemTab")}
                            >Cadastrar Item
                            </Button>
                        </Col>
                    </Row>
                    <hr className="tab-bar"/>
                    {this.state.itensTab ?
                    <>
                        <StockItens itens={this.state.itens}/>
                    </>
                    :
                    <>
                        <RegisterItens />
                    </>
                    }
                </main>
            </div>
        )
    }
}

export default AdminStock 