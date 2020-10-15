import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class Search extends Component {
    render() {
        return (
            <Card className="align-items-center">
                <Form inline className="p-2">
                    <Form.Group controlId="formBasicEmail" className="mr-2">
                        <Form.Label>Name</Form.Label>
                    </Form.Group>
                    <Form.Group>

                        <Form.Control type="text" placeholder="Search"  id="companySearch"/>

                        <Button variant="primary" type="submit" onClick={this.props.handle}>
                            Submit
                        </Button>
                        <Button variant="danger" type="submit" onClick={this.props.cancel}>
                            Clear
                        </Button>
                        <Form.Group controlId="formBasicCheckbox" className="ml-2">
                            <Form.Check type="checkbox" label="Highest first?" id = "shareOrder"/>
                        </Form.Group>
                    </Form.Group>




                </Form>
            </Card>
        );
    }
}

export default Search;