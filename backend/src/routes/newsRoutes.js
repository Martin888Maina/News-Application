const router = require('express').Router();
const ctrl = require('../controllers/newsController');

router.get('/everything', ctrl.searchEverything);
router.get('/top-headlines', ctrl.fetchTopHeadlines);
router.get('/sources', ctrl.fetchSources);

module.exports = router;
