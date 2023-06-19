import React, { Component } from "react";

import {
    Row,
    Col,
    Button
} from "react-bootstrap"

import { FaBars } from "react-icons/fa"

// import {ADMIN_COL} 

import { ADMIN_COLUMNS } from "./AdminColumns.js"
class SidebarAdmin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            adminColumns: ADMIN_COLUMNS,
            sidebarState: false
        }

    }

    sidebarAction() {
        console.log(this.state)
        if (this.state.sidebarState) {
            let sidebar = document.getElementById("sidebar")
            sidebar.classList.remove("active")
        } else {
            let sidebar = document.getElementById("sidebar")
            sidebar.classList.add("active")
        }

        this.setState({
            sidebarState: !this.state.sidebarState
        })
    }

    redirectFunc(path) {
        window.location.href = path
    }

    render() {
        console.log(this.state)
        return (
            <div id="sidebar" className="sidebar">
                <Row>
                    <Col md={12} style={{ textAlign: "right" }}>
                        <a onClick={() => this.sidebarAction()}>
                            <FaBars className="sidebar-action-icon" />
                        </a>
                    </Col>
                </Row>
                <div style={{ height: "150px" }}></div>
                {this.state.adminColumns.map((value, index) => {
                    return (
                        <>
                            <a onClick={() => { this.redirectFunc(value.path) }} style={{ cursor: "pointer" }}>
                                <Row className="sidebar-module-structure">
                                    <Col md={2}>
                                        <value.icon className="sidebar-module-icon" />
                                    </Col>
                                    <Col md={10}>
                                        <p className="sidebar-module-text">{value.name}</p>
                                    </Col>
                                </Row>
                            </a>
                            <hr className="module-division" />
                        </>
                    )
                })}
            </div>
        )
    }
}

export default SidebarAdmin