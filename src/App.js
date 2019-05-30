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


class App extends Component{
    constructor(props){
        super(props);

    }

render() {
  return (<BrowserRouter>
            <div>
                <MenuBar />
                <Switch>
                    <Route path="/client/:clientId/event/:eventId" component={EventShow}/>
                    <Route path="/client/:clientId/events" component={EventListClient}/>
                    <Route path="/evenements" component={EventList}/>
                    <Route path="/events/create" component={EventCreate}/>
                    <Route path="/clients" component={ClientList}/>
                    <Route path="/type-events/new" component={NewTypeEvent}/>
                    <Route path="/type-events" component={EveT}/>
                    <Route path="/metiers" component={MetierList}/>
                </Switch>
            </div>
        </BrowserRouter>
  );
}

}

export default App;
