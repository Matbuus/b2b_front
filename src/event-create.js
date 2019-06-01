import React, { Component } from 'react';
import axios from "axios/index";
import Places from "places.js";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useAlert } from "react-alert";


const $ = require('jquery');
let inputAddress = document.querySelector('#evenement_address');
class EventCreate extends Component {

    constructor(props){
        super(props);
        axios.get('http://localhost:8000/admin/type_event').then(response => {
            this.setState({eventTypes :response.data.type_evenements});
        }).catch(error => {
            console.log(error);
        });


        this.state = {
            clientId: props.clientId || -1,
            eventTypes: [],
            startDate : new Date(),
            titre: '',
            nomType: 'Maintenance chaudière',
            address: '' ,
            city: '',
            postal: '',
            lat: '',
            lng: '',


        }

        console.log(this.state.clientId);
        }


    handleSubmit = event => {


        console.log(alert("Evenement créé"));

        if(this.state.titre.length < 3 || this.state.address == '' ||  this.state.city == '' ||  this.state.postal == '' || this.state.lat == '' || this.state.lng == '')
            return;




        axios({
            method: 'post',
            url: 'http://localhost:8000/client/'
            + this.state.clientId+'/event/newEvent',
            data: {
                titre: this.state.titre,
                nomType: this.state.nomType,
                address: this.state.address,
                city: this.state.city,
                postal: this.state.postal,
                lat: this.state.lat,
                lng: this.state.lng,
                date: this.state.startDate.getDate(),
                month: this.state.startDate.getMonth()+1,
                year: this.state.startDate.getFullYear(),
                hours: this.state.startDate.getHours(),
                minutes: this.state.startDate.getMinutes(),
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




    handleChangeDate = date => {
        this.setState({

            startDate: date
        });
        console.log(this.state.startDate.getMonth());
    }


    handleChange = event => {
        this.setState({[event.target.name] : event.target.value});
        console.log(this.state);
    };


    render(){



        const options = [];
        if(this.state.eventTypes !== undefined){
            this.state.eventTypes.forEach((type) => (
                options.push(<option value={type.nom} key={type.id}> {type.nom}</option>)
            ));
        }



    return (
        <form name="evenement">
            <div id="evenement">
                <div>
                    <label htmlFor="evenement_titre" class="required">Titre</label>
                    <input type="text" id="evenement_titre" name="titre" required="required" maxLength="255" onChange={this.handleChange} />
                </div>
                <div>
                <label htmlFor="evenement_date" class="required">Date</label>
                <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChangeDate.bind(this)}
                    showTimeSelect
                    minDate={new Date()}
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    timeCaption="time"
                />
                </div>
                <div>
                    <label for="type_prestation1_typeEvent">Type event</label>
                    <select name="nomType" value={this.state.nomType} onChange={this.handleChange}>
                        {options}
                    </select>
                </div>
                <div>
                    <label htmlFor="evenement_address" class="required">Address</label>
                    <input type="text" id="evenement_address" name="address" required="required" maxLength="255" onChange={this.handleChange}/>
                </div>
                <div>
                    <label htmlFor="evenement_city" class="required">City</label>
                    <input type="text" id="evenement_city" name="city" required="required" maxLength="255" onChange={this.handleChange}/></div>
                <div>
                    <label htmlFor="evenement_postal" class="required">Postal</label>
                    <input type="number" id="evenement_postal" name="postal" required="required" onChange={this.handleChange}/>
                </div>
                <input type="hidden" id="evenement_lat" name="lat" onChange={this.handleChange}/>
                <input type="hidden" id="evenement_lng" name="lng" onChange={this.handleChange}/>
            </div>
            <button class="btn btn-success" onClick={this.handleSubmit.bind(this)}>Save</button>
        </form>
        );
    }

    componentDidMount(prevProps) {
        inputAddress = document.querySelector('#evenement_address');
        if(inputAddress == null)
            return;
        console.log(this.state.eventTypes);
        console.log(inputAddress);
        let place;
        place = Places({
            container: inputAddress
        });

        place.on('change', e => {
            this.setState({address: e.suggestion.name});
            document.querySelector('#evenement_city').value = e.suggestion.city;
            this.setState({city: e.suggestion.city});
            document.querySelector('#evenement_postal').value = e.suggestion.postcode;
            this.setState({postal: e.suggestion.postcode});
            document.querySelector('#evenement_lat').value = e.suggestion.latlng.lat;
            this.setState({lat: e.suggestion.latlng.lat});
            document.querySelector('#evenement_lng').value = e.suggestion.latlng.lng;
            this.setState({lng: e.suggestion.latlng.lng});
        });

    }

}

export default EventCreate;