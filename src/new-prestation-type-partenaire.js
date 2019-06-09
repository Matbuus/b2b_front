import React, { Component } from 'react';
import axios from "axios/index";
import Places from "places.js";


const $ = require('jquery');

class NewPrestationTypePartenaire extends Component {

    constructor(props){
        super(props);
        axios.get('http://localhost:8000/admin/type_event').then(response => {
            this.setState({eventTypes: response.data.type_evenements});
            console.log(this.state.eventTypes);
        }).catch(error => {
            console.log(error);
        });

        this.state = {
            partenaireId: props.partenaireId || -1,
            description : '',
            nomType :'',
            tarifPublic : 0,
            titre: 'Maintenance chaudière',
        };




        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

// Need jQuery? Install it with "yarn add jquery", then uncomment to require it.


    handleSubmit = event => {
        if(this.state.nomType.length < 3 || this.state.description.length < 30)
            return;

        axios({
            method: 'post',
            url: 'http://localhost:8000/partenaire/'
            + this.state.partenaireId+'/type_prestation/addT',
            data: {
                nomType: this.state.nomType,
                description: this.state.description,
                tarifPublic: this.state.tarifPublic,
                titre: this.state.titre,
                eventType: [],
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
        console.log(this.state);
    };

    render(){

        const options = [];


        console.log(this.state.eventTypes);
        if(this.state.eventTypes !== undefined){
            console.log(this.state.eventTypes);
            this.state.eventTypes.forEach((type) => {

            options.push(<option value={type.nom} key={type.id}> {type.nom}</option>);
            console.log(type);
            }
        );
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
                            <input type="number" id="type_prestation1_tarifPublic" name="tarifPublic" required="required" onChange={this.handleChange}/>

                        </div>
                        <div>
                            <label for="type_prestation1_typeEvent">Type event</label>
                            <select name="titre" value={this.state.titre} onChange={this.handleChange}>
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

export default NewPrestationTypePartenaire;
