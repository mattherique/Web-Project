import React, { Component } from "react";

// import { bindAllMethods } from "./Functions";

import {
    Row,
    Col,
    Button
} from "react-bootstrap"

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { defaultText } from "./events";

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }

        defaultText(this)
        // bindAllMethods(this)
    }

    login() {
        if (!this.state.email || !this.state.password) {
            toast.error('Please, fill in all the fields', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                theme: "dark",
            });
            return
        }
        window.location.href="/admin"
        // else if(this.state.email || this.state.password){

        // }
    }

    detectFilled(event) {
        let tag = document.getElementById(event.target.id + "-text")

        if (event.target.value.length > 0) {
            tag.classList.add("fix-top")
        } else {
            tag.classList.remove("fix-top")
        }

    }

    register(){
        let loginBox = document.getElementById("login-content")
        loginBox.classList.add("hide-login")
        
        let box = document.getElementById("box")
        box.classList.add("increase-box-size")

        let registerBox = document.getElementById("register-content")
        registerBox.classList.add("show-register")
    }

    hideRegister(){
        let loginBox = document.getElementById("login-content")
        loginBox.classList.remove("hide-login")

        let box = document.getElementById("box")
        box.classList.remove("increase-box-size")

        let registerBox = document.getElementById("register-content")
        registerBox.classList.remove("show-register")
    }

    render() {
        return (
            <div className="background-image">
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    theme="black"
                />
                <div id="box" className="login-box">
                    <div id="login-content" class="initial-hide-login">
                        <Row>
                            <Col md={12}>
                                <p className="text-center login-text">Login</p>
                            </Col>
                        </Row>
                        <Row className="input-space">
                            <Col md={12} className="input-col">
                                <p id="email-text" className="input-text">Email</p>
                                <input
                                    className="input-form"
                                    id="email"
                                    value={this.state.email}
                                    onChange={(e) => {this.changeText(e, "email", this.detectFilled(e))}}
                                />
                            </Col>
                        </Row>
                        <Row className="input-space">
                            <Col md={12} className="input-col">
                                <p id="password-text" className="input-text">Password</p>
                                <input
                                    className="input-form"
                                    id="password"
                                    value={this.state.password}
                                    onChange={(e) => {this.changeText(e, "password", this.detectFilled(e))}}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} className="text-center">
                                <Button
                                    className="button-class raise"
                                    onClick={() => this.login()}
                                >Login
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} className="text-center">
                                <p>Don't have a account ? <a className="register-text register-link" onClick={this.register}>Register</a></p>
                            </Col>
                        </Row>
                    </div>
                    <div id="register-content"className="register-box-content">
                        <Row>
                            <Col md={12}>
                                <p className="text-center login-text">Registration</p>
                            </Col>
                        </Row>
                        <Row className="input-space">
                            <Col md={12} className="input-col">
                                <p id="user-register-text" className="input-text">Username</p>
                                <input
                                    className="input-form"
                                    id="user-register"
                                    value={this.state.userRegister}
                                    onChange={(e) => {this.changeText(e, "userRegister", this.detectFilled(e))}}
                                />
                            </Col>
                        </Row>
                        <Row className="input-space">
                            <Col md={12} className="input-col">
                                <p id="email-register-text" className="input-text">Email</p>
                                <input
                                    className="input-form"
                                    id="email-register"
                                    value={this.state.emailRegister}
                                    onChange={(e) => {this.changeText(e, "emailRegister", this.detectFilled(e))}}
                                />
                            </Col>
                        </Row>
                        <Row className="input-space">
                            <Col md={12} className="input-col">
                                <p id="password-register-text" className="input-text">Password</p>
                                <input
                                    className="input-form"
                                    id="password-register"
                                    value={this.state.passwordRegister}
                                    onChange={(e) => {this.changeText(e, "passwordRegister", this.detectFilled(e))}}
                                />
                            </Col>
                        </Row>
                        <Row className="input-space">
                            <Col md={12} className="input-col">
                                <p id="confirm-password-text" className="input-text">Confirm Password</p>
                                <input
                                    className="input-form"
                                    id="confirm-password"
                                    value={this.state.confirmPassword}
                                    onChange={(e) => {this.changeText(e, "confirmPassword", this.detectFilled(e))}}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} className="text-center">
                                <Button
                                    className="button-class raise"
                                    onClick={() => this.login()}
                                >Register
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} className="text-center">
                                <p>Already has an account ? <a className="login-redirect-text login-link" onClick={this.hideRegister}>Login</a></p>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginComponent