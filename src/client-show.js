import React, { Component } from 'react';
import axios from "axios/index";
import {NavLink} from 'react-router-dom';
import NewPrestationType from "./new-prestation-type";
import Cookies from 'js-cookie';





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
                        <h2> Vos evenements  </h2>
                    </div>
                    <div class="card-footer">
                        <button class="btn text-danger">Supprimer mon compte</button>
                    </div>
                </div>
            </div>
        )
    }

}

export default ClientShow;

