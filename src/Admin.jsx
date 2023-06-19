import React, { Component } from "react";

import {
    Row,
    Col,
    Button
} from "react-bootstrap"
import SidebarAdmin from "./SidebarAdmin";

class Admin extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }

    }

    render() {
        return (
            <div className="background-admin">
                <SidebarAdmin/>
            </div>
        )
    }
}

export default Admin