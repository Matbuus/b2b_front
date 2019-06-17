import React, { Component } from 'react';
import axios from "axios/index";
import L from "leaflet";
import Places from "places.js";
import Cookies from "js-cookie";
import {NavLink} from 'react-router-dom';




const mapStyle = {
    marginLeft: '30%',
    marginRight : '30%',
    width: '50%',
    height: '500px'
};


class EventShow extends Component {

    componentDidMount(prevProps) {
            axios.get('http://localhost:8000/client/'
            + this.state.clientId +
            /event/
            + this.state.eventId)
            .then(response => {
               this.setState({evenement: response.data.evenement});
               this.setState({lat: response.data.evenement.lat});
               this.setState({lng: response.data.evenement.lng});
               this.setState({date: response.data.evenement.date.date.toString() });
                this.setState({address: response.data.evenement.address});
            }).catch(error => {
                console.log(error);
            });
        if(this.state.clientId == Cookies.get('userId') && Cookies.get('userId') != 0){
            axios.get('http://localhost:8000/client/'
                + this.state.clientId +
                /event/
                + this.state.eventId
            +   '/liste')
                .then(response => {
                    this.setState({listePrestations: response.data.listeProposer});
                    this.setState({listeAccepter: response.data.listeAccepter});
                    this.setState({listeRefuser: response.data.listeRefuser});
                    this.setState({listeTermine: response.data.listeTermine});
                }).catch(error => {
                console.log(error);
            });
        }



    }
    constructor(props) {
        super(props);
        this.state = {
            listePrestations: [],
            listeRefuser: [],
            listeAccepter: [],
            listeTermine: [],
            clientId : props.match.params.clientId,
            eventId : props.match.params.eventId,
            evenement: 'a',
            lat: 0,
            lng: 0,
            address: '',
            map: false,
            date: '',
            rating: 0,

        };
        this.goBack = this.goBack.bind(this);
        this.changer = this.changer.bind(this);
        this.terminer = this.terminer.bind(this);
        //this.clients.forEach((client) => (console.log(client)));
        this.changeRating = this.changeRating.bind(this);

    }


    changeRating(rating ) {
        console.log(rating)
    }

    terminer = () => {

        axios.get('http://localhost:8000/client/'
            + this.state.clientId +
            /event/
            + this.state.eventId
            +'/terminer')
            .then(response => {
                console.log(response);
            }).catch(error => {
            console.log(error);
        });
        window.location.reload();

    }

    changer = (prestation, action) => {
        axios.get('http://localhost:8000/client/'
            + this.state.clientId +
            /event/
            + this.state.eventId
        +'/liste/'+ prestation.id + '/' + action)
            .then(response => {
                console.log(response);
            }).catch(error => {
            console.log(error);
        });
        window.location.reload();
    };
    goBack = () => {
        console.log("BACK");
        this.props.history.goBack();
    };

    getParams = (prestation) => {
       let params =  {
           prestationId: prestation.id,
           clientId: this.state.clientId,
           eventId: this.state.eventId,
       }
       console.log(params);
       return params;

    };
    render(){


        let evenement = this.state.evenement;
        let mapDone = false;
        if(evenement.date == undefined)
            return null;

        const table = [];
        const children = [];
        this.state.listeTermine.forEach(
            (prestation) => (children.push(
                    <tr style={{color : 'green'}}>
                        <td> {prestation.evenement.titre } </td>
                        <td> { prestation.dateDebut.date.toString().slice(0,16) }</td>
                        <td> {prestation.dateFin.date.toString().slice(0,16)} </td>
                        <td> { prestation.typePrestation.nomType }</td>
                        <td> {prestation.etatPrestation.titre }</td>
                        <td>
                            <NavLink to={'/client/'+ this.state.clientId + '/event/'+ this.state.eventId  + '/prestation/'+ prestation.id}
                                     params={this.getParams(prestation)}
                                     className="btn btn-info">Show</NavLink>
                        </td>
                    </tr>
                )
            ));

        this.state.listeAccepter.forEach(
            (prestation) => (children.push(
                    <tr style={{color : 'blue'}}>
                        <td> {prestation.evenement.titre } </td>
                        <td> { prestation.dateDebut.date.toString().slice(0,16) }</td>
                        <td> {prestation.dateFin.date.toString().slice(0,16)} </td>
                        <td> { prestation.typePrestation.nomType }</td>
                        <td> {prestation.etatPrestation.titre }</td>
                        <td>
                            <button type="button" class="btn btn-success" onClick={() => { if (window.confirm('Êtes vous sûr de vouloir accepter?')) this.changer(prestation,'confirmer') } } >
                                Accepter
                            </button>
                            <NavLink to={'/client/'+ this.state.clientId + '/event/'+ this.state.eventId  + '/prestation/'+ prestation.id}
                                     params={this.getParams(prestation)}
                                     className="btn btn-info">Show</NavLink>
                        </td>
                    </tr>
                )
            ));

        this.state.listePrestations.forEach(
            (prestation) => (children.push(
                    <tr>
                        <td> {prestation.evenement.titre } </td>
                        <td> { prestation.dateDebut.date.toString().slice(0,16) }</td>
                        <td> {prestation.dateFin.date.toString().slice(0,16)} </td>
                        <td> { prestation.typePrestation.nomType }</td>
                        <td> {prestation.etatPrestation.titre }</td>
                        <td>
                            <button type="button" class="btn btn-danger" onClick={() => { if (window.confirm('Êtes vous sûr de vouloir refuser?')) this.changer(prestation,'refuser') } } >
                                Refuser
                            </button>
                            <button type="button" class="btn btn-success" onClick={() => { if (window.confirm('Êtes vous sûr de vouloir accepter?')) this.changer(prestation,'confirmer') } } >
                                Accepter
                            </button>
                            <NavLink to={'/client/'+ this.state.clientId + '/event/'+ this.state.eventId  + '/prestation/'+ prestation.id}
                                     params={this.getParams(prestation)}
                                     className="btn btn-info">Show</NavLink>
                        </td>
                    </tr>
                )
            ));

        this.state.listeRefuser.forEach(
            (prestation) => (children.push(
                    <tr style={{color : 'red'}}>
                        <td> {prestation.evenement.titre } </td>
                        <td> { prestation.dateDebut.date.toString().slice(0,16) }</td>
                        <td> {prestation.dateFin.date.toString().slice(0,16)} </td>
                        <td> { prestation.typePrestation.nomType }</td>
                        <td> {prestation.etatPrestation.titre }</td>
                        <td>
                            <button type="button" class="btn btn-success" onClick={() => { if (window.confirm('Êtes vous sûr de vouloir accepter?')) this.changer(prestation,'confirmer') } } >
                                Accepter
                            </button>
                        </td>
                    </tr>
                )
            ));

        if(this.state.clientId == Cookies.get('userId') && Cookies.get('userId') != 0) {
            table.push(<div>
                    <h2> Liste des prestations pour cet evenement </h2>
                    <br/> <br/>
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Evenement</th>
                            <th>Date de début</th>
                            <th>Date de fin</th>
                            <th>Type de prestation</th>
                            <th>Etat de la prestation</th>
                            <th>Actions</th>
                        </tr>
                        </thead>

                        <tbody>
                        {children}
                        </tbody>
                    </table>
                { (this.state.listeAccepter.length == 0 && this.state.listeTermine.length > 0 && evenement.etatEvenement.titre !== 'Termine')? <button class="btn btn-info" onClick={this.terminer}> Marquer evenement comme terminé </button>: <p> </p> }
                </div>
            );
        }

        return (
            <div>
                <div class="card">
                <div class="card-header">
                    <h1> Evenement en détails </h1>
                    <h2 class="text-info"> Etat de l'evenement : {evenement.etatEvenement.titre } </h2>

                </div>
                <div class="card-body">
                <table class="table">
                    <tbody>
                    <tr>
                        <th>Id</th>
                        <td>{ evenement.id }</td>
                    </tr>
                    <tr>
                        <th>Titre</th>
                        <td>{ evenement.titre }</td>
                    </tr>
                    <tr>
                        <th>Addresse</th>
                        <td>{ this.state.address }</td>
                    </tr>
                    <tr>
                        <th>Localisation</th>
                        <td>{ evenement.lat } ; { evenement.lng }</td>
                    </tr>
                    <tr>
                        <th>Date</th>
                        <td>{ evenement.date.date.toString().slice(0,16) }</td>
                    </tr>
                    </tbody>
                </table>
                    <h3> Localiser l'evenement ! </h3>

                <div id="map" style={mapStyle} data-lat={ evenement.lat } data-lng={ evenement.lng }> </div>
                    <br/> <br/>
                    {table}
                </div>
                    <div class="card-footer">
                        <button class="btn"onClick={this.goBack}> Retour </button>
                    </div>
                </div>
            </div>
        );
    }

    componentDidUpdate(){
        if(this.state.lat !== 0 && this.state.lng !== 0 && document.querySelector('#map') !== null && this.state.map == false){
            let map = document.querySelector('#map');
            let icon = L.icon({
                iconUrl:'/images/marker-icon.png',
            });
            let center = [this.state.lat, this.state.lng];
            map = L.map('map').setView(center, 15 );
            this.setState({map: true});
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 20,
                minZoom: 10,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
            L.marker(center, {icon: icon}).addTo(map);

        }
    }

}

export default EventShow;

