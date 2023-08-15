import React, { Component } from "react";

import {
    Row,
    Col,
    Button
} from "react-bootstrap"

import AdminSidebar from "./AdminSidebar.jsx";
import { newRequest } from "./request.js";

class AdminStock extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }

    }

    testRequest(){
        let config = {
            method:"GET",
            url:"/admin/list-users"
        }

        let form = {
            teste: true
        }

        newRequest(config, form).then((r) => {
            console.log(r)
        })
    }

    render() {
        return (
            <div className="container">
                <AdminSidebar pathTo="/admin-stock"/>
                <main>
                    <Row>
                        <Col md={12}>
                            <h2 className="title-style">Estoque</h2>
                            <Button onClick={() => this.testRequest()}>TESTAR REQUEST</Button>
                        </Col>
                    </Row>
                </main>
            </div>
        )
    }
}

export default AdminStock 