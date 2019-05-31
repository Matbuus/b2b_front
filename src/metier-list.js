import React, { Component } from 'react';
import axios from "axios/index";
import {BrowserRouter, NavLink, Route, Switch} from 'react-router-dom';
import NewTypeEvent from "./new-type-event";
import NewMetier from "./new-metier";



class MetierList extends Component {


    constructor(props) {
        super(props);
        console.log("event type");
        this.state = {
            metiers: [],
            createNew: false
        }
        axios.get('http://localhost:8000/admin/metier').then(response => {
            this.setState({ metiers : response.data.metiers });
        }).catch(error => {
            console.log(error);
        });

        this.createNewMetier = this.createNewMetier.bind(this);
        //this.clients.forEach((client) => (console.log(client)));
    }

    delete = (metier) => {
        // var clients = this.state.clients;
        // var index = clients.indexOf(client);
        // if (index !== -1) {
        //     clients.splice(index, 1);
        //     this.setState({clients});
        // }
        axios.delete('http://localhost:8000/admin/metier/'+metier.id ,{ data: {
            token: "12345",
            id: metier.id,
        }})
            .then(res => {
                this.setState(previousState => {
                    return {
                        metiers: previousState.metiers.filter(m => m.id !== metier.id)
                    };
                });
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
        //console.log(index);
    };


    edit = metier => {

    };


    createNewMetier = () => {
        let createNew = this.state.createNew;
        createNew = !createNew;
        this.setState({createNew});
        console.log("here" + this.state.createNew);
    };

    render(){

        const table = [];
        const children = [];
        this.state.metiers.forEach(
            (metier) => (children.push(<tr>
                <td> {metier.id }</td>
                <td> {metier.titre }</td>
                <td>
                    <button className="btn btn-danger" onClick={this.delete.bind(this,metier)} >Supprimer</button>
                    <button className="btn btn-warning" onClick={this.edit.bind(this,metier)} >Edit</button>
                    <NavLink to={'/metier/'+metier.id} params={{ metierId: metier.id }} className="btn btn-info">Show</NavLink>
                </td>

            </tr>
                )
            ));

        table.push(
            <table className="table">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Titre</th>
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
                {this.state.createNew? <button onClick={this.createNewMetier} className="btn btn-danger"> Annuler Ajout</button> : <button onClick={this.createNewMetier} className="btn btn-success"> Nouveau Type </button> }

                { this.state.createNew? <NewMetier /> : <br />}
                {table}
            </div>
        )
    }

}
export default MetierList;

