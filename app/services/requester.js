import axios from 'axios';

class DataRequester {

  _apiFlavor(q) {
    let converted = {
      _start: (q.page - 1) * q.perPage,
      _limit: q.perPage
    }
    if(q.sortField) {
      converted._sort = q.sortField
      converted._order = q.sortDir
    }
    return converted
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

  saveEntry(data, id=null) {
      let query;

      if (id) {
        query = axios.put(`${Conf.apiUrl}/${data.Type}/${id}`, data)
      } else {
        query = axios.post(`${Conf.apiUrl}/${data.Type}`, data)
      }

      return query.then((response) => {
        return response.data;
      });
  }
}

export default DataRequester;
