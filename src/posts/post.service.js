import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime.js'
import pkg from 'validator';
const { isLength } = pkg;

import log from '../logger.js';
import Post from './post.model.js';

dayjs.extend(relativeTime)

class PostService {

  #mapToEntity(obj) {
    const yearsOld = dayjs().diff(dayjs(obj.updatedAt), 'year');
    const updated = dayjs(obj.updatedAt).fromNow();
    
    return {
      id: obj._id,
      title: obj.title,
      image: obj.image,
      description: obj.description,
      filename: obj.filename,
      author: obj.author,
      views: obj.views || 0,
      featured: obj.featured,
      tags: obj.tags,
      updated,
      yearsOld,
      createdAt: obj.createdAt,
      updatedAt: obj.updatedAt,
    };
  }

  async addPost(data) {
    try {
      const doc = await Post.create(data);
      const post = this.#mapToEntity(doc.toJSON());
      log.debug(post, 'Created post');
      return { post, error: null };
    } catch (err) {
      log.error(err);
      return { post: null, error: err.message };
    }
  }

  async deleteById(id) {
    try {
      const doc = await Post.findByIdAndDelete(id);
      const deleted = this.#mapToEntity(doc.toJSON());
      log.debug(deleted, `Deleted post by id: ${id}`);
      return { post: deleted, error: null };
    } catch (err) {
      log.error(err);
      return { post: null, error: err.message };
    }
  }

  async findPosts(qry = {}, sort = { 'updatedAt': -1 }) {
    try {
      log.debug(qry, 'Finding posts with query:');
      const docs = await Post.find(qry).sort(sort).lean();
      const posts = docs.map((doc) => this.#mapToEntity(doc));
      return { posts, error: null };
    } catch (err) {
      log.error(err);
      return { posts: [], error: err.message };
    }
  }

  async getPostById(id) {
    try {
      const doc = await Post.findById(id);
      const post = this.#mapToEntity(doc.toJSON());
      log.debug(post, `Get post by id: ${id}`);
      return post;
    } catch(err) {
      log.error(err);
      return null;
    }
  }

  async updatePost(id, data) {
    try {
      const doc = await Post.findByIdAndUpdate(id, data, { new: true });
      const updated = this.#mapToEntity(doc.toJSON());
      log.debug(updated, 'Updated post');
      return { post: updated, error: null };
    } catch (err) {
      log.error(err);
      return { post: null, error: err.message };
    }
  }

  async validate(data) {
    const error = {};

    const title = data.title ? data.title.trim() : '';
    if (!isLength(title, { min: 2, max: 100 })) error.name = 'Name must be 2 - 100 chars';

    const image = data.image ? data.image.trim() : '';
    // if (!isURL(image)) error.image = 'A valid image must be provided';

    const description = data.description ? data.description.trim() : '';
    const filename = data.filename ? data.filename.trim() : '';
    const author = data.author ? data.author.trim() : '';
    const featured = data.featured ? true : false;

    const value = {
      title,
      image,
      description,
      filename,
      author,
      featured,
    };

    const isValid = (Object.keys(error).length === 0);
    return { isValid, error, value };
  }
}

export default new PostService();
