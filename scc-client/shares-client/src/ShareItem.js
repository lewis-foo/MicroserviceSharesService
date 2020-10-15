import React, {Component} from 'react';
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import Accordion from "react-bootstrap/Accordion";
import {Button, Container} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";

async function post(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data)
    });
    return await response.json();
}

class ShareItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            share : props.share,
            showModal : false
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }
    componentDidMount() {

    }

    purchaseClicked(e){
        let self = this;

        post("http://localhost:8000/shares/purchase", {"symbol": this.props.share.company_symbol, "amount": parseInt(document.getElementById("numberOfShares").value)})
            .then((shareR)=>{
                console.log(shareR)
                self.setState({share:shareR , showModal: false});
            });
        e.preventDefault();
    }
    render() {

        return (
            <Card className="align-items-center">
                <br/>
                <Card.Title>{this.props.share.company_name}</Card.Title>
                <Card.Body>

                    <ListGroup horizontal>
                        <ListGroup.Item variant="success">{this.props.share.company_symbol}</ListGroup.Item>
                        <ListGroup.Item variant="danger">{this.state.share.share_amount}</ListGroup.Item>
                        <ListGroup.Item variant="info">{this.props.share.share_price.currency.toUpperCase() + " " + Math.round(this.props.share.share_price.value)}</ListGroup.Item>
                    </ListGroup>

                    <Accordion>
                        <Card>
                            <Card.Header>
                                <Button onClick={() => this.setState({showModal: !this.state.showModal})}>Purchase</Button>{' '}
                                <Modal
                                    size="lg"
                                    show={this.state.showModal}
                                    onHide={() => this.setState({showModal:false})}
                                    aria-labelledby="example-modal-sizes-title-sm"
                                >
                                    <Modal.Header closeButton>
                                        <Modal.Title id="example-modal-sizes-title-sm">
                                            Purchase Shares In {this.props.share.company_name}
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <form>
                                            <div className="form-group">
                                                <label htmlFor="numberOfShares">Number Of Shares</label>
                                                <input type="number" className="form-control" id="numberOfShares"
                                                       aria-describedby="numberHelp" placeholder="Enter number of shares" required/>
                                                    <small id="numberHelp" className="form-text text-muted">Can't be negative of over the total volume</small>
                                            </div>

                                            <Button onClick={this.purchaseClicked.bind(this)} type="submit" className="btn btn-primary">Submit</Button>
                                        </form>
                                    </Modal.Body>
                                </Modal>
                                <Accordion.Toggle as={Button} variant="success" eventKey="0">
                                    About
                                </Accordion.Toggle>
                            </Card.Header>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    <Card.Text className="text-justify">{this.props.description}</Card.Text>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </Card.Body>
            </Card>
        );
    }
}

export default ShareItem;