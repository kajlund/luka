import { join } from 'node:path';
import { readFile } from 'node:fs/promises';

import markdownit from 'markdown-it';

import log from './logger.js';

class Utils {
  constructor() { }
  
  async parseMarkdownFile(aFileName) {
    const filePath = join(process.cwd(), 'doc', aFileName);
    try {
      const content = await readFile(filePath, { encoding: 'utf-8' });
      const md = markdownit();
      const result = md.render(content);
      return result;
    } catch (err) {
      log.error(err, `Error trying to render markdown file: ${filePath}`);
      return '';
    }
  }

  parseSort(sortStr) {
    const sortObj = {};
    const fldArr = sortStr.split(',');
    fldArr.forEach((fld) => {
      if (fld.indexOf('-') > -1) {
        sortObj[fld.slice(1)] = 'desc'
      } else {
        sortObj[fld] = 'asc'
      }
    });
    return sortObj;
  }
}

export default new Utils();
