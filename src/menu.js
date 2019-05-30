import React, { Component } from 'react';
import ReactDom from 'react-dom';
import {BrowserRouter, NavLink, Route, Switch} from 'react-router-dom';


class MenuBar extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return ( <div>
            <div class="jumbotron jumbotron-fluid custom-jumb">
  <div class="container ">
    <h1 class="display-4 titre">CassioB2B</h1>
    <p class="lead">Application B2B dans le cadre du projet Cassiopée.</p>
  </div>
</div>
            <ul className="nav nav-tabs">
                <li className="nav-item">
                    <NavLink to="/clients" className="nav-link">Liste des clients</NavLink>
                    </li>
<li className="nav-item">
                    <NavLink to="/evenements" className="nav-link">Liste des evenements</NavLink>
                    </li>
                    <li className="nav-item" className="nav-link">
                    <NavLink to="/type-events">Types d'evenements</NavLink>
                    </li>
                <li className="nav-item" className="nav-link">
                    <NavLink to="/metiers">Liste des metiers</NavLink>
                </li>

            </ul>
            </div>
        );
    }

}

export default MenuBar;