import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {BrowserRouter, NavLink, Route, Switch} from 'react-router-dom';
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Test2 from './test2';
import ClientList from './client-list';
import EventList from './event-list';
import MenuBar from './menu';
import EventListClient from './event-list-client';
import Places from 'places.js';
import Map from './map.js';
import EventCreate from './event-create';
import EventShow from './event-show';
import EveT from "./event-type";
import NewTypeEvent from "./new-type-event";
import MetierList from "./metier-list";
import MetierShow from "./metier-show";
import PrestationTypeList from "./prestation-type-list";
import NewPrestationType from "./new-prestation-type";
import Cookies from 'js-cookie';
import ClientShow from "./client-show";
import ClientRegister from "./client-register";
import LoginPage from "./login";
import Logout from "./logout";


class App extends Component{
    constructor(props){
        super(props);
    }

render() {

    if(Cookies.get('userId') == undefined) {
        return <LoginPage/>;
    } else


  return (<BrowserRouter>
            <div>
                <MenuBar role={Cookies.get('auth_token')} userId={Cookies.get('userId')}/>
                <Switch>
                    <Route path="/client/:clientId/event/:eventId" component={EventShow}/>
                    <Route path="/client/:clientId/events" component={EventListClient}/>
                    <Route path="/evenements" component={EventList}/>
                    <Route path="/events/create" component={EventCreate}/>
                    <Route path="/clients" component={ClientList}/>
                    <Route path="/type-events/new" component={NewTypeEvent}/>
                    <Route path="/type-events" component={EveT}/>
                    <Route path="/metiers" component={MetierList}/>
                    <Route path="/metier/:metierId/add_tp" component={NewPrestationType}/>
                    <Route path="/metier/:metierId" component={MetierShow}/>
                    <Route path="/tp" component={PrestationTypeList}/>
                    <Route path="/profile/:clientId" component={ClientShow}/>
                    <Route path="/new/client" component={ClientRegister} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/logout" component={Logout} />
                </Switch>
            </div>
        </BrowserRouter>
  );
}

}

export default App;
