import React, { Component } from "react";

import {
    Row,
    Col,
    Button,
    Form
} from "react-bootstrap"
import InputMask from "react-input-mask";

import { detectFilled } from "./assistentFunction.js";
import { defaultText } from "./events.js";
import { newRequest } from "./request.js";
import { CEPValidator } from "./structural.js";
import { ToastContainer, toast } from 'react-toastify';

import { IoNewspaperSharp } from "react-icons/io5";
import Select from "react-select";

class AdminUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userRegister: false,
            userTab: true,
            users: [],
            user: null
        }

        defaultText(this)
    }

    componentDidMount(){
        this.getUsers()
    }

    changeTab(page){
        this.setState({
            state: "",
            city: "",
            district: "",
            accomplish: "",
            numberAddress: "",
            address: "",
            cep: "",
            phone: "",
            email: "",
            name: "",
            userTab: page === "userTab",
            userRegister: page === "registerUser",
            infoUser: page === "infoUser"
        })
    }

    getUsers(){
        let config = {
            method:"GET",
            url:"/admin/list-users"
        }

        newRequest(config, {}).then((r) => {
            if(r.success){
                this.setState({
                    users: r.response.users
                })
            }
        })
    }

    getInfoUser(userId){
        this.setState({
            userItens: [],
            user: userId
        })

        let config = {
            method:"GET",
            url:"/admin/list-user-itens"
        }

        let form = {
            user: userId
        }

        newRequest(config, form).then((r) => {
            if(r.success){
                this.setState({
                    userItens: r.response.itens,
                    viewItens: true
                }, () => { this.changeTab("infoUser")})
            }else{

            }
        })
    }

    register(){
        
        let config = {
            method:"POST",
            url:"/admin/register-users"
        }

        let form = {
            name: this.state.name,
            email: this.state.email
        }

        newRequest(config, form).then((r) => {
            if(r.success){
                toast.success('Usuário registrado com sucesso', {
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

    changeCEP(event){
        console.log(event)
        var cep = event.target.value.replace(/\D/g, '').length
        
        this.setState({
            cep: event.target.value
        }, () => {detectFilled(event)})
        
        if(cep === 8){
            CEPValidator(event.target.value).then((response) => {

                document.getElementById("address-text").classList.add("fix-top")
                document.getElementById("district-text").classList.add("fix-top")
                document.getElementById("city-text").classList.add("fix-top")
                document.getElementById("state-text").classList.add("fix-top")

                this.setState({
                    address: response["info"]["logradouro"],
                    district: response["info"]["bairro"],
                    city: response["info"]["localidade"],
                    state: response["info"]["uf"]
                })
            })
        }
    }

    changeUserInfoTab(page){
        this.setState({
            registerUserItem: page == "registerUserItem",
            viewItens: page == "viewItens"
        })
    }

    changeSelect(obj){
        this.setState({
            userItem: obj
        })
    }

    registerNewItemUser(){
        let config = {
            method:"POST",
            url:"/admin/register-user-item"
        }

        let form = {
            itemId: this.state.userItem.value,
            user: this.state.user,
            itemAmount: this.state.itemAmount
        }

        newRequest(config, form).then((r) => {
            if(r.success){
                toast.success('Item registrado ao usuário com sucesso', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    theme: "light",
                });
                this.setState({
                    userItem: {},
                    itemAmount: ""
                })
            }else{
                toast.error('Erro ao registrar item ao usuário', {
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

    getItensUser(){
        let config = {
            method:"GET",
            url:"/admin/list-user-itens"
        }

        let form = {
            user: this.state.user
        }

        newRequest(config, form).then((r) => {
            if(r.success){
                this.setState({
                    userItens: r.response.itens
                }, () => this.changeUserInfoTab("viewItens"))

                toast.success('Item do usuário listados com sucesso', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    theme: "light",
                });
            }else{
                toast.error('Erro ao listar itens do usuário', {
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
    
    getStockItens(){
        let config = {
            method:"GET",
            url:"/admin/list-itens"
        }

        newRequest(config, {}).then((r) => {
            if(r.success){
                let objStockItens = []
                let stockItens = r.response.itens

                stockItens.forEach((value, index) => {
                    objStockItens.push({value:value.id, label:value.nome})
                })

                this.changeUserInfoTab("registerUserItem"); 

                this.setState({
                    stockItens: objStockItens
                }, () => { this.changeTab("infoUser")})

                toast.success('Estoque obtido com sucesso!', {
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
        console.log(this.state)
        return (
            <div className="container">
                <main>
                    <ToastContainer
                        position="top-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        theme="light"
                    />
                    <Row>
                        <Col md={12}>
                            <h2 className="title-style">Usuários</h2>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Button
                                className={this.state.userTab ? "button-tab-active" : "button-tab-inactive"}
                                onClick={() => {this.changeTab("userTab")}}
                            >Listagem
                            </Button>
                            <Button
                                className={this.state.userRegister ? "button-tab-active" : "button-tab-inactive"}
                                onClick={() => this.changeTab("registerUser")}
                            >Cadastro
                            </Button>
                            {this.state.infoUser ? 
                            <Button
                                className={this.state.infoUser ? "button-tab-active" : "button-tab-inactive"}
                                onClick={() => this.changeTab("infoUser")}
                            >Itens do usuário
                            </Button> : <></>}
                        </Col>
                    </Row>
                    <hr className="tab-bar"/>
                    {this.state.userRegister ?
                    <>
                        <div className="register-box">
                            <Row className="register-input-space">
                                <Col className="input-col">
                                    <p class="text-strcture">Informações do usuário</p>
                                </Col>
                            </Row>
                            <Row className="register-input-space">
                                <Col className="register-input-col">
                                    <p id="name-text" className="register-input-text">Nome</p>
                                    <input
                                        className="register-input"
                                        id="name"
                                        value={this.state.name}
                                        onChange={(e) => {this.changeText(e, "name", detectFilled(e))}}
                                    />
                                </Col>
                            </Row>
                            <Row className="register-input-space">
                                <Col className="register-input-col">
                                    <p id="email-text" className="register-input-text">Email</p>
                                    <input
                                        className="register-input"
                                        id="email"
                                        value={this.state.email}
                                        onChange={(e) => {this.changeText(e, "email", detectFilled(e))}}
                                    />
                                </Col>
                            </Row>
                            <Row className="register-input-space">
                                <Col className="register-input-col">
                                    <p id="phone-text" className="register-input-text">Telefone</p>
                                    <InputMask
                                        className="register-input"
                                        id="phone"
                                        mask="(99) 99999-9999"
                                        value={this.state.phone}
                                        onChange={(e) => {this.changeText(e, "phone", detectFilled(e))}}
                                    />
                                </Col>
                            </Row>
                            <Row className="register-input-space">
                                <Col className="input-col">
                                    <p class="text-strcture">Endereço</p>
                                </Col>
                            </Row>
                            <Row className="register-input-space">
                                <Col className="register-input-col">
                                    <p id="cep-text" className="register-input-text">CEP</p>
                                    <InputMask
                                        className="register-input"
                                        id="cep"
                                        mask="99999-999"
                                        value={this.state.cep}
                                        onChange={(e) => {this.changeCEP(e, "cep")}}
                                    />
                                </Col>
                            </Row>
                            <Row className="register-input-space">
                                <Col className="register-input-col">
                                    <p id="address-text" className="register-input-text">Rua</p>
                                    <input
                                        className="register-input"
                                        id="address"
                                        value={this.state.address}
                                        onChange={(e) => {this.changeText(e, "address", detectFilled(e))}}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="register-address-col">
                                    <p id="numberAddress-text" className="register-input-text">Número</p>
                                    <input
                                        className="register-input"
                                        id="numberAddress"
                                        value={this.state.numberAddress}
                                        onChange={(e) => {this.changeText(e, "numberAddress", detectFilled(e))}}
                                    />
                                </Col>
                                <Col className="register-address-col">
                                    <p id="accomplish-text" className="register-input-text">Complemento</p>
                                    <input
                                        className="register-input"
                                        id="accomplish"
                                        value={this.state.accomplish}
                                        onChange={(e) => {this.changeText(e, "accomplish", detectFilled(e))}}
                                    />
                                </Col>
                            </Row>
                            <Row className="register-input-space">
                                <Col className="register-input-col">
                                    <p id="district-text" className="register-input-text">Bairro</p>
                                    <input
                                        className="register-input"
                                        id="district"
                                        value={this.state.district}
                                        onChange={(e) => {this.changeText(e, "district", detectFilled(e))}}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col className="register-address-col">
                                    <p id="city-text" className="register-input-text">Cidade</p>
                                    <input
                                        className="register-input"
                                        id="city"
                                        value={this.state.city}
                                        onChange={(e) => {this.changeText(e, "city", detectFilled(e))}}
                                    />
                                </Col>
                                <Col className="register-address-col">
                                    <p id="state-text" className="register-input-text">Estado</p>
                                    <input
                                        className="register-input"
                                        id="state"
                                        value={this.state.state}
                                        onChange={(e) => {this.changeText(e, "state", detectFilled(e))}}
                                    />
                                </Col>
                            </Row>
                            <Row className="additional-options">
                                <Col className="input-col">
                                    <p class="text-strcture">Informações Adicionais (opcional)</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="register-input-col radio-adjust">
                                    <Form.Check
                                        id="default-radio"
                                        type="radio"
                                        label="Possui filhos ?"
                                        onChange={(e) => this.changeText(e, "tipoPagamento")}
                                    />
                                </Col>
                            </Row>
                            <Row className="button-position">
                                <Col md={12}>
                                    <Button onClick={() => this.register()}>Cadastrar usuário</Button>
                                </Col>
                            </Row>
                        </div>
                    </>
                    : this.state.userTab ?
                    <>
                        {
                            this.state.users.map((value, index) => {
                                return (
                                    <>
                                        <Row>
                                            <Col md={4} xs={4}>
                                                <p>{value.nome}</p>
                                            </Col>
                                            <Col md={6} xs={6} style={{overflow:"hidden"}}>
                                                <p>{value.email}</p>
                                            </Col>
                                            <Col md={2} xs={2}>
                                                <a onClick={() => this.getInfoUser(value.id)} className="clickable-icon">
                                                    <IoNewspaperSharp className="info-icon-size"/>
                                                </a>
                                            </Col>
                                        </Row>
                                    </>
                                )
                            })
                        }
                    </>
                    : this.state.infoUser ? 
                    <>
                        <Row>
                            <Col className="input-col">
                                <p class="text-strcture">Itens do usuário</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} xs={12}>
                                <Button
                                    className={this.state.viewItens ? "user-info-btn" : "user-info-btn-off"}
                                    onClick={() => {this.getItensUser()}}
                                >Visualizar Itens
                                </Button>
                                <Button
                                    className={this.state.registerUserItem ? "user-info-btn user-info-btn-divider" : "user-info-btn-off user-info-btn-divider"}
                                    onClick={() => {this.getStockItens()}}
                                >Cadastrar novo Item
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} className="user-info-box">
                                {this.state.viewItens ? 
                                <>
                                    {this.state.userItens.map((value, index) => {
                                        return (
                                            <>
                                                <Row>
                                                    <Col md={2} xs={6}>
                                                        <p>Item</p>
                                                    </Col>
                                                    <Col md={6} xs={6}>
                                                        <p>Quantidade recebida</p>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col md={2} xs={9}>
                                                        <p>{value.item_estoque.nome}</p>
                                                    </Col>
                                                    <Col md={6} xs={3}>
                                                        <p>{value.quantidade}</p>
                                                    </Col>
                                                </Row>
                                            </>
                                        )
                                    })}
                                </>
                                :
                                <Row>
                                    <Col md={12}>
                                        <div className="register-box">
                                            <Row className="register-input-space">
                                                <Col className="register-input-col">
                                                    <p>Pesquisar item no estoque</p>
                                                    <Select
                                                        value={this.state.userItem}
                                                        placeholder="Pesquise Aqui!"
                                                        onChange={(e) => {this.changeSelect(e)}}
                                                        options={this.state.stockItens}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row className="register-input-space">
                                                <Col className="register-input-col">
                                                    <p id="item-amount-text" className="register-input-text">Quantidade recebida</p>
                                                    <input
                                                        className="register-input"
                                                        id="item-amount"
                                                        value={this.state.itemAmount}
                                                        type="number"
                                                        onChange={(e) => {this.changeText(e, "itemAmount", detectFilled(e))}}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row className="button-position bottom-gap">
                                                <Col md={12}>
                                                    <Button onClick={() => this.registerNewItemUser()}>Cadastrar Item ao usuário</Button>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Col>
                                </Row>
                                }
                            </Col>
                        </Row>
                    </>
                    : <></>}
                </main>
            </div>
        )
    }
}

export default AdminUser