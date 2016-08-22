import React from 'react';
import { observer } from 'mobx-react';
import {observable} from 'mobx'

@observer
class DocumentContentForm extends React.Component {

  static contextTypes = {
    state: React.PropTypes.object.isRequired
  }

  @observable dataIsText = true

  onFileSelected(e) {
    e.preventDefault()
    this.context.state.values.file = e.target.files[0]
  }

  onTypeSwitch(e) {
    e.preventDefault()
    this.dataIsText = !this.dataIsText
  }

  updateField(e) {
    e.preventDefault()
    this.context.state.values.file = e.target.value
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

  renderUpload() {
    const file = this.context.state.values.file
    const info = file ? (
      <div>
        <p>size: {file.size}</p>
        <p>type: {file.type}</p>
      </div>
    ) : null
    return (
      <label>file content <a onClick={this.onTypeSwitch.bind(this)}>switch to text</a>
        <input type="file" onChange={this.onFileSelected.bind(this)} />
        {info}
      </label>
    )
  }

  render() {
    return this.dataIsText ? this.renderTextArea() : this.renderUpload()
  }

}

export default DocumentContentForm;
