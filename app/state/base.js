import { observable, action } from 'mobx';

export default class BaseState {

  constructor(requester) {
    this.requester = requester;
  }

  perPage = 2;

  @observable loading = false;
  @observable loggedUser = null;

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

}
