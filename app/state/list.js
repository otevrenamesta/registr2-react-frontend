import {observable, computed, action, transaction} from 'mobx';
import BaseState from './base'

export default class ListState extends BaseState {

  @observable totalItems = 0;
  @observable page = 1;
  @observable searchedType = null;
  @observable sortDir = null;
  @observable sortField = null;
  @observable found = [];
  @observable totalItems = 0;

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

}
