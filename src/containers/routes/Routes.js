import React, { Component } from 'react'
import { Switch, Route, Redirect} from 'react-router-dom'
import Upload from '../upload/Upload.js'
import Login from '../login/Login.js'
import Signup from '../signup/Signup.js'
import Category from '../category/Category.js'
import Image from '../image/Image.js'
import Main from '../main/Main.js'
import TestMain from '../test-main/TestMain.js'

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
        <Route exact path='/'
               render={(props) => (
                 <Main userData={this.props.userData} {...props} />
               )}
        />
        <Route exact path='/test'
               render={(props) => (
                 <TestMain userData={this.props.userData} {...props} />
               )}
        />
        {this.state.categories.map((category) => {
          return <Route path={"/category/:tag"}
            render={(props) => (
              <Category userData={this.props.userData} {...props} />
            )}
          />
        })}

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
