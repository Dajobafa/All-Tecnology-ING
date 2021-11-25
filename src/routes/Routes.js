import React from 'react';
import {  BrowserRouter, Switch, Route} from "react-router-dom";
import Login from "../containers/Login";
import Principal from "../containers/Principal";
import Loged_principal from "../containers/Loged_principal";
import Inventario from "../containers/Inventario";
import Register from "../containers/Register";
import loged_admin from '../containers/Loged_admin';
import Conocenos from '../containers/Conocenos';
import Usuarios from '../containers/Usuarios';


function  Routes() {
        return (
            <BrowserRouter>
                <Switch>                    
                    <Route exact path="/" component={Login}/>                                     
                    <Route exact path="/Principal" component={Principal}/>                                     
                    <Route exact path="/Loged_principal" component={Loged_principal}/>                                    
                    <Route exact path="/Loged_admin" component={loged_admin}/>                                    
                    <Route exact path="/Register" component={Register}/>                                     
                    <Route exact path="/Inventario" component={Inventario}/>                                     
                    <Route exact path="/Conocenos" component={Conocenos}/>                                   
                    <Route exact path="/Usuarios" component={Usuarios}/>                                   
                </Switch>
            </BrowserRouter>
        );
}
    


export default Routes;