import React, {Component} from 'react';
import axios from "axios/index";
import Places from "places.js";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Cookies from 'js-cookie';
import { Redirect } from 'react-router-dom'
import LoginPage from "./login";

const $ = require('jquery');
let inputAddress = document.querySelector('#evenement_address');

class Logout extends Component {

    constructor(props) {
        super(props);
        Cookies.set('userId', undefined);
        Cookies.set('auth_token', undefined);
    }

    render() {


        return (<LoginPage/>);
    }

}

export default Logout;