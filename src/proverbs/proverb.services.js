// import pkg from 'validator';
// const { isLength, isEmail } = pkg;
// import { BadRequestError, NotFoundError, UnauthorizedError } from '../errors.js';

import log from '../logger.js';
import Proverb from './proverb.model.js';

class ProverbService {
  constructor() {}

  #mapToEntity = (p) => {
    return p
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

  async fetchRandomQuote(group = 'IT') {
    try {
      const proverbs = await Proverb.find({ group });
      const idx = Math.floor(Math.random() * proverbs.length);
      const proverb =  proverbs[idx];
      return proverb;
    } catch (err) {
      log.error(err);
      return null;
    }
  }

  async validate(data) {
    const error = {};

    const value = {};

    const isValid = (Object.keys(error).length === 0);
    return { isValid, error, value };
  }
}

export default new ProverbService();
