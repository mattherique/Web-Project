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

// import 'bootstrap/dist/css/bootstrap.min.css';

class AdminUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userRegister: false,
            listUsers: true,
            users: []
        }

        defaultText(this)
    }

    componentDidMount(){
        this.getUsers()
    }

    changeTab(page){
        this.setState({
            userTab: page === "userTab",
            userRegister: page === "registerUser",
            state: "",
            city: "",
            district: "",
            accomplish: "",
            numberaddress: "",
            address: "",
            cep: "",
            phone: "",
            email: "",
            name: ""
        })
    }

    detectFilled(event) {
        let tag = document.getElementById(event.target.id + "-text")

        if (event.target.value.length > 0) {
            tag.classList.add("fix-top")
        } else {
            tag.classList.remove("fix-top")
        }

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

                setInterval(() => this.setState({
                    address: response["info"]["logradouro"],
                    district: response["info"]["bairro"],
                    city: response["info"]["localidade"],
                    state: response["info"]["uf"]
                }), 200
                )
            })
        }
    }

    render() {
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
                                onClick={() => this.changeTab("userTab")}
                            >Listagem
                            </Button>
                            <Button
                                className={this.state.userRegister ? "button-tab-active" : "button-tab-inactive"}
                                onClick={() => this.changeTab("registerUser")}
                            >Cadastro
                            </Button>
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
                                    <p id="numberaddress-text" className="register-input-text">Número</p>
                                    <input
                                        className="register-input"
                                        id="numberaddress"
                                        value={this.state.numberaddress}
                                        onChange={(e) => {this.changeText(e, "numberaddress", detectFilled(e))}}
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
                    :
                    <>
                        {
                            this.state.users.map((value, index) => {
                                return (
                                    <>
                                        <Row>
                                            <Col md={6}>
                                                <p>{value.nome}</p>
                                            </Col>
                                            <Col md={6}>
                                                <p>{value.email}</p>
                                            </Col>
                                        </Row>
                                    </>
                                )
                            })
                        }
                    </>}
                </main>
            </div>
        )
    }
}

export default AdminUser