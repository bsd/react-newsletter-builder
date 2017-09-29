import React, { Component } from 'react';

class ImageWidget extends Component {
  render() {
    return(<div className='widget-inner'>
      <h4 className="widget-title">Image</h4>
      <input 
          className='widget widget-image'
          name='image'
          type='text'
          placeholder='Image URL'
          value={this.props.value.image}
          onChange={this.handleChange.bind(this)} />
          <input 
          className='widget widget-image'
          name='link'
          type='text'
          placeholder='Link URL (optional)'
          value={this.props.value.link}
          onChange={this.handleChange.bind(this)} />
          <input 
          className='widget widget-image'
          name='alt'
          type='text'
          placeholder='Alt text'
          value={this.props.value.alt}
          onChange={this.handleChange.bind(this)} />
    </div>);
  }

  output(value) {
    let image = (
      <img src={value.image}
          style={{'display': 'block', 'maxWidth': '100%'}}
          alt={value.alt} />
    );
    if (value.link) {
      image = (<a href={value.link} target='_blank'>{image}</a>);
    }
    return image;
  }

  handleChange(e) {
    const newValue = Object.assign({}, this.props.value);
    newValue[e.target.name] = e.target.value;

    const stateChange = {
      index: this.props.index,
      value: newValue,
      output: this.output(newValue),
    };
    this.props.onWidgetChange(stateChange);  }
}

ImageWidget.defaultProps = {
  value: {
    image: '',
    link: '',
    alt: ''
  },
  output: ''
};
export default ImageWidget;
