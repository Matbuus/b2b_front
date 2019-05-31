import React, { Component } from 'react';
import axios from "axios/index";
import Places from "places.js";


const $ = require('jquery');

class NewMetier extends Component {

    constructor(props){
        super(props);
        this.state = {titre: ''};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

// Need jQuery? Install it with "yarn add jquery", then uncomment to require it.


    handleSubmit = event => {

        if(this.state.titre != "") {

            axios({
                method: 'post',
                url: 'http://localhost:8000/admin/metier/newMetier',
                data: {
                    titre: this.state.titre,
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

        }

    };



    handleChange = event => {
        this.setState({titre: event.target.value})
    };

    render(){

        return (<div>
                <form>
                    <div>
                        <label for="metier_titre" class="required">Titre</label>
                        <input type="text" id="metier_titre" name="metier[nom]" required="required" maxLength="255" value={this.state.titre} onChange={this.handleChange}/>
                    </div>

                    <button onClick={this.handleSubmit} className="btn btn-success"> Enregistrer </button>
                </form>

            </div>
        );
    }



}

export default NewMetier;