import React, { Component } from 'react'
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
        <MobileSidebar categories={this.state.categories}/>
      </React.Fragment>
    )
  }
}

export default Sidebar
