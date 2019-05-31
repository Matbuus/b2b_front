import React, { Component } from 'react';
import axios from "axios/index";
import {NavLink} from 'react-router-dom';
import NewPrestationType from "./new-prestation-type";




const mapStyle = {
    marginLeft: '30%',
    marginRight : '30%',
    width: '50%',
    height: '500px'
};


class MetierShow extends Component {

    componentDidMount() {

        const rep = axios.get('http://localhost:8000/admin/metier/'
            + this.state.metierId)
            .then(response => {
                console.log(response);
                console.log(response.data.metier);
                this.setState({titre: response.data.metier.titre});
                this.setState({typesPrestations: response.data.typesPrestations });
                console.log(response.data.typesPrestations);
            }).catch(error => {
                console.log(error);
            });

    }
    constructor(props) {
        super(props);
        this.state = {
            metierId : props.match.params.metierId,
            titre : '',
            typesPrestations : []
        }
        console.log(this.state.metierId);
        //this.clients.forEach((client) => (console.log(client)));

    }

    render(){


        console.log(this.state.titre);
        console.log(this.state.typesPrestations);

        const table = [];
        const children = [];
        this.state.typesPrestations.forEach(
            (type_prestation) => (children.push(
                    <tr>
                        <td> {type_prestation.id }</td>
                        <td> {type_prestation.nomType }</td>
                        <td> {type_prestation.typeEvent.nom} </td>
                        <td> {type_prestation.description }</td>
                        <td> {type_prestation.tarifPublic }</td>
                    </tr>
                )
            ));

        table.push(
            <table className="table">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Nom</th>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Tarif Public</th>
                </tr>
                </thead>

                <tbody>
                {children}
                </tbody>
            </table>
        );



        return (
            <div>
                <div class="card">
                    <div class="card-header"> <h1> Metier {this.state.titre} </h1></div>
                    <div class="card-body">
                        <h2> Les types de prestations réalisables pour ce métier</h2>
                        {table}
                    </div>
                    <div class="card-footer">
                        <button class="btn text-success">Ajouter un type de prestation </button>
                        <NewPrestationType metierId={this.state.metierId} />
                        <NavLink to="/metiers" className="nav-link"> > Retour à la liste des metiers</NavLink>

                    </div>
                </div>
            </div>
        )
    }

}

export default MetierShow;

