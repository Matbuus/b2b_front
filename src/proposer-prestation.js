import React, { Component } from 'react';
import axios from "axios/index";
import Places from "places.js";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useAlert } from "react-alert";


const $ = require('jquery');
let inputAddress = document.querySelector('#evenement_address');
class ProposerPrestation extends Component {

    constructor(props){
        super(props);
        this.state = {
            partenaireId: props.match.params.partenaireId || -1,
            eventId: props.match.params.eventId,
            event: '',
            typesPrestation: [],
            startDate : new Date(),
            endDate: new Date(),
            typeId: '',
        }


        axios.get('http://localhost:8000/partenaire/'+this.state.partenaireId+'/types_prestation').then(response => {
            this.setState({typesPrestation :response.data.typePrestations});
            console.log(response);
        }).catch(error => {
            console.log(error);
        });

        axios.get('http://localhost:8000/evenement/'+this.state.eventId).then(response => {
            this.setState({event :response.data.evenement});
        }).catch(error => {
            console.log(error);
        });


    }


    handleSubmit = event => {
        axios({
            method: 'post',
            url: 'http://localhost:8000/partenaire/'
            + this.state.partenaireId+'/event/'+this.state.eventId + '/prestationR',
            data: {
                typeId: this.state.typeId,
                dated: this.state.startDate.getDate(),
                monthd: this.state.startDate.getMonth()+1,
                yeard: this.state.startDate.getFullYear(),
                hoursd: this.state.startDate.getHours(),
                minutesd: this.state.startDate.getMinutes(),
                datef: this.state.endDate.getDate(),
                monthf: this.state.endDate.getMonth()+1,
                yearf: this.state.endDate.getFullYear(),
                hoursf: this.state.endDate.getHours(),
                minutesf: this.state.endDate.getMinutes(),
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

        alert("Prestation proposée");
        this.props.history.goBack();
    };




    handleChangeDateDebut = date => {
        this.setState({

            startDate: date,
            endDate: date,
        });
    };

    handleChangeDateFin = date => {
        this.setState({

            endDate: date
        });
    };




    handleChange = event => {
        this.setState({[event.target.name] : event.target.value});
        console.log(this.state);
    };


    render(){

        if(this.state.nomType == '' && this.state.typesPrestation[0] !== undefined)
            this.setState({nomType: this.state.typesPrestation[0].nomType});

        console.log(this.state);
        const options = [];
        if(this.state.typesPrestation !== undefined){
            if(this.state.typeId == '' && this.state.typesPrestation[0] !== undefined)
                this.setState({typeId: this.state.typesPrestation[0].id})
            this.state.typesPrestation.forEach((type) => {
                options.push(<option value={type.id} key={type.id}> {type.nomType}</option>);

            });
        }

    if(this.state.event.date !== undefined)
    console.log(typeof this.state.event.date);
    return (

            <div class="card">
                <div class="card-header">
                    <h1> Prestation pour l'evenement "{this.state.event.titre}"</h1>
                </div>
                <div class="card-content">
                <div>
                <label htmlFor="prestation_date_debut" class="required">Date de début</label>
                <DatePicker
                    selected={this.state.startDate}
                    onChange={this.handleChangeDateDebut.bind(this)}
                    showTimeSelect
                    minDate={new Date()}
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    timeCaption="time"
                />
                </div>

                <div>
                    <label htmlFor="prestation_date_debut" class="required">Date de fin</label>
                    <DatePicker
                        selected={this.state.endDate}
                        onChange={this.handleChangeDateFin.bind(this)}
                        showTimeSelect
                        minDate={this.state.startDate}
                        timeFormat="HH:mm"
                        timeIntervals={15}
                        dateFormat="MMMM d, yyyy h:mm aa"
                        timeCaption="time"
                    />
                </div>


                <div>
                    <label>Type de prestation</label>
                    <select name="nomType" value={this.state.typeId} onChange={this.handleChange}>
                        {options}
                    </select>
                </div>
                <button class="btn btn-success" onClick={this.handleSubmit.bind(this)}>Save</button>
            </div>
                <div class="card-footer">
                    <button class="btn"onClick={this.props.history.goBack}> Retour </button>
                </div>
            </div>



        );
    }



}

export default ProposerPrestation;