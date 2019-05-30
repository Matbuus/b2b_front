import React, { Component } from 'react';
import axios from "axios/index";
import Places from "places.js";


const $ = require('jquery');
let inputAddress = document.querySelector('#evenement_address');
class EventCreate extends Component {

    constructor(props){
        super(props);

        console.log(inputAddress);
        }

// Need jQuery? Install it with "yarn add jquery", then uncomment to require it.






    handleChange = event => {

        console.log(event);
    }

    render(){

    return (
        <form name="evenement" method="post">
            <div id="evenement">
                <div><label htmlFor="evenement_titre" class="required">Titre</label>
                    <input type="text" id="evenement_titre" name="evenement[titre]" required="required" maxLength="255" />
                </div>
                <div><label class="required">Date</label>
                    <div id="evenement_date"><select id="evenement_date_year" name="evenement[date][year]">
                        <option value="2014">2014</option><option value="2015">2015</option>
                        <option value="2016">2016</option><option value="2017">2017</option>
                        <option value="2018">2018</option><option value="2019">2019</option>
                        <option value="2020">2020</option><option value="2021">2021</option>
                        <option value="2022">2022</option><option value="2023">2023</option>
                        <option value="2024">2024</option>
                    </select><select id="evenement_date_month" name="evenement[date][month]">
                        <option value="1">Jan</option>
                        <option value="2">Feb</option>
                        <option value="3">Mar</option>
                        <option value="4">Apr</option>
                        <option value="5">May</option>
                        <option value="6">Jun</option>
                        <option value="7">Jul</option>
                        <option value="8">Aug</option>
                        <option value="9">Sep</option>
                        <option value="10">Oct</option>
                        <option value="11">Nov</option>
                        <option value="12">Dec</option>
                    </select><select id="evenement_date_day" name="evenement[date][day]">
                        <option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option><option value="10">10</option><option value="11">11</option><option value="12">12</option><option value="13">13</option><option value="14">14</option><option value="15">15</option><option value="16">16</option><option value="17">17</option><option value="18">18</option><option value="19">19</option><option value="20">20</option><option value="21">21</option><option value="22">22</option><option value="23">23</option><option value="24">24</option><option value="25">25</option><option value="26">26</option><option value="27">27</option><option value="28">28</option><option value="29">29</option><option value="30">30</option><option value="31">31</option>

                    </select></div></div>
                <div><label htmlFor="evenement_localisation" class="required">Localisation</label>
                    <select id="evenement_localisation" name="evenement[localisation]">
                        <option value="1">33 33</option><option value="2">33 33</option></select></div>

                <div><label htmlFor="evenement_typeEvenement" class="required">Type evenement</label>
                    <select id="evenement_typeEvenement" name="evenement[typeEvenement]">
                        <option value="1">Maintenance chaudière</option>
                        <option value="2">Soirée cocktail</option>
                    </select></div>
                <div>
                    <label htmlFor="evenement_address" class="required">Address</label>
                    <input type="text" id="evenement_address" name="evenement[address]" required="required" maxLength="255" onChange={this.handleChange.bind(this)} /></div>
                <div><label htmlFor="evenement_city" class="required">City</label>
                    <input type="text" id="evenement_city" name="evenement[city]" required="required" maxLength="255" /></div>
                <div><label htmlFor="evenement_postal" class="required">Postal</label>
                    <input type="number" id="evenement_postal" name="evenement[postal]" required="required" />
                </div>
                <input type="hidden" id="evenement_lat" name="evenement[lat]" />
                <input type="hidden" id="evenement_lng" name="evenement[lng]" />
                <input type="hidden" id="evenement__token" name="evenement[_token]" value="uO8MpgFuUXQ1zngveBeOJs_aK9tDLvaTL686W2afzzY" />
            </div>
            <button class="btn">Save</button>
        </form>
        );
    }

    componentDidMount(prevProps) {
        inputAddress = document.querySelector('#evenement_address');
        console.log(inputAddress);
        let place;
        place = Places({
            container: inputAddress
        });

        place.on('change', e => {
            console.log(e.value);
            document.querySelector('#evenement_city').value = e.suggestion.city;
            document.querySelector('#evenement_postal').value = e.suggestion.postcode;
            document.querySelector('#evenement_lat').value = e.suggestion.latlng.lat;
            document.querySelector('#evenement_lng').value = e.suggestion.latlng.lng;
        });

    }

}

export default EventCreate;