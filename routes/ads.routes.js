const express = require('express');
const router = express.Router();
const ads = require('../controllers/ads.controller');

router.route('/ads').get(ads.getAllAds);
router.route('/ads/:id').get(ads.getAdById);
router.route('/ads').post(ads.postAd);
router.route('/ads/:id').delete(ads.deleteAd);
router.route('/ads/:id').put(ads.updateAd);


module.exports = router;