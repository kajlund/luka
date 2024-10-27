import pkg from 'validator';
const { isLength } = pkg;

import log from '../logger.js';
import Proverb from './proverb.model.js';

class ProverbService {

  #mapToEntity = (obj) => {
    return {
      id: obj._id,
      title: obj.title,
      content: obj.content,
      author: obj.author,
      description: obj.description,
      group: obj.group,
      tags: obj.tags,
      createdAt: obj.createdAt,
      updatedAt: obj.updatedAt,
    };
  }

  async addProverb(data) {
    try {
      const doc = await Proverb.create(data);
      const proverb = this.#mapToEntity(doc.toJSON());
      log.debug(proverb, 'Created proverb');
      return { proverb, error: null };
    } catch (err) {
      log.error(err);
      return { proverb: null, error: err.message };
    }
  }

  async deleteById(id) {
    try {
      const doc = await Proverb.findByIdAndDelete(id);
      const deleted = this.#mapToEntity(doc.toJSON());
      log.debug(deleted, `Deleted proverb by id: ${id}`);
      return { proverb: deleted, error: null };
    } catch (err) {
      log.error(err);
      return { proverb: null, error: err.message };
    }
  }

  async findProverbs(qry = {}, sort = { 'updatedAt': -1 }) {
    try {
      log.debug(qry, 'Finding provebs with query:');
      const docs = await Proverb.find(qry).sort(sort).lean();
      const proverbs = docs.map((doc) => this.#mapToEntity(doc));
      return { proverbs, error: null };
    } catch (err) {
      log.error(err);
      return { proverbs: [], error: err.message };
    }
  }

  async getAuthors() {
    // Fetching distinct author will return sorted string array.
    try {
      const authors = await Proverb.find().distinct('author');
      log.trace(authors, 'Fetched unique authors list');
      return authors;
    } catch (err) {
      log.error(err);
      return [];
    }
  }

  async getGroups() {
    // Fetching distinct group will return sorted string array.
    try {
      const groups = await Proverb.find().distinct('group');
      log.trace(groups, 'Fetched unique groups list');
      return groups;
    } catch (err) {
      log.error(err);
      return [];
    }
  }

  async getProverbById(id) {
    try {
      const doc = await Proverb.findById(id);
      const proverb = this.#mapToEntity(doc.toJSON());
      log.debug(proverb, `Get proverb by id: ${id}`);
      return proverb;
    } catch (err) {
      log.error(err);
      return null;
    }
  }

  async getTags() {
    // Fetching distinct tags will return sorted string array.
    try {
      const tags = await Proverb.find().distinct('tags');
      log.trace(tags, 'Fetched unique proverb tag list');
      return tags;
    } catch (err) {
      log.error(err);
      return [];
    }
  }

  async fetchRandomQuote(qry = { group: 'IT' }) {
    try {
      const cnt = await Proverb.countDocuments(qry);
      const rnd = Math.floor(Math.random() * cnt);
      const doc = await Proverb.findOne(qry).skip(rnd);
      const proverb = this.#mapToEntity(doc.toJSON());
      log.debug(proverb, `Fetched random quote (${rnd}/${cnt}) filtering on group: ${qry.group}`);
      return proverb;
    } catch (err) {
      log.error(err);
      return null;
    }
  }

  async updateProverb(id, data) {
    try {
      const doc = await Proverb.findByIdAndUpdate(id, data, { new: true });
      const updated = this.#mapToEntity(doc.toJSON());
      log.debug(updated, 'Updated proverb');
      return { proverb: updated, error: null };
    } catch (err) {
      log.error(err);
      return { proverb: null, error: err.message };
    }
  }

  async validate(data) {
    const error = {};

    const title = data.title ? data.title.trim() : '';
    if (!isLength(title, { min: 3, max: 100 })) error.title = 'Title must be 3 - 100 chars';

    const content = data.content ? data.content.trim() : '';
    if (!content) error.content = 'Content cannot be empty';

    const author = data.author ? data.author.trim() : '';
    if (!author) error.author = 'Author cannot be empty';

    const description = data.description ? data.description.trim() : '';

    const group = data.group ? data.group.trim() : '';
    if (!isLength(group, { min: 2, max: 50 })) error.group = 'Group must be 2 - 50 chars';

    const tags =  data.tags ? data.tags.split(' ') : [];

    const value = {
      title,
      content,
      author,
      description,
      group,
      tags,
    };

    const isValid = (Object.keys(error).length === 0);
    return { isValid, error, value };
  }
}

export default new ProverbService();
