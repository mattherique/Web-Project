import React, { Component } from "react";

import {
    Row,
    Col,
    Button
} from "react-bootstrap"
import SidebarAdmin from "./SidebarAdmin";

class AdminUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userRegister:true
        }

    }

    changeTab(page){
        this.setState({
            userTab: page == "userTab",
            userRegister: page == "registerUser"
        })
    }

    render() {
        return (
            <div className="background-admin">
                <SidebarAdmin/>
                <Row style={{display:"flex"}}>
                    <div style={{width:"20%"}}></div>
                    <div className="backckground-admin" style={{width:"60%"}}>
                        <Row>
                            <Col md={12}>
                                <h2 style={{fontSize:"40px"}}>Usuários</h2>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Button
                                className={this.state.userRegister ? "button-tab-active" : "button-tab-inactive"}
                                onClick={() => this.changeTab("registerUser")}
                                >Cadastrar
                                </Button>
                                <Button
                                className={this.state.userTab ? "button-tab-active" : "button-tab-inactive"}
                                onClick={() => this.changeTab("userTab")}
                                >Usuários
                                </Button>
                            </Col>
                        </Row>
                        <hr className="tab-bar"/>
                        {this.state.userRegister ?
                        <>
                            <Row className="input-space">
                                <Col md={12} className="input-col">
                                    <p id="email-text" className="input-text">Nome</p>
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
                                    <p id="password-text" className="input-text">Email</p>
                                    <input
                                        className="input-form"
                                        id="password"
                                        value={this.state.password}
                                        onChange={(e) => {this.changeText(e, "password", this.detectFilled(e))}}
                                    />
                                </Col>
                            </Row>
                        </>
                        :
                        <>
                        </>}
                    </div>
                </Row>
            </div>
        )
    }
}

export default AdminUser