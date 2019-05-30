import React, { Component } from 'react';
import axios from "axios/index";
console.log("slt");
class EventListClient extends Component {


    constructor(props) {
        super(props);
        console.log(props.match.params.clientId);
        this.state = {
            evenements: [],
            clientId : props.match.params.clientId || -1,
        }
        const rep = axios.get('http://localhost:8000/client/'+this.state.clientId+'/event')
            .then(response => {
                this.setState({ evenements : response.data.evenements });
            }).catch(error => {
                console.log(error);
            });

        //this.clients.forEach((client) => (console.log(client)));

    }

    render(){

        //console.log(this.state.evenements);
        const table = [];
        const children = [];

        this.state.evenements.forEach((evenement) => console.log(evenement));

        this.state.evenements.forEach(
            (evenement) => (children.push(<tr>
                <td> {evenement.id }</td>
                <td> { evenement.titre }</td>
                <td>{ evenement.date.date.toString() }</td>
                <td> {evenement.type.nom }</td>
            </tr>)));

        table.push(
            <div>
            <h1> Evenement(s) du client {this.state.clientId} </h1>
            <table className="table">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Titre</th>
                    <th>Date</th>
                    <th>Type</th>
                    <th>actions</th>
                </tr>
                </thead>

                <tbody>
                {children}
                </tbody>
            </table>
            </div>
        );



        return (
            <div>
                {table}
            </div>
        );
    }

}

export default EventListClient;