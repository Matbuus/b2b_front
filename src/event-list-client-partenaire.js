import React, { Component } from 'react';
import axios from "axios/index";
import Cookies from "js-cookie";
import EventCreate from "./event-create";
import {NavLink} from "react-router-dom";


class EventListPartenaire extends Component {


    constructor(props) {
        super(props);
        this.state = {
            evenements: [],
            partenaireId : props.match.params.partenaireId || -1,
            sortedEventsIndexes: [],
            distances: [],
            createNewEventBool: false,
        }
        //if(this.state.parenaireId == Cookies.get('userId') || Cookies.get('userId') == 0){
            axios.get('http://localhost:8000/partenaire/'+this.state.partenaireId+'/events')
                .then(response => {
                    console.log(response.data);
                    this.setState({ evenements : response.data.evenements });
                    this.setState({ sortedEventsIndexes : response.data.sortedEventsIndex });
                    this.setState({ distances : response.data.distanceEvenement });
                }).catch(error => {
                console.log(error);
            });
       // }
    }


    showEventParams = evenement => {
        let params =  {
            eventId: evenement.id,
            clientId: evenement.client.id
        };
        return params;
    }

    propositionEventParams = evenement => {
        let params =  {
            eventId: evenement.id,
            partenaireId: this.state.partenaireId
        };
        return params;
    }






    render(){

        //console.log(this.state.evenements);
        const table = [];
        const children = [];


        if(this.state.partenaireId !== Cookies.get('userId') && Cookies.get('userId') != 0)
            return <h1> Vous n'avez pas l'accès </h1>;

            if(this.state.evenements !== undefined && this.state.sortedEventsIndexes !== undefined && this.state.distances !== undefined){
                for(var i =0 ; i < this.state.evenements.length; i++) {
                    if(this.state.evenements[this.state.sortedEventsIndexes[i]] !== undefined && this.state.distances[this.state.sortedEventsIndexes[i]]){
                    let evenement = this.state.evenements[this.state.sortedEventsIndexes[i]];
                    if(evenement.etatEvenement.titre !== 'Recherche prestataires')
                        continue;
                    children.push(<tr>
                        <td> {evenement.id}</td>
                        <td> {evenement.titre}</td>
                        <td>{evenement.date.date.toString().slice(0, 16)}</td>
                        <td> {evenement.type.nom}</td>
                        <td> {this.state.distances[this.state.sortedEventsIndexes[i]]}</td>
                        <td>
                            <NavLink to={'/client/'+ evenement.client.id + '/event/' + evenement.id}
                                     params={this.showEventParams(evenement)}
                                     className="btn btn-info">Show</NavLink>

                            <NavLink to={'/'+this.state.partenaireId+'/events/'+ evenement.id + '/proposition'}
                                     params={this.propositionEventParams(evenement)}
                                     className="btn text-success">Proposer prestation</NavLink>

                        </td>
                    </tr>);

                    }
                }
            }



        table.push(
            <div>
                <table className="table">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Titre</th>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Distance (km) </th>
                        <th>Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    {children}
                    </tbody>
                </table>
            </div>
        );



        return (
            <div className="card">
                <div className="card-header">
                <h1> Evenement(s) disponible(s) {this.state.clientId} </h1>
                </div>
                <div className="card-body">
                {table}
                </div>
                <div className="card-footer"> Retour </div>
            </div>
        );
    }

}

export default EventListPartenaire;