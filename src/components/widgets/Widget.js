import React, { Component } from 'react';
import TextWidget from './TextWidget/TextWidget';
import './Widget.css'

class Widget extends Component {
  render() {
    return(
      <div className='widget-editor'>
        {this.getInnerWidget(this.props.type)}
        <button
            className='btn-widget-remove'
            aria-label='Remove' 
            onClick={this.handleRemoveClick.bind(this)}>
          &times;</button>
      </div>
    )
  }

  getInnerWidget(type) {
    switch(type) {
      case 'text':
      default:
        return <TextWidget {...this.props} />
    }    
  }

  handleRemoveClick() {
    this.props.removeWidget(this.props.index);
  }
}

export default Widget;
