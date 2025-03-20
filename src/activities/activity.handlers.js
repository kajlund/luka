import svcActivity from './activity.service'

class ActivityHandlers { 
  async getActivities(req, res) {
      const user = req.session.user;
      const filter = {};
      const result = await svcActivity.findActivities(filter);
      res.json({
        success: true,
        data: result,
      });
    }
};

module.exports = ActivityHandlers;
