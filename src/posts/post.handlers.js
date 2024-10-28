import dayjs from 'dayjs';

import svcPost from './post.service.js';
import Utils from '../utils.js';

class PostHandlers {
  async addPost(req, res) {
    const user = req.session.user;
    if (!user || !user.role.includes('admin')) {
      req.flash('info', 'Not allowed. Admins only');
      return res.redirect('/');
    }

    const validation = await svcPost.validate(req.body);
    if (!validation.isValid) return res.render('posts/edit', {
      title: 'Add Post',
      page: 'blog',
      user,
      insertMode: true,
      value: validation.value,
      error: validation.error
    });

    const result = await svcPost.addPost(validation.value);
    if (result.error) {
      req.flash('error', `Error saving post: ${result.error}`);
    } else {
      req.flash('info', `Added post ${result.post.title}`);
    }
    res.redirect('/posts');
  }

  async deletePost(req, res) {
    const user = req.session.user;
    if (!user || !user.role.includes('admin')) {
      req.flash('info', 'Not allowed. Admins only');
      return res.redirect('/');
    }
    const id = req.params.id;
    const result = await svcPost.deleteById(id);
    if (result.error) {
      req.flash('error', `Error deleting post: ${result.error}`);
    } else {
      req.flash('info', `Deleted post ${result.post.title}`);
    }
    res.redirect('/posts');
  }

  async showAddPostForm(req, res) {
    const user = req.session.user;
    if (!user || !user.role.includes('admin')) {
      req.flash('info', 'Not allowed. Admins only');
      return res.redirect('/posts');
    }
    res.render('posts/edit', {
      title: 'Add Post',
      page: 'blog',
      user,
      insertMode: true,
      value: { title: '', image: '', description: '', filename: '', author: '', featured: false },
      error: {}
    });
  }

  async showEditPostForm(req, res) {
    const user = req.session.user;
    if (!user || !user.role.includes('admin')) {
      req.flash('info', 'Not allowed. Admins only');
      return res.redirect('/posts');
    }
    const id = req.params.id;
    const value = await svcPost.getPostById(id);
    if (!value) {
      req.flash('error', `Post with id ${id} was not found`);
      return res.redirect('/posts');
    }

    res.render('posts/edit', {
      title: 'Edit Post',
      page: 'blog',
      user,
      insertMode: false,
      postId: id,
      value,
      error: {}
    });
  }

  async showPosts(req, res) {
    const user = req.session.user;
    const filter = {};
    const result = await svcPost.findPosts(filter);
    res.render('posts/list', {
      title: 'Blog',
      page: 'blog',
      user,
      posts: result.posts,
    });
  }

  async updatePost(req, res) {
    const user = req.session.user;
    if (!user || !user.role.includes('admin')) {
      req.flash('info', 'Not allowed. Admins only');
      return res.redirect('/posts');
    }

    const id = req.params.id;
    const validation = await svcPost.validate(req.body);
    if (!validation.isValid) return res.render('posts/edit', {
      title: 'Edit Post',
      page: 'blog',
      user,
      insertMode: false,
      postId: id,
      value: validation.value,
      error: validation.error
    });

    const result = await svcPost.updatePost(id, validation.value);
    if (result.error) {
      req.flash('error', `Error saving post: ${result.error}`);
    } else {
      req.flash('info', `Updated post ${result.post.title}`);
    }
    res.redirect('/posts');
  }

  async viewPost(req, res) {
    const user = req.session.user;
    const id = req.params.id;
    const post = await svcPost.getPostById(id);
    if (!post) {
      req.flash('error', `Post with id ${id} was not found`);
      return res.redirect('/posts');
    }

    let content = await Utils.parseMarkdownFile(post.filename);
    const postUpdatedAt = dayjs(post.updatedAt).format('D MMM YYYY');
    res.render('posts/view', {
      title: 'View Post',
      page: 'blog',
      user,
      post,
      content,
      isOld: post.yearsOld > 2,
      postUpdatedAt,
    });
  }
}

export default new PostHandlers();
