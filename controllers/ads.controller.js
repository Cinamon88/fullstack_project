const Ads = require('../models/Ad.model');

exports.getAllAds = async (req, res) => {
    try {
        res.json(await Ads.find().populate('User'));
    } catch (err) {
        res.status(500).json({ message: err });
    };
};

exports.getAdById = async (req, res) => {
    try {
        const ad = await Ads.findById(req.params.id).populate('User');
        if (!ad) res.status(404).json({ message: 'Not found' });
        else res.json(ad);
    } catch (err) {
        res.status(500).json({ message: err });
    };
};

exports.postAd = async (res, req) => {
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

exports.deleteAd = async (res, req) => {
    try {
        const ad = await Ads.findById(req.params.id);
        if (ad) {
            await Ads.deleteOne({ _id: req.params.id });
            res.json(ad);
        } else res.status(404).json({ message: 'Not found...' });
    } catch (err) {
        res.status(500).json({ message: err });
    };
};

exports.updateAd = async (res, req) => {
    const { title, description, date, image, price, localization, user } = req.body;
    try {
        const ad = await Ads.findById(req.params.id);
        if (!ad) {
            return res.status(404).json({ message: 'Ad not found...' });
        } else {
            ad.title = title;
            ad.description = description;
            ad.price = price;
            ad.date = date;
            ad.localization = localization;
            ad.user = user;
            ad.image = image;
            await ad.save();
            res.json({ message: 'OK' });
        }
    } catch (err) {
        res.status(500).json({ message: err });
    };
};

