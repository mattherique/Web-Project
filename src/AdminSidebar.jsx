import React, {Component} from "react"

import {
    Row,
    Col,
    Button
} from "react-bootstrap"

import { FaBars } from "react-icons/fa"
import { NavLink } from "react-router-dom";

import { ADMIN_COLUMNS } from "./AdminColumns.js"

class AdminSidebar extends Component {
    constructor(props){
        super(props);

        this.state = {
            adminColumns: ADMIN_COLUMNS,
            isActive: false
        }
    }

    componentDidMount(){
        console.log(this.state)
        let url = window.location.href

    }

    sidebarAction() {
        this.setState({
            sidebarState: !this.state.sidebarState
        })
    }

    render(){
        console.log(this.state)
        return (
            <div id="sidebar" className="sidebar" style={this.state.sidebarState ? {width: "220px"} : {width: "70px"}}>
                <Row>
                    <Col md={12} className="align-right">
                        <a onClick={() => this.sidebarAction()}>
                            <FaBars className="sidebar-action-icon" />
                        </a>
                    </Col>
                </Row>
                <div className="icons-space"></div>
                {this.state.adminColumns.map((value, index) => {
                    return (
                        <>
                            <NavLink
                                className={this.props.pathTo == value.path ? "active-module" : "href-style"}
                                key={index}
                                to={value.path}
                            >
                            <div className="sidebar-module-structure">
                                <div>
                                    <value.icon className="sidebar-module-icon" />
                                </div>
                                <div>
                                    <p className="sidebar-module-text">{value.name}</p>
                                </div>
                            </div>
                            </NavLink>
                            <hr className="module-division" />
                        </>
                    )
                })}
            </div>
        )
    }
}

export default AdminSidebar