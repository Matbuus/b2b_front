import React, { Component } from 'react';
import axios from "axios/index";
import {BrowserRouter, NavLink, Route, Switch} from 'react-router-dom';
import NewTypeEvent from "./new-type-event";



class EveT extends Component {


    constructor(props) {
        super(props);
        console.log("event type");
        this.state = {
            eventTypes: [],
            createNew: false
        }
        axios.get('http://localhost:8000/admin/type_event').then(response => {
            this.setState({ eventTypes : response.data.type_evenements });
        }).catch(error => {
            console.log(error);
        });

        this.createNewType = this.createNewType.bind(this);
        //this.clients.forEach((client) => (console.log(client)));
    }

    delete = (eventType) => {
        // var clients = this.state.clients;
        // var index = clients.indexOf(client);
        // if (index !== -1) {
        //     clients.splice(index, 1);
        //     this.setState({clients});
        // }
        axios.delete('http://localhost:8000/admin/type_event/'+eventType.id ,{ data: {
            token: "12345",
            id: eventType.id,
        }})
            .then(res => {
                this.setState(previousState => {
                    return {
                        eventTypes: previousState.eventTypes.filter(m => m.id !== eventType.id)
                    };
                });
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
        //console.log(index);
    };


    edit = eventType => {

    };


    createNewType = () => {
        let createNew = this.state.createNew;
        createNew = !createNew;
        this.setState({createNew});
        console.log("here" + this.state.createNew);
    };

    render(){

        const table = [];
        const children = [];
        this.state.eventTypes.forEach(
            (eventType) => (children.push(<tr>
                <td> {eventType.id }</td>
                <td> {eventType.nom }</td>
                <td>
                    <button className="btn btn-danger" onClick={this.delete.bind(this,eventType)} >Supprimer</button>
                    <button className="btn btn-warning" onClick={this.edit.bind(this,eventType)} >Edit</button>
                </td>

            </tr>
                )
            ));

        table.push(
            <table className="table">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Nom</th>
                    <th>actions</th>
                </tr>
                </thead>

                <tbody>
                {children}
                </tbody>
            </table>
        );



        return (
            <div>
                <p> { this.state.createNew } </p>
                {this.state.createNew? <button onClick={this.createNewType} className="btn btn-danger"> Annuler Ajout</button> : <button onClick={this.createNewType} className="btn btn-success"> Nouveau Type </button> }

                { this.state.createNew? <NewTypeEvent /> : <br />}
                {table}
            </div>
        )
    }

}
export default EveT;

