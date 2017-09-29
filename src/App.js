import React, { Component } from 'react';
import PreviewPane from './components/PreviewPane/PreviewPane';
import Widget from './components/widgets/Widget';
import update from 'immutability-helper';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      markup: '',
      widgets: []
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Email Template Builder</h1>
        </header>
        <div className="App-editor">
          {this.state.widgets.map((widget, i) => <Widget
              key={i} 
              index={i} 
              onWidgetChange={this.handleWidgetChange.bind(this)} 
              type={widget.type} 
              value={widget.value} 
              output={widget.output}
              removeWidget={this.removeWidget.bind(this)} />)}
          <div className="App-editor-adder">
            <button onClick={() => { this.addWidget('text')} }>Add paragraph</button>
          </div>
        </div>
        <div className="App-preview">
          <PreviewPane
              onPreviewUpdate={this.handlePreviewUpdate.bind(this)}>
            {this.state.widgets.map((widget, i) =>
                <div key={i}>{widget.output}</div>)}
          </PreviewPane>
        </div>
        <div className="App-output">
          <textarea disabled value={this.state.markup}></textarea>
        </div>
      </div>
    );
  }

  handlePreviewUpdate(htmlString) {
    this.setState({markup: htmlString});
  }

  handleWidgetChange(newWidgetState) {
    this.setState({
      widgets: update(this.state.widgets, {
        [newWidgetState.index]: {
          value: {$set: newWidgetState.value},
          output: {$set: newWidgetState.output}
        }
      })
    });
  }

  removeWidget(index) {
    const newWidgets = [...this.state.widgets];
    newWidgets.splice(index, 1);
    this.setState({widgets: newWidgets});
  }

  addWidget(type) {
    const widget = {type: type, value: '', output: ''};
    this.setState({widgets: [...this.state.widgets, widget]});
  }
}

export default App;
