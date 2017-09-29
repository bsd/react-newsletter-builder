import React, { Component } from 'react';

class TextWidget extends Component {
  render() {
    return(<div className='widget-inner'>
      <h4 className="widget-title">Paragraph</h4>
      <textarea 
          className='widget widget-text'
          value={this.props.value}
          onChange={this.handleChange.bind(this)} />
    </div>);
  }

  output(value) {
    return <div dangerouslySetInnerHTML={{__html: `${value}<br /><br />`}} />;
  }

  handleChange(e) {
    const stateChange = {
      index: this.props.index,
      value: e.target.value,
      output: this.output(e.target.value),
    };
    this.props.onWidgetChange(stateChange);
  }
}

export default TextWidget;
