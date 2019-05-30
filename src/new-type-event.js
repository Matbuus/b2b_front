import React, { Component } from 'react';
import axios from "axios/index";
import Places from "places.js";


const $ = require('jquery');
let inputAddress = document.querySelector('#evenement_address');
class NewTypeEvent extends Component {

    constructor(props){
        super(props);
        this.state = {nom: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        }

// Need jQuery? Install it with "yarn add jquery", then uncomment to require it.


    handleSubmit = event => {

        if(this.state.nom != "") {

        axios.post('http://localhost:8000/admin/type_event/newType', {
            nom: this.state.nom,

        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        }

    };



    handleChange = event => {
        this.setState({nom: event.target.value})
    };

    render(){

    return (<div>
        <form>
                    <div>
                        <label for="type_evenement_nom" class="required">Nom</label>
                        <input type="text" id="type_evenement_nom" name="type_evenement[nom]" required="required" maxLength="255" value={this.state.value} onChange={this.handleChange}/>
                    </div>

            <button onClick={this.handleSubmit} className="btn btn-success"> Enregistrer </button>
        </form>

        </div>
        );
    }



}

export default NewTypeEvent;