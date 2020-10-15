import React, {Component} from 'react';
import {Button, Container} from "react-bootstrap";
import ShareItem from "./ShareItem";
import AddNew from "./AddNew";
import Search from "./Search";
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

class ShareList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shares : [],
            description : []
        };
        this.loadAllShares();
        this.handle = this.handle.bind(this);
        this.search = this.search.bind(this);
        this.cancel = this.cancel.bind(this);
    }
    loadAllShares(){
        var request = new XMLHttpRequest();
        let self = this;
        var acending = document.getElementById("shareOrder") != null &&  document.getElementById("shareOrder").checked;
        if(acending){
            request.open('GET', 'http://localhost:8000/shares?currency='+self.props.currency +"&ascending=true", true);
        }else{
            request.open('GET', 'http://localhost:8000/shares?currency='+self.props.currency +"&descending=true", true);

        }

        request.onload = function() {
            let data = JSON.parse(this.response);
            self.setState({"shares": data.shares, "descriptions" : data.descriptions});
        };
        request.send();
    }
    searchShares(term){
        var request = new XMLHttpRequest();
        let self = this;
        var acending = document.getElementById("shareOrder").checked;
        console.log(acending)
        request.open('GET', 'http://localhost:8000/shares?currency='+self.props.currency+'&search=' + term + "&" + (acending? "ascending=true" : "descending=true"), true);
        request.onload = function() {
            let data = JSON.parse(this.response);
            self.setState({"shares": data.shares, "descriptions" : data.descriptions});
        };
        request.send();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.currency  !== this.props.currency){
            this.loadAllShares();
        }
    }
    handle(e){
        e.preventDefault();
        console.log(document.getElementById("tickerText"));
        post("http://localhost:8000/shares",{"symbol": document.getElementById("tickerText").value })
            .then((response) =>{
                this.loadAllShares();
                document.getElementById("tickerText").value = "";
            })


    }
    cancel(e){
        e.preventDefault();
        document.getElementById("companySearch").value = "";
        this.loadAllShares();
    }
    search(e){
        e.preventDefault();
        this.searchShares(document.getElementById("companySearch").value);
    }
    render() {
        let shares = this.state.shares.map( function(x, i){
            return <ShareItem share={x} description={this.state.descriptions[i]}/>
        }.bind(this));
        return (
            <Container>
                <Search handle={this.search} cancel={this.cancel}/>
                {shares}
                <AddNew handle={this.handle}/>
            </Container>
        );
    }
}

export default ShareList;