import React, { Component } from 'react'
import { Switch, Route, Redirect} from 'react-router-dom'
import Start from '../start/Start.js'
import Upload from '../upload/Upload.js'
import Login from '../login/Login.js'
import Signup from '../signup/Signup.js'
import Category from '../category/Category.js'


// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
class Routes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: ['new', 'animals', 'cartoons', 'funny', 'sports', 'other']
    }
  }

  render() {
    return (
      <Switch>
        {this.state.categories.map((category) => {
          return <Route path={"/"+category} component={Category}/>
        })}
        <Route exact path='/' component={Start}/>
        <Route path='/upload' component={Upload}/>
        <Route path="/login"
           render={() => (
             this.props.logged_in ? (
               <Redirect to="/" />
               ) :
             <Login onLogin={this.props.onLogin} userData={this.props.userData} />
           )
           }
        />
        <Route path="/signup" component={Signup}/>
      </Switch>
    )
  }
}

export default Routes
