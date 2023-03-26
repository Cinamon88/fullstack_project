const Ad = require('../models/ad.model');
const getImageFileType = require('../utils/getImageFileType');
const fs = require('fs');

exports.getAllAds = async (req, res) => {
  try {
    res.json(await Ad.find().populate('user'));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAdById = async (req, res) => {
  try {
    const adId = await Ad.findOne({ _id: req.params.id }).populate('user');
    if (!adId) res.status(404).json({ message: 'Not found...' });
    else res.json(adId);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.newAdd = async (req, res) => {
  const { title, content, date, price, location } = req.body;
  const photo = req.file;

  try {
    const fileType = photo ? await getImageFileType(photo) : 'unknown'

    if (
      title && content && date &&
      price && location && photo &&
      ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)
    ) {
      const newAd = new Ad({
        title: title,
        content: content,
        date: date,
        price: price,
        location: location,
        photo: photo.filename,
        user: req.session.user
      });
      await newAd.save();
      res.json({ message: 'Created new ad' });
    } else {
      fs.unlinkSync(`./public/uploads/${photo.filename}`);
      res.status(400).send({ message: 'Bad request' });
    }
  } catch (err) {
    fs.unlinkSync(`./public/uploads/${photo.filename}`);
    res.status(500).send({ message: err.message });
  }
};

exports.editAdd = async (req, res) => {
  try {
    const { title, content, date, price, location } = req.body;
    const photo = req.file;
    const fileType = photo ? await getImageFileType(photo) : 'unknown'
    const ad = await Ad.findById(req.params.id);
    if (ad) {
      ad.title = title;
      ad.content = content;
      ad.date = date,
      ad.price = price;
      ad.location = location;
      if (photo && ['image/png', 'image/jpeg', 'image/gif'].includes(fileType)) {
        ad.photo = photo.filename;
      }
      await ad.save();
      res.json({ message: 'Edited ad' });
    } else {
      fs.unlinkSync(`./public/uploads/${photo.filename}`);
      res.status(400).send({ message: 'Bad request' });
    }
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.removeAdd = async (req, res) => {
  try {
    const ad = await Ad.findById(req.params.id);
    if (ad) {
      fs.unlinkSync(`./public/uploads/${ad.photo}`);
      await ad.deleteOne({ _id: req.params.id });
      res.json({ message: 'Ad deleted' });
    } else res.status(404).send({ message: 'Not found...' });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.searchPhrase = async (req, res) => {
  const { searchPhrase } = req.params;
  try {
    const ad = await Ad.find({ title: { $regex: searchPhrase } });
    if (!ad) return res.status(404).json({ message: 'Bot found...' });
    else res.json(ad);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};