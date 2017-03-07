import React, { Component } from 'react';
import './App.css';

import RichEditor from './comps/RichEditor.jsx';
import RichControls from './comps/RichControls.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  onChange = (editorState) => {
    this.setState({editorState});
  }

  onToggle = (type, value) => {
    this.refs["editor"].toggle(type, value);
  }

  render() {
    return (
      <div className="App">
        <h1>Custom react RTE</h1>
        <RichControls editorState={this.state.editorState} onToggle={this.onToggle} />
        <RichEditor ref="editor" onChange={this.onChange}></RichEditor>
      </div>
    );
  }
}

export default App;
