import React, {Component} from 'react';
import axios from "axios/index";
import Places from "places.js";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {useAlert} from "react-alert";


const $ = require('jquery');
let inputAddress = document.querySelector('#evenement_address');

class ClientRegister extends Component {

    handleSubmit = event => {


        console.log(this.state);


        axios({
            method: 'post',
            url: 'http://localhost:8000/cclient/newReact',
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
      //  console.log(this.state);
    };

    constructor(props) {
        super(props);
        this.state = {
            nom: '',
            prenom: '',
            email: '',
            password: '',
            address: '',
            city: '',
            postal: '',
            lat: '',
            lng: '',
        }

        this.handleChange = this.handleChange.bind(this);


    }

    render() {
        return (

                <div id="client_type1">
                    <h1> Creation d'un client </h1>
                    <form name="client">
                    <div>
                        <label for="client_type1_nom" class="required">Nom</label>
                        <input type="text" id="client_type1_nom" name="nom" required="required"
                               maxlength="255" onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label for="client_type1_prenom" class="required">Prenom</label>
                        <input type="text" id="client_type1_prenom" name="prenom" required="required"
                               maxlength="255" onChange={this.handleChange}/>
                    </div>

                    <div><label for="client_type1_email" class="required">Email</label>
                        <input type="email"
                               id="client_type1_email"
                               name="email"
                               required="required"
                               maxlength="255"
                               onChange={this.handleChange}/>
                    </div>
                    <div><label for="client_type1_password" class="required">Password</label>
                        <input type="password"
                               id="client_type1_password"
                               name="password"
                               required="required"
                               maxlength="255"
                               onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="client_address" class="required">Address</label>
                        <input type="text" id="client_address" name="address" required="required" maxLength="255" onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="client_city" class="required">City</label>
                        <input type="text" id="client_city" name="city" required="required" maxLength="255" onChange={this.handleChange}/>
                    </div>
                    <div>
                        <label htmlFor="client_postal" class="required">Postal</label>
                        <input type="number" id="client_postal" name="postal" required="required" onChange={this.handleChange}/>
                    </div>
                    <input type="hidden" id="client_lat" name="lat" onChange={this.handleChange}/>
                    <input type="hidden" id="client_lng" name="lng" onChange={this.handleChange}/>
                    <button class="btn btn-success" onClick={this.handleSubmit.bind(this)}>Save</button>

            </form>
                </div>
        );
    }

    componentDidMount(prevProps) {
        inputAddress = document.querySelector('#client_address');
        if (inputAddress == null)
            return;
        console.log(inputAddress);
        let place;
        place = Places({
            container: inputAddress
        });

        place.on('change', e => {
            this.setState({address: e.suggestion.name});
            document.querySelector('#client_city').value = e.suggestion.city;
            this.setState({city: e.suggestion.city});
            document.querySelector('#client_postal').value = e.suggestion.postcode;
            this.setState({postal: e.suggestion.postcode});
            document.querySelector('#client_lat').value = e.suggestion.latlng.lat;
            this.setState({lat: e.suggestion.latlng.lat});
            document.querySelector('#client_lng').value = e.suggestion.latlng.lng;
            this.setState({lng: e.suggestion.latlng.lng});
        });

    }

}

export default ClientRegister;