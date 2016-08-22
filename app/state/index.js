import {observable, computed, action, transaction} from 'mobx';

export default class AppState {

  constructor(requester) {
    this.requester = requester;
  }

  perPage = 2;

  @observable loggedUser = null;

  @observable totalItems = 0;
  @observable page = 1;
  @observable searchedType = null;
  @observable sortDir = null;
  @observable sortField = null;
  @observable found = [];
  @observable totalItems = 0;

  @observable values = {};  // for single item manipulation
  @observable errors = {}

  @observable loading = false;


  @action
  login(uname, passwd) {
    this.loggedUser = {
      name: 'Pokusny Kralik',
      uname: uname
    };
  }

  @action
  logout() {
    this.loggedUser = null;
  }

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
  updateFilters(newFilters) {
    transaction(() => {
      // check if visible need to hide
      this.visibleFilters.filter((f) => ! (f.name() in newFilters))
        .forEach((i) => this.visibleFilters.remove(i));
      this.loading = true;
    });
    // update data
    return this.requester.getEntries(this.searchedType, this.page, {
      references: true,
      choices: true,
      sortField: this.sortField,
      sortDir: this.sortDir,
      perPage: this.perPage,
      filters: newFilters
    }).then((collection) => {
      transaction(() => {
        this.filters = newFilters;
        this.totalItems = collection.totalItems;
        this.found.replace(collection.data);
        this.loading = false;
      });
    });
  }

  @action
  updatePage(page) {
    this.loading = true;
    return this.requester.getEntries(this.searchedType, {
      page, sortField: this.sortField, sortDir: this.sortDir, perPage: this.perPage
    }).then((collection) => {
      transaction(() => {
        this.page = page;
        this.totalItems = collection.totalItems;
        this.found.replace(collection.data);
        this.loading = false;
      });
    });
  }

  @action
  updateSort(sortField, sortDir) {
    this.loading = true;
    return this.requester.getEntries(this.searchedType, {
      page: this.page, sortField, sortDir, perPage: this.perPage
    }).then((collection) => {
      transaction(() => {
        this.sortField = sortField;
        this.sortDir = sortDir;
        this.totalItems = collection.totalItems;
        this.found.replace(collection.data);
        this.loading = false;
      });
    });
  }

  @action
  loadListData(typ, page = 1, sortField = null, sortDir = null, filters = null) {
    this.loading = true;
    this.searchedType = typ;

    return this.requester.getEntries(typ, {
      page, sortField, sortDir, perPage: this.perPage
    }).then((collection) => {
      transaction(() => {
        this.page = page;
        this.sortField = sortField;
        this.sortDir = sortDir;
        this.filters = filters;
        this.totalItems = collection.totalItems;
        this.found.replace(collection.data);
        this.loading = false;
      });
    });

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
  loadShowData(entityName, id, sortField, sortDir) {
    transaction(() => {
      this.view = this.getView(entityName, 'ShowView');
      this.loading = true;
    });

    return this.requester.getEntry(this.view, id, {
      references: true, referencesList: true, sortField, sortDir
    }).then((dataStore) => {
      transaction(() => {
        this.loading = false;
        this.dataStore = dataStore;
      });
    });
  }

  // @action
  // loadEditData(entityName, id, sortField, sortDir) {
  //   transaction(() => {
  //     this.view = this.getView(entityName, 'EditView');
  //     this.loading = true;
  //   });
  //
  //   return this.requester.getEntry(this.view, id, {
  //     references: true, referencesList: true, choices: true, sortField, sortDir
  //   }).then((dataStore) => {
  //     transaction(() => {
  //       this.originEntityId = id;
  //       this.dataStore = dataStore;
  //       let entry = dataStore.getFirstEntry(this.view.entity.uniqueId);
  //       for (let fieldName in entry.values) {
  //         this.values[fieldName] = entry.values[fieldName];
  //       }
  //       this.loading = false;
  //     });
  //   });
  // }

  // called on each update of edit form. Validation performed here?
  @action
  updateData(fieldName, value, choiceFields=[]) {
    this.values[fieldName] = value;

    // Handle related values between choice fields
    if (choiceFields.length) {
        choiceFields.map((field) => {
            if (fieldName === field.name()) {
                return;
            }

            let choices = field.choices();
            if ('function' === typeof choices) {
                choices = choices({ values: this.values });
            }

            let valueInChoices = false;
            choices.map((v) => {
                if (v.value === this.values[field.name()]) {
                    valueInChoices = true;
                }
            });

            if (!valueInChoices) {
                this.values[field.name()] = null;
            }
        });
    }
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
