import React, { Component } from "react";

import {
    Row,
    Col
} from "react-bootstrap"

import AdminSidebar from "./AdminSidebar.jsx";

class AdminStock extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }

    }

    render() {
        return (
            <div className="container">
                <AdminSidebar pathTo="/admin-stock"/>
                <main>
                    <Row>
                        <Col md={12}>
                            <h2 className="title-style">Estoque</h2>
                        </Col>
                    </Row>
                </main>
            </div>
        )
    }
}

export default AdminStock