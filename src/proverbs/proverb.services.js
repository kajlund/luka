import pkg from 'validator';
const { isLength } = pkg;

import log from '../logger.js';
import Proverb from './proverb.model.js';

class ProverbService {

  #mapToEntity = (p) => {
    return p
  }

  async addProverb(data) {
    try {
      const pv = await Proverb.create(data);
      return { proverb: this.#mapToEntity(pv), error: null };
    } catch (err) {
      log.error(err);
      return { proverb: null, error: err.message };
    }
  }

  async deleteById(id) {
    try {
      const result = await Proverb.findByIdAndDelete(id);
      return { proverb: this.#mapToEntity(result), error: null };
    } catch (err) {
      log.error(err);
      return { proverb: null, error: err.message };
    }
  }

  async getAllProverbs() {
    try {
      const proverbs = await Proverb.find({});
      return { proverbs, error: null };
    } catch (error) {
      log.error(error);
      return { proverbs: [], error };
    }
  }

  async getAuthors() {
    const authors = await Proverb.find().distinct('author');
    return authors.sort();
  }

  async getGroups() {
    const ids = await Proverb.find().distinct('group');
    return ids.sort();
  }

  async getProverbById(id) {
    const obj = await Proverb.findById(id);
    return obj;
  }

  async getTags() {
    const tags = await Proverb.find().distinct('tags');
    return tags.sort();
  }

  async fetchRandomQuote(group = 'IT') {
    try {
      const proverbs = await Proverb.find({ group });
      const idx = Math.floor(Math.random() * proverbs.length);
      const proverb = proverbs[idx].toJSON();
      return proverb;
    } catch (err) {
      log.error(err);
      return null;
    }
  }

  async updateProverb(id, data) {
    try {
      const proverb = await Proverb.findByIdAndUpdate(id, data, { new: true });
      return { proverb, error: null };
    } catch (error) {
      return { proverb: null, error };
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
