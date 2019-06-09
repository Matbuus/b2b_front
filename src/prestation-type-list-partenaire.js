import React, { Component } from 'react';
import axios from "axios/index";
import {BrowserRouter, NavLink, Route, Switch} from 'react-router-dom';
import NewTypeEvent from "./new-type-event";
import NewMetier from "./new-metier";
import NewPrestationTypePartenaire from "./new-prestation-type-partenaire";



class PrestationTypeListPartenaire extends Component {


    constructor(props) {
        super(props);
        console.log("event type");
        this.state = {
            partenaireId : props.match.params.partenaireId || -1,
            type_prestations: [],
            newType: false,
        }
        axios.get('http://localhost:8000/partenaire/'+this.state.partenaireId+'/types_prestation').then(response => {
            this.setState({ type_prestations : response.data.typePrestations });
            console.log(response);
        }).catch(error => {
            console.log(error);
        });
        this.createNew = this.createNew.bind(this);
        //this.clients.forEach((client) => (console.log(client)));
    }


    createNew = () => {
        let newType = this.state.newType;
        this.setState({ newType: !newType });
        console.log(this.state.newType);
    }
    render(){

        const table = [];
        const children = [];

        if(this.state.type_prestations !== undefined) {
            console.log(this.state.type_prestations);
            this.state.type_prestations.forEach(
                (type_prestation) => (children.push(<tr>
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
        }



        console.log(this.state.type_prestations);

        return (
            <div>
                <div class="card">
                    <div class="card-header">
                        <h2> Mes types de prestations </h2>
                    </div>
                    <div class="card-content">

                { this.state.newType? <button onClick={this.createNew} class="btn btn-danger"> Annuler </button>:
                    <button onClick={this.createNew} class="btn btn-success"> Creer un nouveau </button> }
                <br/>
                <br/>
                { this.state.newType? <NewPrestationTypePartenaire partenaireId={this.state.partenaireId} />:<p></p> }
                <br/>
                {table}
                <br/>
                    </div>
                    <div class="card-footer">
                            <p> Go back</p>
                    </div>
                </div>
            </div>
        )
    }

}
export default PrestationTypeListPartenaire;

