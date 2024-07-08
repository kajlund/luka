import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js'
import pkg from 'validator';
const { isLength } = pkg;

import log from '../logger.js';
import Post from './post.model.js';

dayjs.extend(relativeTime)

class PostService {

  #mapToEntity(r) {
    const yearsOld = dayjs().diff(dayjs(r.updatedAt), 'year');
    const updated = dayjs(r.updatedAt).fromNow();
    const post = { ...{}, ...r, ...{ updated, yearsOld } }
    log.info(post);
    return post;
  }

  async addPost(data) {
    try {
      const res = await Post.create(data);
      return { post: this.#mapToEntity(res), error: null };
    } catch (err) {
      return { resource: null, error: err };
    }
  }

  async deleteById(id) {
    try {
      const result = await Post.findByIdAndDelete(id);
      return { post: this.#mapToEntity(result), error: null };
    } catch (err) {
      log.error(err);
      return { post: null, error: err.message };
    }
  }

  async findPosts(filter) {
    let qry = {};
    log.debug(qry, 'Fetching posts with query:');

    try {
      const posts = await Post.find(qry);
      return { posts, error: null };
    } catch (error) {
      log.error(error);
      return { posts: [], error };
    }
  }

  async getPostById(id) {
    const obj = await Post.findById(id);
    return this.#mapToEntity(obj.toJSON());
  }

  async updatePost(id, data) {
    try {
      const post = await Post.findByIdAndUpdate(id, data, { new: true });
      return { post: this.#mapToEntity(post) , error: null };
    } catch (error) {
      return { post: null, error };
    }
  }

  async validate(data) {
    const error = {};

    const title = data.title ? data.title.trim() : '';
    if (!isLength(title, { min: 2, max: 100 })) error.name = 'Name must be 2 - 100 chars';

    const image = data.image ? data.image.trim() : '';
    // if (!isURL(image)) error.image = 'A valid image must be provided';

    const description = data.description ? data.description.trim() : '';
    const content = data.content ? data.content.trim() : '';
    const author = data.author ? data.author.trim() : '';

    const value = {
      title,
      image,
      description,
      content,
      author,
    };

    const isValid = (Object.keys(error).length === 0);
    return { isValid, error, value };
  }

}

export default new PostService();
