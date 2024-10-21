import pkg from 'validator';
const { isLength, isURL } = pkg;

import log from '../logger.js';
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
      return { resource: null, error: err };
    }
  }

  async addVotes(id, votes) {
    try {
      const updated = await Resource.findByIdAndUpdate(id, { $inc: { 'likes': votes }}, { new: true });
      return { resource: this.#mapToEntity(updated), error: null };
    } catch (err) {
      return { resource: null, error: err };
    }
  }

  async deleteById(id) {
    try {
      const result = await Resource.findByIdAndDelete(id);
      return { resource: this.#mapToEntity(result), error: null };
    } catch (err) {
      log.error(err);
      return { resource: null, error: err.message };
    }
  }

  async findResources(filter, sorting) {

    let sort = sorting ? sorting : { name : 1 }

    let qry = {};

    if (filter.tags.length) {
      qry.tags = { $all: filter.tags }
    }

    if (filter.name) {
      qry.name = filter.name;
    }

    log.debug(qry, 'Fetching resources with query:');

    try {
      const resources = await Resource.find(qry).sort(sort);
      return { resources, error: null };
    } catch (error) {
      log.error(error);
      return { resources: [], error };
    }
  }

    async getResourceById(id) {
    const obj = await Resource.findById(id);
    return obj;
  }

  async getTags() {
    const tags = await Resource.find({}).distinct('tags');
    return tags.sort();
  }

  async updateResource(id, data) {
    try {
      const resource = await Resource.findByIdAndUpdate(id, data, { new: true });
      return { resource, error: null };
    } catch (error) {
      return { resource: null, error };
    }
  }

  async validate(data) {
    const error = {};

    const name = data.name ? data.name.trim() : '';
    if (!isLength(name, { min: 2, max: 100 })) error.name = 'Name must be 2 - 100 chars';

    const url = data.url ? data.url.trim() : '';
    if (!isURL(url)) error.url = 'A valid URL must be provided';

    const description = data.description ? data.description.trim() : '';

    const tags =  data.tags ? data.tags.split(' ') : [];

    const value = {
      name,
      url,
      description,
      tags,
    };

    const isValid = (Object.keys(error).length === 0);
    return { isValid, error, value };
  }
}



export default new ResourceService();
