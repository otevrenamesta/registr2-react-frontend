import {observable, computed, action, transaction} from 'mobx';
import ListState from './list'

export default class AppState extends ListState {

  @observable values = {};  // for single item manipulation
  @observable errors = {}

  @action
  validateData() {
    transaction(() => {
      this.errors = {}
      if(! this.values.Title) {
        this.errors.Title = 'It is mandatory to fill title'
      }
      if(this.values.ResponsiblePersons.length === 0) {
        this.errors.ResponsiblePersons = 'It is mandatory to fill at least one responsible person'
      }
      if(this.values.file === null) {
        this.errors.file = 'It is mandatory to fill file!'
      }
    });
    return JSON.stringify(this.errors) === '{}'
  }

  @action
  loadCreateData(typ) {
    this.values = {
      file: null,
      Type: typ,
      ResponsiblePersons: [],
      Anonymised: false,
      Title: '',
      Amount: 0
    }
  }

  @action
  loadItemData(typ, id) {
    this.loading = true

    return this.requester.getEntry(id, typ).then((res) => {
      transaction(() => {
        this.loading = false
        this.originEntityId = id
        this.values = res.data
      })
    })
  }

  // called on each update of edit form. Validation performed here?
  @action
  updateData(fieldName, value, choiceFields=[]) {
    this.values[fieldName] = value;
  }

  @action
  saveData() {
    this.loading = true;
    const id = this.originEntityId;

    let rawEntry = {};
    for (let name in this.values) {
      rawEntry[name] = this.values[name];
    }

    return this.requester.saveEntry(rawEntry, id)
      .then((created) => {
        transaction(() => {
          this.values = created
          this.loading = false
        })
        return created
      });
  }

}
