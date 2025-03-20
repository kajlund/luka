import log from '../logger.js';
import Activity from './activity.model.js';

class ActivityService { 
  findActivities = async (filter) => {
    try {
      log.debug(filter, 'Finding activities with query:');
      const docs = await Activity.find(filter).lean();
      // const activities = docs.map((doc) => this.#mapToEntity(doc));
      return docs;
    } catch (err) {
      log.error(err);
      return { activities: null, error: err.message };
    }
  }
}

