
import logo from './logo512.png';
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';
import {Navbar, Nav, NavDropdown, Form, FormControl, Button, Container} from "react-bootstrap";

import ShareList from "./ShareList";
import InputGroup from "react-bootstrap/InputGroup";
import CurrencySelector from "./CurrencySelector";
import * as React from "react";


class App extends React.Component {
    constructor() {
        super();
        this.state = {
            currency : "AED"
        };
        this.handler = this.handler.bind(this);
    }
    handler(){
        this.setState( {"currency":document.getElementById("currencySelect").value.replace(/ .*/,'')});
    }
    render() {
        return (
            <div className="App">
                <Navbar bg="dark" variant="dark"  className="justify-content-between">
                    <Navbar.Brand href="#home">
                        Stock Market Exchange
                    </Navbar.Brand>
                    <Form inline className=" mr-sm-2">
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1">Currency</InputGroup.Text>
                            </InputGroup.Prepend>
                            <CurrencySelector  handler={this.handler} />
                        </InputGroup>
                    </Form>
                </Navbar>
                <br />
                <ShareList currency={this.state.currency}/>

            </div>
        );
    }
}

export default App;


