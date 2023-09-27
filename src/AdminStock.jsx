import React, { Component } from "react";

import {
    Row,
    Col,
    Button
} from "react-bootstrap"

import { newRequest } from "./request.js";

class AdminStock extends Component {
    constructor(props) {
        super(props);

        this.state = {
        }

    }

    componentDidMount(){
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

        })
    }

    render() {
        return (
            <div className="container">
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