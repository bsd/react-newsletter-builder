import React, { Component } from 'react';
import TextWidget from './TextWidget/TextWidget';
import ThreeUpWidget from './ThreeUpWidget/ThreeUpWidget';
import TwoUpWidget from './TwoUpWidget/TwoUpWidget';
import './Widget.css'

class Widget extends Component {
  render() {
    return(
      <div className='widget-editor'>
        {getInnerWidget(this.props.type, this.props)}
        <button
            className='btn-widget-remove'
            aria-label='Remove' 
            onClick={this.handleRemoveClick.bind(this)}>
          &times;</button>
      </div>
    )
  }

  handleRemoveClick() {
    this.props.removeWidget(this.props.index);
  }
}

function getInnerWidget(type, props) {
  switch(type) {
    case 'two-up':
      return <TwoUpWidget {...props} />;
    case 'three-up':
      return <ThreeUpWidget {...props} />;
    case 'text':
    default:
      return <TextWidget {...props} />;
  }    
}

export default Widget;
