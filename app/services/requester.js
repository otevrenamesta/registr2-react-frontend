import axios from 'axios';

class DataRequester {

  _apiFlavor(q) {
    return {
      _start: (q.page - 1) * q.perPage,
      _limit: q.perPage
    }
  }

  _getResponseTotalItems(response) {
    return parseInt(response.headers['x-total-count']) || response.data.length;
  }

  getEntries(typ, params) {

    let qParams = this._apiFlavor(params);

    return axios.get(`${Conf.apiUrl}/${typ}`, {params: qParams}).then((response) => {
      return {
        data: response.data,
        totalItems: this._getResponseTotalItems(response)
      };
    });

  }

  createEntry(view) {

  }

  getEntry(id, typ, options={}) {

    return axios.get(`${Conf.apiUrl}/${typ}/${id}`);

  }

  saveEntry(dataStore, view, rawEntry, id=null) {
      let query;

      if (id) {
          query = this.writeQueries.updateOne(view, rawEntry, id);
      } else {
          query = this.writeQueries.createOne(view, rawEntry);
      }

      return query.then((data) => {
          let entry = Entry.createFromRest(
              data,
              view.getFields(),
              view.entity.name(),
              view.identifier().name()
          );

          dataStore.fillReferencesValuesFromEntry(entry, view.getReferences(), true);

          dataStore.setEntries(view.getEntity().uniqueId, [entry]);

          return dataStore;
      });
  }
}

export default DataRequester;
