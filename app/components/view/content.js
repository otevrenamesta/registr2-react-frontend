import React from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx'

@observer
class DocumentContentView extends React.Component {

  static contextTypes = {
    state: React.PropTypes.object.isRequired
  }

  renderTextArea() {
    return (
      <label>text content <a onClick={this.onTypeSwitch.bind(this)}>switch to upload</a>
        <textarea rows="10" onChange={this.updateField.bind(this)} placeholder="Zadej novou hodnotu">
          {this.context.state.values.file}
        </textarea>
      </label>
    )
  }

  render() {
    return (
      <div>
        <h2>document preview</h2>
        <span>tralala</span>
      </div>
    )
  }

}

export default DocumentContentView;
