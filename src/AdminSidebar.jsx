import React, {Component} from "react"

import {
    Row,
    Col
} from "react-bootstrap"

import { FaBars } from "react-icons/fa"
import { BsFillArrowRightCircleFill } from "react-icons/bs"
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
    }

    sidebarAction() {
        this.setState({
            sidebarState: !this.state.sidebarState
        })
    }

    render(){
        return (
            <>
            <div id="sidebar" className="sidebar" style={document.body.clientWidth < 767 ? this.state.sidebarState ? {minWidth:"220px", width: "220px"} : {minWidth:"0px", width: "0px"} : this.state.sidebarState ? {width: "220px"} : {width: "70px"}}>
                {document.body.clientWidth > 767 ? 
                <Row>
                    <Col md={12} className="align-right">
                        <a onClick={() => this.sidebarAction()}>
                            <FaBars className="sidebar-action-icon" />
                        </a>
                    </Col>
                </Row>
                : <></>}
                <div className="icons-space"></div>
                {this.state.adminColumns.map((value, index) => {
                    return (
                        <>
                            <NavLink
                                className={this.props.pathTo === value.path ? "active-module" : "href-style"}
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
            <main>
                {document.body.clientWidth < 767 ? 
                <Row>
                    <Col md={12} className="side-cell-row">
                        <a onClick={() => this.sidebarAction()}>
                            <BsFillArrowRightCircleFill className="side-cell-icon" style={this.state.sidebarState ? {transform: "rotate(-0.5turn)"} : {transform: "rotate(0turn)"}}/>
                        </a>
                    </Col>
                </Row> 
                : <></>}
                {this.props.children}
            </main>
            </>
        )
    }
}

export default AdminSidebar