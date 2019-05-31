import React, { Component } from 'react';
import axios from "axios/index";
import Places from "places.js";


const $ = require('jquery');

class NewPrestationType extends Component {

    constructor(props){
        super(props);
        axios.get('http://localhost:8000/admin/type_event').then(response => {
            this.eventTypes = response.data.type_evenements;
        }).catch(error => {
            console.log(error);
        });

        this.state = {
            metierId: props.metierId || -1,
            description: {
                value : '',
                valid: false
            },
            nomType: {
                value:'',
                valid: false
            },
            tarifPublic: {
                value: 0,
                valid: false
            },
            titre: {
                value:'Maintenance chaudière',
                valid: false
            },

            valid: false
        };




        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

// Need jQuery? Install it with "yarn add jquery", then uncomment to require it.


    handleSubmit = event => {

            axios({
                method: 'post',
                url: 'http://localhost:8000/admin/metier/'
                + this.state.metierId+'/type_prestation/addT',
                data: {
                    nomType: this.state.nomType.value,
                    description: this.state.description.value,
                    tarifPublic: this.state.tarifPublic.value,
                    titre: this.state.titre.value
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
       this.setState({[event.target.name] : event.target.value});
       if(event.target.name == "nomType.value"){
        console.log("nom type");
       }
    };

    render(){
        const options = [];
        if(this.eventTypes !== undefined){
        this.eventTypes.forEach((type) => (
            options.push(<option value={type.nom} key={type.id}> {type.nom}</option>)
        ));
        }

        return (
            <div>
            <form>
                <div id="type_prestation1">
                    <div>
                        <label for="type_prestation1_nomType" class="required">Nom type</label>
                        <input type="text" id="type_prestation1_nomType" name="nomType" required="required" minLength="3" maxLength="255" onChange={this.handleChange} />
                    </div>
                    <div>
                        <label for="type_prestation1_description" class="required">Description</label>
                        <textarea id="type_prestation1_description" name="description" minLength="30" required="required" onChange={this.handleChange}></textarea>
                    </div>
                    <div>
                        <label for="type_prestation1_tarifPublic" class="required">Tarif public</label>
                        <input type="number" id="type_prestation1_tarifPublic" name="tarifPublic.value" required="required" onChange={this.handleChange}/>

                    </div>
                    <div>
                        <label for="type_prestation1_typeEvent">Type event</label>
                        <select name="titre.value" value={this.state.titre} onChange={this.handleChange}>
                            {options}
                        </select>
                    </div>
                </div>
                <button className="btn btn-success" onClick={this.handleSubmit}>Enregistrer</button>
            </form>
            </div>
        );
    }



}

export default NewPrestationType;