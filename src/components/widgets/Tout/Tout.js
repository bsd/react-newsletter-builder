import React, { Component } from 'react';
import './Tout.css';

class Tout extends Component {
  render() {
    return(<div className='tout'>
        <input
          type='text'
          name='image'
          placeholder='Image URL'
          value={this.props.value.image}
          onChange={this.handleChange.bind(this)} />
        <input
          type='text'
          name='title'
          placeholder='Tout title'
          value={this.props.value.title}
          onChange={this.handleChange.bind(this)} />
        <textarea 
          name='body'
          placeholder='Tout body'
          value={this.props.value.body}
          onChange={this.handleChange.bind(this)} />
    </div>);
  }

  output(value) {
    let image = null;
    if (value.image) {
      image = (
        <tr>
          <td align='left'><img src={value.image} alt='' style={{display: 'block','border': 0,'margin-bottom': '10px'}} /></td>
        </tr>
      );
      }
    return (
      <table cellPadding='0' cellSpacing='0'>
        <tbody>
          {image}
          <tr>
              <td align='left'>
                <strong>{value.title}</strong><br />
                <div dangerouslySetInnerHTML={{__html: value.body}} />
              </td>
          </tr>
        </tbody>
      </table>
    );
  }

  handleChange(e) {
    const newValue = Object.assign({}, this.props.value);
    newValue[e.target.name] = e.target.value;

    const stateChange = {
      index: this.props.index,
      value: newValue,
      output: this.output(newValue),
    };
    this.props.onWidgetChange(stateChange);
  }
}

export default Tout;
