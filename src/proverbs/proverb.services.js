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
      log.debug(deleted, 'Deleted proverb by Id');
      return { proverb: deleted, error: null };
    } catch (err) {
      log.error(err);
      return { proverb: null, error: err.message };
    }
  }

  async getAllProverbs() {
    try {
      const proverbs = await Proverb.find({}).lean();
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
    const doc = await Proverb.findById(id);
    const proverb = this.#mapToEntity(doc.toJSON());
    log.debug(proverb, 'Get proverb by Id');
    return proverb;
  }

  async getTags() {
    // Fetching distinct tags will return sorted string array.
    const tags = await Proverb.find().distinct('tags');
    log.trace(tags, 'Fetched unique proverb tag list');
    return tags;
  }

  async fetchRandomQuote(qry = { group: 'IT' }) {
    try {
      const cnt = await Proverb.countDocuments(qry);
      const rnd = Math.floor(Math.random() * cnt);
      const document = await Proverb.findOne(qry).skip(rnd);
      const proverb = this.#mapToEntity(document.toJSON());
      log.debug(proverb, `Fetched random quote (${rnd}/${cnt}) filtering
        on group: ${qry.group}`);
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
