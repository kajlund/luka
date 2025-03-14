import bcrypt from 'bcryptjs';
import pkg from 'validator';
const { isLength, isEmail } = pkg;
import { NotFoundError, UnauthorizedError } from '../errors.js';

import log from '../logger.js';
import User from './user.model.js';

const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS, 10);

class UserService {
  constructor() {}

  #mapToEntity = (u) => {
    return {
      id: u._id,
      email: u.email,
      alias: u.alias,
      picture: u.picture,
      role: u.role,
      createdAt: u.createdAt,
      updatedAt: u.updatedAt,
    };
  }

  async login(email, password) {
    try {
      let user;
      const result = await User.findOne({ email });
      if (result) user = result.toJSON();
      if (!user) throw new NotFoundError(`User ${email} was not found`);
      if (user.role.includes('prospect')) throw new UnauthorizedError(`Prevented prospect ${email} from logging in`);
      const ok = await bcrypt.compare(password, user.password);
      if (!ok) throw new UnauthorizedError(`Prevented user ${email} from logging in`);
      return this.#mapToEntity(user);
    } catch (err) {
      log.error(err);
      return null;
    }
  }

  async register(data) {
    try {
      const salt = await bcrypt.genSalt(SALT_ROUNDS);
      data.password = await bcrypt.hash(data.password, salt);
      // Save to DB
      const user = await User.create(data);
      // Return registered user
      return { user: this.#mapToEntity(user), error: null };
    } catch (err) {
      log.error(err);
      return { user: null, error: err.message };
    }
  }

  async validate(data) {
    const error = {};

    const email = data.email?.trim() || '';
    if (!isEmail(email)) {
      error.email = 'Email must be a valid email address';
    } else {
      const found = await User.findOne({ email });
      if (found) error.email = `Email: ${email} is already registered`;
    }

    const alias = data.alias?.trim() || '';
    if (!isLength(alias, { min: 3, max: 20 })) error.alias = 'Alias must be 3 - 20 chars';

    const password = data.password;
    if (!isLength(password, { min: 8, max: 200 })) error.password = 'Password must be 8 - 200 chars';

    const confirm = data.password_confirmed;
    if (confirm !== password) error.password_confirmed = 'Password repeat must match password';

    const value = {
      email,
      alias,
      password,
    };

    const isValid = (Object.keys(error).length === 0);
    return { isValid, error, value };
  }
}

export default new UserService();
