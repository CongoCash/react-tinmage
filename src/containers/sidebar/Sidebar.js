import React, { Component } from 'react'
import {BrowserRouter as Router, Link, Route} from 'react-router-dom'
import DesktopSidebar from "../desktop-sidebar/DesktopSidebar";
import MobileSidebar from "../mobile-sidebar/MobileSidebar";

class Sidebar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: ['new', 'ads', 'animals', 'cars', 'cartoons', 'cool', 'funny', 'games', 'gif', 'jokes', 'movies',
        'music', 'other', 'political', 'sports', 'travel', 'tv', 'untagged', 'wow'],
      category_button_clicked: false,
      width: window.innerWidth
    };
    this.category_button = this.category_button.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  updateDimensions() {
    if ((this.state.width >= 992 && window.innerWidth < 992) || (this.state.width < 992 && window.innerWidth >= 992)) {
      this.setState({
        width: window.innerWidth
      })
    }
  }

  category_button(e) {
    if (this.state.category_button_clicked === false) {
      this.setState({
        category_button_clicked: true
      })
    }

    else {
      this.setState({
        category_button_clicked: false
      })
    }
  }

  render() {
    return (
      <React.Fragment>
      {this.state.width >= 992 ?
        <DesktopSidebar categories={this.state.categories}/>
        :
        <MobileSidebar categories={this.state.categories}/>
      }
      </React.Fragment>
    )
  }
}

export default Sidebar
