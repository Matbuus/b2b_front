import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter, NavLink, Route, Switch} from 'react-router-dom';


class MenuBar extends Component {
    constructor(props) {
        super(props);
        this.role = props.role;
        this.userId = props.userId;
        console.log(this.userId);
    }

    render(){

        let menuAdmin =  [];
        let menuClient = [];

        menuAdmin.push(
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <NavLink to="/clients" className="nav-link">Liste des clients</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to="/evenements" className="nav-link">Liste des evenements</NavLink>
                </li>
                <li className="nav-item" className="nav-item">
                    <NavLink to="/type-events" className="nav-link">Types d'evenements</NavLink>
                </li>
                <li className="nav-item" className="nav-item">
                    <NavLink to="/metiers" className="nav-link">Liste des metiers</NavLink>
                </li>

            </ul>
        );


        menuClient.push(
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <NavLink to={'/profile/'+this.userId} params={{ clientId: this.userId }}  className="nav-link">Mon Profil</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={'/client/'+this.userId+'/events'} params={{ clientId: this.userId }} className="nav-link">Mes evenements</NavLink>
                </li>
            </ul>
        );
        return ( <div>
                <div class="jumbotron jumbotron-fluid custom-jumb">
                    <div class="container ">
                        <h1 class="display-4 titre">CassioB2B</h1>
                        <p class="lead">Application B2B dans le cadre du projet Cassiopée.</p>
                    </div>
                </div>
                {this.role === "admin"? menuAdmin : menuClient}
            </div>
        );
    }

}

export default MenuBar;