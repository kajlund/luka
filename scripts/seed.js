import { readFile } from 'node:fs/promises';

import 'dotenv/config';

import log from '../src/logger.js';
import db from '../src/db.js';

import Resource from '../src/resources/resource.model.js';
import { triggerAsyncId } from 'node:async_hooks';

const resourceData = JSON.parse(await readFile(new URL('./luka.resources.json', import.meta.url)));

async function seedResources() {
  const resources = [];
  
  for (let r of resourceData) {
    const cat = r.category.toLowerCase();
    if (cat && !r.tags.includes(cat)) {
      r.tags = [cat, ...r.tags];
    }
    resources.push({
      name: r.name,
      url: r.url,
      description: r.description,
      likes: r.likes || 0,
      tags: r.tags,
      createdAt: r.createdAt.$date,
      updatedAt: r.updatedAt.$date,
    });
  }
  // Clear collection
  await Resource.deleteMany();
  // Insert data
  await Resource.insertMany(resources);
  log.info(`Seeded ${resources.length} resources`);
}

async function main() {
  log.info(`Seeding data. Environment: ${process.env.NODE_ENV}`)
  
  await db.connect();
  try {
    await seedResources();

    log.info('Seeding successfully done');
  } finally {
    await db.disconnect();
  }
}

main().catch((err) => {
  log.error(err);
  process.exit(1);
});
