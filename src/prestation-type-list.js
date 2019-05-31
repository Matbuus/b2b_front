import React, { Component } from 'react';
import axios from "axios/index";
import {BrowserRouter, NavLink, Route, Switch} from 'react-router-dom';
import NewTypeEvent from "./new-type-event";
import NewMetier from "./new-metier";



class PrestationTypeList extends Component {


    constructor(props) {
        super(props);
        console.log("event type");
        this.state = {
            type_prestations: [],
        }
        axios.get('http://localhost:8000/admin/type_prestation').then(response => {
            this.setState({ type_prestations : response.data.type_prestations });
        }).catch(error => {
            console.log(error);
        });

        //this.clients.forEach((client) => (console.log(client)));
    }


    render(){

        const table = [];
        const children = [];
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



        return (
            <div>
                {table}
            </div>
        )
    }

}
export default PrestationTypeList;

