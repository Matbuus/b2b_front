import React, { Component } from 'react';
import axios from "axios/index";





const mapStyle = {
    marginLeft: '30%',
    marginRight : '30%',
    width: '50%',
    height: '500px'
};


class EventShow extends Component {

    componentDidMount() {

        const rep = axios.get('http://localhost:8000/client/'
            + this.state.clientId +
            /event/
            + this.state.eventId)
            .then(response => {
               this.setState({evenement: response.data.evenement});
            }).catch(error => {
                console.log(error);
            });

    }
    constructor(props) {
        super(props);
        this.state = {
            clientId : props.match.params.clientId,
            eventId : props.match.params.eventId,
            evenement: 'a'

        }
        console.log("id client " + this.state.clientId);
        console.log("id event " + this.state.eventId);

        //this.clients.forEach((client) => (console.log(client)));

    }

    render(){


        console.log(this.state.evenement);
        const table = [];
        let evenement = this.state.evenement;
        console.log(evenement.lat);

        return (
            <div>
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
                        <td>{ evenement.address }</td>
                    </tr>
                    <tr>
                        <th>Localisation</th>
                        <td>{ evenement.lat } ; { evenement.lng }</td>
                    </tr>
                    <tr>
                        <th>Date</th>
                        <td>{ evenement.id}</td>
                    </tr>
                    </tbody>
                </table>
                <div id="map" style={mapStyle} data-lat={ evenement.lat } data-lng={ evenement.lng }> </div>
            </div>
        )
    }

}

export default EventShow;

