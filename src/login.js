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


    handleChange = event => {
        this.setState({[event.target.name]: event.target.value});
      //  console.log(this.state);
    };

    constructor(props) {
        super(props);
        this.state = {

            email: '',
            password: '',
            redirect: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);


    }

    handleSubmit = () => {



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
                console.log(response);

            })
            .catch(function (error) {
                console.log("erreur = " + error);

            });




    };

    render() {


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

    componentDidUpdate(prevProps) {
        if(Cookies.get('userId') !== undefined)
            console.log('logged');
    }

}

export default LoginPage;