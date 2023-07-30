import React, {Component} from 'react';
import './Login.css';
import './EstructuralAdmin.css';
import LoginComponent from './LoginComponent'

import { Route, Routes, BrowserRouter as Router} from "react-router-dom";
import AdminUser from './AdminUser';
import AdminStock from './AdminStock';
import AdminSidebar from './AdminSidebar';
class WebRouter extends Component {
  constructor(props){
    super(props)

  }

  render(){
    return (
      <Router>
          <Routes>
              <Route exact path="/login" element={<LoginComponent />}/>
              <Route exact path="/admin-user" element={<AdminUser />}/>
              <Route exact path="/admin-stock" element={<AdminStock />}/> 
          </Routes>
      </Router>
    );
  }
}

export default WebRouter;
