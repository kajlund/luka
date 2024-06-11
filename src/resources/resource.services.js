import pkg from 'validator';
const { isLength, isURL } = pkg;

import Resource from './resource.model.js';
import { resourceCategories } from '../utils.js';
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

  async findResources(filter) {

    let qry = {};

    if (filter.category) {
      qry.category = filter.category
    }

    try {
      const resources = await Resource.find(qry);
      return { resources, error: null };
    } catch (error) {
      log.error(error);
      return { resources: [], error };
    }
  }

  getCategories() {
    return resourceCategories;
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

    const category = data.category ? data.category.trim() : '';
    if (!resourceCategories.includes(category)) {
      error.category = 'Category must be selected from category list';
    }

    const tags =  data.tags ? data.tags.split(' ') : [];

    const value = {
      name,
      url,
      description,
      category,
      tags,
    };

    const isValid = (Object.keys(error).length === 0);
    return { isValid, error, value };
  }
}



export default new ResourceService();
