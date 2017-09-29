// TODO(jjandoc): Refactor this and "TwoUpWidget" to use one "ToutRowWidget"
// that takes a number argument.
import React, { Component } from 'react';
import Tout from './../Tout/Tout.js';
import './../Tout/ToutRow.css';

class ThreeUpWidget extends Component {
  render() {
    return(<div className='widget-inner'>
      <h4 className="widget-title">Three-Up Touts</h4>
      <div className="widget-three-up widget-tout-row">
        {this.props.value.touts.map((tout, i) => <Tout
              key={i} 
              index={i} 
              onWidgetChange={this.handleToutChange.bind(this)} 
              value={{...tout.value}} 
              output={tout.output} />)}
      </div>
    </div>);
  }

  output(touts) {
    return (
      <table cellPadding="0" cellSpacing="0">
        <tbody>
          <tr>
            <td width="100%">
              <table cellPadding="0" cellSpacing="0">
                <tbody>
                  <tr>
                    {touts.map((tout, i) =>
                      (<td valign="top"
                          width="176"
                          style={{padding: '0 5px'}} 
                          key={i}>{tout.output}</td>))}
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  handleToutChange(toutProps) {
    const newToutData = this.props.value.touts.slice();
    newToutData[toutProps.index] = {
      value: toutProps.value,
      output: toutProps.output
    }

    const stateChange = {
      index: this.props.index,
      value: {
        touts: newToutData
      },
      output: this.output(newToutData),
    };
    this.props.onWidgetChange(stateChange);
  }
}

ThreeUpWidget.defaultProps = {
  value: {
    touts: [ 
      {value: {image: '', title: '', body: ''}, output: ''},
      {value: {image: '', title: '', body: ''}, output: ''},
      {value: {image: '', title: '', body: ''}, output: ''},
    ]
  }
};

export default ThreeUpWidget;
