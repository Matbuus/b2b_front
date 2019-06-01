import React, {Component} from 'react';
import axios from "axios/index";
import Places from "places.js";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom'

const $ = require('jquery');
let inputAddress = document.querySelector('#evenement_address');

class LoginPage extends Component {

    handleSubmit = event => {



        console.log(this.state);

        axios({
            method: 'post',
            url: 'http://localhost:8000/login',
            data: {
                email: this.state.email,
                password: this.state.password,
            },
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'}
        })
            .then(function (response) {
                Cookies.set('auth_token', response.data.role);
                Cookies.set('userId', response.data.userId);
                this.setState({redirect: true});
                console.log(this.state.redirect);
                console.log(response);


            })
            .catch(function (error) {
                console.log("erreur = " + error);

            });




    };





    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/clients' />
        }
    };

    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
      //  console.log(this.state);
    };

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            redirect: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


    }

    render() {


        if(this.state.redirect) {
            return this.renderRedirect;
        }
        return (



                <div id="client_type1">
                    <h1> Connexion </h1>

                    { this.state.error?<p className="text-danger">Login incorrect</p>:<p></p>}
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

                    <button class="btn btn-success" onClick={this.handleSubmit}>Se connecter</button>

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

export default LoginPage;