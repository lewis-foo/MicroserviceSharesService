import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


class AddNew extends Component {
    render() {
        return (
            <Card className="align-items-center">
                <Form inline className="p-2">
                    <Form.Group controlId="formBasicEmail" className="mr-2">
                        <Form.Label>Ticker</Form.Label>
                    </Form.Group>
                    <Form.Group>

                        <Form.Control type="text" placeholder="Company Ticker"  id="tickerText"/>

                        <Button variant="primary" type="submit" onClick={this.props.handle}>
                            Submit
                        </Button>
                    </Form.Group>




                </Form>
                <a href="https://iexcloud.io">Data provided by IEX Cloud</a>
            </Card>
        );
    }
}

export default AddNew;