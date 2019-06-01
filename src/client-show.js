import React, { Component } from 'react';
import axios from "axios/index";
import {NavLink} from 'react-router-dom';
import NewPrestationType from "./new-prestation-type";
import Cookies from 'js-cookie';
import L from "leaflet";



const mapStyle = {
    marginLeft: '30%',
    marginRight : '30%',
    width: '50%',
    height: '500px'
};

class ClientShow extends Component {

    componentDidMount() {
        if(this.state.clientId == Cookies.get('userId'))
            axios.get('http://localhost:8000/cclient/'
            + this.state.clientId)
            .then(response => {
                this.setState({client: response.data.client});
                console.log(this.client);
            }).catch(error => {
                console.log(error);
            });

    }
    constructor(props) {
        super(props);


        console.log(props);
        this.state = {
                client: '',
                clientId : props.match.params.clientId,
                map: false,
        }
        //this.clients.forEach((client) => (console.log(client)));

    }



    render(){


        console.log(Cookies.get('userId'));
        console.log(this.state.client);

        if(this.state.clientId !== Cookies.get('userId'))
            return <h1> Vous n'avez pas l'accès </h1>;
        return (
            <div>
                <div class="card">
                    <div class="card-header"> <h1> Votre Profil </h1></div>
                    <div class="card-body">
                        <h2> Nom : {this.state.client.nom} </h2>
                        <h2> Prenom : {this.state.client.prenom} </h2>
                        <h2> Addresse: {this.state.client.address} </h2>
                        <h2> Vos evenements  </h2>

                        <div id="map" style={mapStyle} data-lat={ this.state.client.lat } data-lng={ this.state.client.lng }> </div>
                    </div>
                    <div class="card-footer">
                        <button class="btn text-danger">Supprimer mon compte</button>
                    </div>
                </div>
            </div>
        )
    }

    componentDidUpdate(){
        if(this.state.client.lat !== 0 && this.state.client.lng !== 0 && document.querySelector('#map') !== null && this.state.map == false){
            console.log("mapping");
            let map = document.querySelector('#map');
            console.log("before");
            let icon = L.icon({
                iconUrl:'/images/marker-icon.png',
            });
            let center = [this.state.client.lat, this.state.client.lng];
            console.log(center);
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

export default ClientShow;

