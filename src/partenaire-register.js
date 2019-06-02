import React, {Component} from 'react';
import axios from "axios/index";
import Places from "places.js";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {useAlert} from "react-alert";


const $ = require('jquery');
let inputAddress = document.querySelector('#evenement_address');

class PartenaireRegister extends Component {

    handleSubmit = event => {


        console.log(this.state);



        axios({
            method: 'post',
            url: 'http://localhost:8000/partenaire/newReact',
            data: {
                nom: this.state.nom,
                prenom: this.state.prenom,
                address: this.state.address,
                city: this.state.city,
                postal: this.state.postal,
                lat: this.state.lat,
                lng: this.state.lng,
                email: this.state.email,
                password: this.state.password,
                metier: this.state.metier,
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

    };




    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
        console.log(this.state);
    };

    constructor(props) {
        super(props);



        this.state = {
            metiers: [],
            nom: '',
            prenom: '',
            email: '',
            password: '',
            address: '',
            city: '',
            postal: '',
            lat: '',
            lng: '',
            metier: '',
        }

        axios.get('http://localhost:8000/admin/metier').then(response => {
            this.setState({metiers :response.data.metiers});
        }).catch(error => {
            console.log(error);
        });
        this.handleChange = this.handleChange.bind(this);


    }

    render() {



        const options = [];
        if(this.state.metiers !== undefined){
            this.state.metiers.forEach((metier) => {
                console.log(metier);
                options.push(<option value={metier.titre} key={metier.id}> {metier.titre}</option>)
         });
        }


        return (

                <div id="partenaire_type1">
                    <h1> Creation d'un Partenaire </h1>
                    <div>
                        <label for="partenaire_type1_nom" class="required">Nom</label>
                        <input type="text" id="client_type1_nom" name="nom" required="required"
                               maxlength="255" onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label for="partenaire_type1_prenom" class="required">Prenom</label>
                        <input type="text" id="partenaire_type1_prenom" name="prenom" required="required"
                               maxlength="255" onChange={this.handleChange}/>
                    </div>

                    <div><label for="partenaire_type1_email" class="required">Email</label>
                        <input type="email"
                               id="partenaire_type1_email"
                               name="email"
                               required="required"
                               maxlength="255"
                               onChange={this.handleChange}/>
                    </div>
                    <div><label for="partenaire_type1_password" class="required">Password</label>
                        <input type="password"
                               id="partenaire_type1_password"
                               name="password"
                               required="required"
                               maxlength="255"
                               onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="partenaire_address" class="required">Address</label>
                        <input type="text" id="partenaire_address" name="address" required="required" maxLength="255" onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="partenaire_city" class="required">City</label>
                        <input type="text" id="partenaire_city" name="city" required="required" maxLength="255" onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="partenaire_postal" class="required">Postal</label>
                        <input type="number" id="partenaire_postal" name="postal" required="required" onChange={this.handleChange}/>
                    </div>
                    <input type="hidden" id="partenaire_lat" name="lat" onChange={this.handleChange}/>
                    <input type="hidden" id="partenaire_lng" name="lng" onChange={this.handleChange}/>
                        <div>
                            <label for="type_prestation1_typeEvent">Metier</label>
                            <select name="metier" value={this.state.metier} onChange={this.handleChange}>
                                {options}
                            </select>
                        </div>
                        <button class="btn btn-success" onClick={this.handleSubmit.bind(this)}>Save</button>

                </div>
        );
    }

    componentDidMount(prevProps) {
        inputAddress = document.querySelector('#partenaire_address');
        if (inputAddress == null)
            return;
        console.log(inputAddress);
        let place;
        place = Places({
            container: inputAddress
        });

        place.on('change', e => {
            this.setState({address: e.suggestion.name});
            document.querySelector('#partenaire_city').value = e.suggestion.city;
            this.setState({city: e.suggestion.city});
            document.querySelector('#partenaire_postal').value = e.suggestion.postcode;
            this.setState({postal: e.suggestion.postcode});
            document.querySelector('#partenaire_lat').value = e.suggestion.latlng.lat;
            this.setState({lat: e.suggestion.latlng.lat});
            document.querySelector('#partenaire_lng').value = e.suggestion.latlng.lng;
            this.setState({lng: e.suggestion.latlng.lng});
        });

    }

}

export default PartenaireRegister;