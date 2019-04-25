import objectToFormData from 'object-to-formdata';
import * as axios from 'axios';
import { getToken } from '../utils/token';
import { decodeText } from '../utils/text';

class HttpActions {
  constructor(baseURL) {
    this.request = axios.create({ baseURL });
  }

  decodeRespData(resp = {}) {
    return {
      ...resp,
      data: JSON.parse(decodeText(JSON.stringify(resp.data))),
    };
  }

  getOptions(extraOptions = {}) {
    const token = getToken();
    let options = { headers: {} };

    if (token) {
      options.headers.Authorization = `Bearer ${token}`;
    }

    options = {
      ...options,
      ...extraOptions,
      headers: {
        ...options.headers,
        ...extraOptions.headers,
      },
    };

    return options;
  }

  get(url, params, options) {
    const config = { params, ...this.getOptions(options) };

    return this.request.get(url, config)
      .then(this.decodeRespData.bind(this));
  }

  post(url, data, options) {
    const formData = objectToFormData(data, {
      indices: true,
    });

    return this.request.post(url, formData, { ...this.getOptions(options) })
      .then(this.decodeRespData.bind(this));
  }

  patch(url, data, options) {
    const formData = objectToFormData(data, {
      indices: true,
    });

    return this.request.patch(url, formData, { ...this.getOptions(options) })
      .then(this.decodeRespData.bind(this));
  }

  put(url, data, params, options) {
    const formData = objectToFormData(data, {
      indices: true,
    });

    return this.request.put(url, formData, { params, ...this.getOptions(options) })
      .then(this.decodeRespData.bind(this));
  }

  del(url, data, params, options) {
    const config = {
      url, data, params, ...this.getOptions(options),
    };

    return this.request.delete(url, config)
      .then(this.decodeRespData.bind(this));
  }
}

export default HttpActions;
