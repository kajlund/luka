import pkg from 'validator';

import log from '../logger.js';
import Resource from './resource.model.js';
import Utils from '../utils.js';

const { isLength, isURL } = pkg;

class ResourceService {

  #mapToEntity(obj) {
    return {
      id: obj._id,
      name: obj.name,
      url: obj.url,
      description: obj.description,
      likes: obj.likes,
      tags: obj.tags,
      createdAt: obj.createdAt,
      updatedAt: obj.updatedAt,
    };
  }

  async addResource(data) {
    try {
      const doc = await Resource.create(data);
      const res = this.#mapToEntity(doc.toJSON());
      log.debug(res, 'Created resource');
      return { resource: res, error: null };
    } catch (err) {
      log.error(err);
      return { resource: null, error: err.message };
    }
  }

  async addVotes(id, votes) {
    try {
      const updated = await Resource.findByIdAndUpdate(id, { $inc: { 'likes': votes }}, { new: true });
      return { resource: this.#mapToEntity(updated), error: null };
    } catch (err) {
      log.error(err);
      return { resource: null, error: err.message };
    }
  }

  async deleteById(id) {
    try {
      const doc = await Resource.findByIdAndDelete(id);
      const deleted = this.#mapToEntity(doc.toJSON());
      log.debug(deleted, `Deleted resource by id: ${id}`);
      return { resource: deleted, error: null };
    } catch (err) {
      log.error(err);
      return { resource: null, error: err.message };
    }
  }

  async findResources(fltTags = [], fltName = '', sort = 'name') {
    const qry = {}
    if (fltTags.length) qry.tags = { $all: fltTags };
    if (fltName) qry.name = { '$regex': fltName, '$options': 'i' };
    const sortObj = Utils.parseSort(sort);

    log.debug(qry, 'Fetching resources with query:');
    log.debug(sortObj, 'and sort:');

    try {
      const docs = await Resource.find(qry).sort(sortObj).lean();
      const resources = docs.map((doc) => this.#mapToEntity(doc));
      return { resources, error: null };
    } catch (err) {
      log.error(err);
      return { resources: [], error: err.message };
    }
  }

  async getResourceById(id) {
    try {
      const doc = await Resource.findById(id);
      const res = this.#mapToEntity(doc.toJSON());
      log.debug(res, `Get resource by id: ${id}`);
      return res;
    } catch (err) {
      log.error(err);
      return null;
    }  
  }

  async getTags() {
    // Fetching distinct tags will return sorted string array.
    try {
      const tags = await Resource.find({}).distinct('tags');
      log.trace(tags, 'Fetched unique resources tag list');
      return tags;
    } catch (err) {
      log.error(err);
      return [];
    }
  }

  async updateResource(id, data) {
    try {
      const doc = await Resource.findByIdAndUpdate(id, data, { new: true });
      const updated = this.#mapToEntity(doc.toJSON());
      log.debug(updated, 'Updated resource');
      return { resource: updated, error: null };
    } catch (err) {
      log.error(err);
      return { resource: null, error: err.message };
    }
  }

  async validate(data) {
    const error = {};

    const name = data.name?.trim() || '';
    if (!isLength(name, { min: 2, max: 100 })) error.name = 'Name must be 2 - 100 chars';

    const url = data.url?.trim() || '';
    if (!isURL(url)) error.url = 'A valid URL must be provided';

    const description = data.description?.trim() || '';

    const tags =  data.tags?.split(' ') || [];

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
