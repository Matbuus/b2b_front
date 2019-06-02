import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter, NavLink, Route, Switch} from 'react-router-dom';
import Cookies from 'js-cookie';
import LoginPage from "./login";

class MenuBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            role: Cookies.get('auth_token'),
            userId: Cookies.get('userId')

        }

        if(this.state.role == "undefined")
            this.connected = false;
        else
            this.connected = true;

        console.log(this.connected);
        console.log("mon role est : " + this.state.role + " mon id est " + this.state.userId);
        this.logout = this.logout.bind(this);
        this.getMenu = this.getMenu.bind(this);
    }


    logout = () => {
        Cookies.set('userId', undefined);
        Cookies.set('auth_token', undefined);
        this.connected = false;
        window.location.reload();
    }

    getMenu = (role) => {
        let menuAdmin =  [];
        let menuClient = [];
        let menuPartenaire = [];
        let authMenu = [];

        console.log("id = " + this.state.userId);
        menuAdmin.push(
            <nav class="navbar navbar-toggleable-md navbar-light bg-faded">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <NavLink to="/clients" className="nav-link">Liste des clients</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/evenements" className="nav-link">Liste des evenements</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/type-events" className="nav-link">Types d'evenements</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/metiers" className="nav-link">Liste des metiers</NavLink>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <li className="nav-item d-flex justify-content-end">
                        {console.log(this.connected)}
                        {this.connected ? <button className="justify-content-end" onClick={this.logout}>Déconnexion</button> : <button className="justify-content-end" onClick={this.logout}>Connexion</button>}
                    </li>
                </ul>

            </nav>
        );


        menuClient.push(
            <nav class="navbar navbar-toggleable-md navbar-light bg-faded">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <NavLink to={'/profile/'+this.state.userId} params={{ clientId: this.state.userId }}  className="nav-link">Mon Profil</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={'/client/'+this.state.userId+'/events'} params={{ clientId: this.state.userId }} className="nav-link">Mes evenements</NavLink>
                    </li>

                </ul>
                <ul class="navbar-nav">
                    <li className="nav-item d-flex justify-content-end">
                        {this.connected ? <button className="justify-content-end" onClick={this.logout}>Déconnexion</button> : <button className="justify-content-end" onClick={this.logout}>Connexion</button>}
                    </li>
                </ul>
            </nav>
        );

        menuPartenaire.push(
            <nav class="navbar navbar-toggleable-md navbar-light bg-faded">
                <ul className="nav nav-tabs justify-content-center">
                    <li className="nav-item">
                        <NavLink to={'/profile/'+this.state.userId} params={{ clientId: this.state.userId }}  className="nav-link">Mon Profil</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to={'/client/'+this.state.userId+'/events'} params={{ clientId: this.state.userId }} className="nav-link">Mes evenements</NavLink>
                    </li>
                    <li className="nav-item" className="nav-item">
                        <NavLink to={"/types-prestation/"+this.state.userId} className="nav-link">Liste des metiers</NavLink>
                    </li>
                </ul>
                <ul class="navbar-nav">
                    <li className="nav-item d-flex justify-content-end">
                        {this.connected ? <button className="justify-content-end" onClick={this.logout}>Déconnexion</button> : <button className="justify-content-end" onClick={this.logout}>Connexion</button>}
                    </li>
                </ul>
            </nav>
        );

        authMenu.push(
            <ul className="nav nav-tabs justify-content-center">
                <li className="nav-item">
                    <NavLink to={'/login'} className="nav-link">Se connecter</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to={'/new/partenaire'} className="nav-link">S'inscrire en tant que partenaire</NavLink>
                </li>
                <li className="nav-item" className="nav-item">
                    <NavLink to={'/new/client'} className="nav-link">S'inscrire en tant que client</NavLink>
                </li>
            </ul>

        )

        if(role == "admin")
            return menuAdmin;
        else if(role == "client")
            return menuClient;
        else if(role == "partenaire")
            return menuPartenaire;
        else return authMenu;
    }

    render(){


        return ( <div>
                <div class="jumbotron jumbotron-fluid custom-jumb">
                    <div class="container ">
                        <h1 class="display-4 titre">CassioB2B</h1>
                        <a className="nav-link justify-content-end">Plateforme B2B dans le cadre du projet Cassiopée.</a>
                    </div>
                </div>
                {this.getMenu(this.state.role)}
            </div>
        );
    }

}

export default MenuBar;