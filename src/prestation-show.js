import React, { Component } from 'react';
import axios from "axios/index";
import {NavLink} from 'react-router-dom';
import NewPrestationType from "./new-prestation-type";
import StarRatings from 'react-star-ratings';





class PrestationShow extends Component {

    componentDidMount() {

        const rep = axios.get('http://localhost:8000/client/'
            + this.state.clientId + '/event/' + this.state.eventId + '/prestation/' + this.state.prestationId)
            .then(response => {
                console.log(response);
                this.setState({prestation: response.data.prestation});
                this.setState({rating: response.data.prestation.note !== null? response.data.prestation.note: 0});
                console.log(response.data.prestation);
            }).catch(error => {
                console.log(error);
            });

    }
    constructor(props) {
        super(props);
        this.state = {
            clientId : props.match.params.clientId,
            eventId : props.match.params.eventId,
            prestationId : props.match.params.prestationId,
            prestation : '',
            rating: 0,
        }
        //this.clients.forEach((client) => (console.log(client)));
        this.changeRating = this.changeRating.bind(this);
        this.enregistrerNote = this.enregistrerNote.bind(this);

    }


    changeRating( newRating, name ) {
        this.setState({
            rating: newRating,
        })
        console.log(name);
    }


    enregistrerNote = () => {
        console.log(this.state.rating);
        axios({
            method: 'post',
            url: 'http://localhost:8000/client/prestation/'+this.state.prestation.id+'/noter',
            data: {
                note: this.state.rating,
            },
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'}
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

    this.props.history.goBack();
    };


    render(){
        let prestation;
        if(this.state.prestation !== undefined && this.state.prestation.evenement !== undefined) {
            prestation = this.state.prestation;
            console.log(prestation);

            return (
                <div>
                    <div class="card">
                        <div class="card-header"><h1> Prestation proposee </h1></div>
                        <div class="card-body">
                            <ul class="list-group">
                                <li class="list-group-item"> <span className="text-info"> Titre de l'evenement: </span> {this.state.prestation.evenement.titre}</li>
                                <li class="list-group-item"> <span className="text-info"> Date de début de la prestation: </span> {this.state.prestation.dateDebut.date.toString().slice(0, 16)} </li>
                                <li class="list-group-item"> <span className="text-info"> Date de fin de la prestation:  </span>{this.state.prestation.dateFin.date.toString().slice(0, 16)}</li>
                                <li class="list-group-item"> <span className="text-info"> Etat de la prestation: </span> {this.state.prestation.etatPrestation.titre}</li>
                                <li class="list-group-item"> <span className="text-info"> Nom du type de prestation:  </span>{this.state.prestation.typePrestation.nomType}</li>
                                <li class="list-group-item"> <span className="text-info"> Tarif public de la prestation:  </span>{this.state.prestation.typePrestation.tarifPublic}</li>
                                <li class="list-group-item"> <span className="text-info"> Description de la prestation: </span> {this.state.prestation.typePrestation.description}</li>
                                <li class="list-group-item"> <span className="text-info"> Prestataire: </span> {this.state.prestation.partenaire.nom + " " + this.state.prestation.partenaire.prenom + '  (' + this.state.prestation.partenaire.note + '/5)'}</li>
                            </ul>

                            {this.state.prestation.etatPrestation.titre == "Termine"? <div> <h4 className="text-warning" style={{textAlign: 'center'}}>Cette prestation étant terminée, vous pouvez désormais la noter </h4>
                            <div style={{display: 'block', margin: 'auto', width: '20%'}}>
                            <StarRatings
                                rating={this.state.rating}
                                starRatedColor="blue"
                                changeRating={this.changeRating}
                                numberOfStars={5}
                                name='rating'
                            />

                                <button className="btn btn-success" onClick={this.enregistrerNote}> Enregistrer votre note. </button>
                            </div>



                                </div>
                                : <p> </p>}
                        </div>
                        <div class="card-footer">
                            <button class="btn" onClick={() => this.props.history.goBack()}> Retour</button>
                        </div>
                    </div>
                </div>
            )
        } else return <p></p>;
    }

}

export default PrestationShow;

