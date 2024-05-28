import pkg from 'validator';
const { isLength, isURL } = pkg;

import Resource from './resource.model.js';
class ResourceService {


  #mapToEntity(r) {
    return r;
  }

  async addResource(data) {
    try {
      const res = await Resource.create(data);
      return { resource: this.#mapToEntity(res), error: null };
    } catch (err) {
      return { user: null, error: err };
    }
  }

  async validate(data) {
    const error = {};

    const name = data.name ? data.name.trim() : '';
    if (!isLength(name, { min: 2, max: 100 })) error.name = 'Name must be 2 - 100 chars';

    const url = data.url ? data.url.trim() : '';
    if (!isURL(url)) error.url = 'A valid URL must be provided';

    const value = {
      name,
    };

    const isValid = (Object.keys(error).length === 0);
    return { isValid, error, value };
  }
}

export default new ResourceService();

