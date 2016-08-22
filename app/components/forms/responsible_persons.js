import React from 'react'
import { observer } from 'mobx-react'
import {observable} from 'mobx'

@observer
class ResponsiblePersons extends React.Component {

  static contextTypes = {
    state: React.PropTypes.object.isRequired
  }

  @observable showAddForm = false
  @observable editedIdx = null
  @observable currItem = null

  createItems() {
    let persons = this.context.state.values.ResponsiblePersons
    if(persons === undefined || ! persons.length) {
      return (<p>Zatim zadne</p>)
    }
    return persons.map((p, idx) => {
      if(idx === this.editedIdx) {
        return (
          <li>
            <div className="small-6 columns">
              <input type="text" value={this.currItem}
                onChange={this.updateField.bind(this)}
                placeholder="Zadej novou hodnotu" />
            </div>
            <div className="small-6 columns">
              <button className="button" onClick={this.onOk.bind(this)}>ok</button>
              <button className="button secondary" onClick={this.onCancel.bind(this)}>cancel</button>
            </div>
          </li>
        )
      }
      return (<li>{p} <a onClick={this.onEdit(idx)}>edit</a> <a onClick={this.onRemove(p)}>remove</a></li>)
    })
  }

  onShowEdit(e) {
    e.preventDefault()
    this.showAddForm = true
  }

  onCancel(e) {
    e.preventDefault()
    this.showAddForm = false
  }

  onEdit(item) {
    return (e) => {
      e.preventDefault()
      this.editedIdx = item
      this.currItem = item
    }
  }

  onRemove(val) {
    const persons = this.context.state.values.ResponsiblePersons
    return (e) => {
      e.preventDefault()
      persons.remove(val)
    }
  }

  onOk(e) {
    e.preventDefault()
    if(this.context.state.values.ResponsiblePersons === undefined) {
      this.context.state.values.ResponsiblePersons = [];
    }
    if(this.editedIdx !== null) {
      this.context.state.values.ResponsiblePersons[this.editedIdx] = this.currItem
      this.editedIdx = null;
    } else {
      this.context.state.values.ResponsiblePersons.push(this.currItem)
    }
  }

  updateField(e) {
    e.preventDefault()
    this.currItem = e.target.value
  }

  renderAddForm() {
    if(this.showAddForm === true) {
      return (
        <div className="row">
          <div className="small-6 columns">
            <input type="text" value={this.currItem}
              onChange={this.updateField.bind(this)}
              placeholder="Zadej novou persoonu" />
          </div>
          <div className="small-6 columns">
            <button className="button" onClick={this.onOk.bind(this)}>ok</button>
            <button className="button secondary" onClick={this.onCancel.bind(this)}>cancel</button>
          </div>
        </div>
      )
    } else {
      return (<button className="button" onClick={this.onShowEdit.bind(this)}>add</button>)
    }
  }

  render() {
    return (
      <div>
        <ul>
          {this.createItems()}
        </ul>
        {this.renderAddForm()}
      </div>
    )
  }

}

export default ResponsiblePersons
