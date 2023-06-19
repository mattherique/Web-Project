import React, {Component} from 'react';
import './Login.css';
import './EstructuralAdmin.css';
import LoginComponent from './LoginComponent'

import { Route, Routes, BrowserRouter as Router} from "react-router-dom";
import Admin from './Admin';
import AdminUser from './AdmunUser';
class WebRouter extends Component {
  constructor(props){
    super(props)

  }

  render(){
    return (
      <div>
        <Router>
            <Routes>
                <Route exact path="/login" element={<LoginComponent />}/>
                <Route exact path="/admin" element={<Admin />}/>
                <Route exact path="/admin-user" element={<AdminUser />}/> 
            </Routes>
        </Router>
      </div>
    );
  }
}

export default WebRouter;
