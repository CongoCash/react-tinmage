import React, { Component } from 'react'
import { Switch, Route, Redirect} from 'react-router-dom'
import Start from '../start/Start.js'
import Upload from '../upload/Upload.js'
import Login from '../login/Login.js'
import Signup from '../signup/Signup.js'


// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
class Routes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Switch>
        <Route exact path='/' component={Start}/>
        <Route path='/upload' component={Upload}/>
        <Route path="/login"
           render={() => (
             this.props.logged_in ? (
               <Redirect to="/" />
               ) :
             <Login onLogin={this.props.onLogin} />
           )
           }
        />
        <Route path="/signup" component={Signup}/>
      </Switch>
    )
  }
}

export default Routes
