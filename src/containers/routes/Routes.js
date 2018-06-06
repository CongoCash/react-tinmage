import React, { Component } from 'react'
import { Switch, Route, Redirect} from 'react-router-dom'
import Start from '../start/Start.js'
import Upload from '../upload/Upload.js'
import Login from '../login/Login.js'
import Signup from '../signup/Signup.js'
import Image from '../image/Image.js'


class Routes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Switch>
        <Route exact path='/'
               render={() => (
                 <Start userData={this.props.userData} />
               )}/>
        <Route path='/upload'
               render={() => (
                 <Upload userData={this.props.userData} />
               )}/>
        />
        <Route path="/login"
               render={() => (
                 this.props.logged_in ? (
                   <Redirect to="/" />
                   ) :
                 <Login onLogin={this.props.onLogin} userData={this.props.userData} />
               )}
        />

        <Route path='/logout'
           render={() => (
               <Redirect to="/" />
           )}
        />

        <Route path="/signup" component={Signup}/>

        <Route path="/images/:id"
               render={(props) => (
                   <Image {...props} userData={this.props.userData} />
               )}
        />
      </Switch>
    )
  }
}

export default Routes
