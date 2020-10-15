import React, {Component} from 'react';
import {Form} from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";

class CurrencySelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currencies : []
        }
    }

    componentDidMount() {
        this.getCurrencies();
    }
    getCurrencies(){
        var request = new XMLHttpRequest();
        let self = this;
        request.open('GET', 'http://localhost:8000/shares/currency', true);
        request.onload = function() {
            let data = JSON.parse(this.response);
            self.setState({"currencies": data});
        };
        request.send();
    }
    render() {
        const curr = this.state.currencies.map((currency) => {
            return (<option>{currency}</option>);
        });
        return (
            <Form.Control as="select" onChange={this.props.handler} id="currencySelect">
                {curr}
            </Form.Control>
        );
    }
}

export default CurrencySelector;