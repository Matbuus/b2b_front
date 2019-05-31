import React, { Component } from 'react';
import axios from "axios/index";
import L from "leaflet";
import Places from "places.js";





const mapStyle = {
    marginLeft: '30%',
    marginRight : '30%',
    width: '50%',
    height: '500px'
};


class EventShow extends Component {

    componentDidMount(prevProps) {
        fetch('http://localhost:8000/client/'
            + this.state.clientId +
            /event/
            + this.state.eventId)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result.items
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
            axios.get('http://localhost:8000/client/'
            + this.state.clientId +
            /event/
            + this.state.eventId)
            .then(response => {
                console.log(response);
               this.setState({evenement: response.data.evenement});
               this.setState({lat: response.data.evenement.lat});
               this.setState({lng: response.data.evenement.lng});
               this.setState({date: response.data.evenement.date.date.toString() });
                this.setState({address: response.data.evenement.address});
            }).catch(error => {
                console.log(error);
            });



    }
    constructor(props) {
        super(props);
        this.state = {
            clientId : props.match.params.clientId,
            eventId : props.match.params.eventId,
            evenement: 'a',
            lat: 0,
            lng: 0,
            address: '',
            map: false,
            date: '',

        }
        console.log("id client " + this.state.clientId);
        console.log("id event " + this.state.eventId);

        //this.clients.forEach((client) => (console.log(client)));

    }

    render(){


        console.log(this.state);
        const table = [];
        let evenement = this.state.evenement;
        let mapDone = false;



        return (
            <div>
                <div class="card">
                <div class="card-header"> <h1> Evenement en détails </h1></div>
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
                        <td>{ this.state.date }</td>
                    </tr>
                    </tbody>
                </table>
                    <h3> Localiser l'evenement ! </h3>
                <div id="map" style={mapStyle} data-lat={ evenement.lat } data-lng={ evenement.lng }> </div>
                </div>
                    <div class="card-footer">
                        <p> Here </p>
                    </div>
                </div>
            </div>
        );
    }

    componentDidUpdate(){
        if(this.state.lat !== 0 && this.state.lng !== 0 && document.querySelector('#map') !== null && this.state.map == false){
            console.log("mapping");
            let map = document.querySelector('#map');
            console.log("before");
            let icon = L.icon({
                iconUrl:'/images/marker-icon.png',
            });
            let center = [this.state.lat, this.state.lng];
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

export default EventShow;

