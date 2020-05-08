const UserModel = require('../models/user');
const SeedModel = require('../models/seed');
const FeatureModel = require('../models/feature');
const asyncMiddleware = require('../utils/asyncMiddleware');
const status = require('../utils/statusCodes');
const passwordUtils = require('../utils/passwordHash');
const jwt = require('../utils/jwt');

const featureActions = {
    addFeature: asyncMiddleware(async (req, res) => {
        let feature = await FeatureModel.findOne({ name: req.body.name });
        if (feature) {
            res.status(status.success.accepted).json({
                message: 'Feature Already Exists',
                status: 'failure'
            });
        } else {
            // Save new feature to db
            let newFeature = new FeatureModel({ ...req.body });
            let savedFeature = await newFeature.save();

            res.status(status.success.created).json({
                message: 'Feature Created Successfully',
                status: 'success',
                data: savedFeature,
            });
        }
    }),
    getFeatureInfo: asyncMiddleware(async (req, res) => {
        // let feature = await FeatureModel.findById({ plainName: req.params.name });
        let feature = await FeatureModel.findById(req.params.name);
        if (feature) {
            res.status(status.success.accepted).json({
                message: 'Details Of Feature',
                status: 'success',
                data: feature
            });
        } else {
            res.status(status.success.accepted).json({
                message: 'Feature Not Found',
                status: 'failure'
            });
        }
    }),

    getFeatureList: asyncMiddleware(async (req, res) => {
        let features = await FeatureModel.find();
        if (features) {
            res.status(status.success.accepted).json({
                message: 'List Of Features',
                status: 'success',
                data: features
            });
        } else {
            res.status(status.success.accepted).json({
                message: 'Features Not Found',
                status: 'failure'
            });
        }
    }),

    updateFeature: asyncMiddleware(async (req, res) => {
        let feature = await FeatureModel.findOneAndUpdate({ plainName: req.params.name }, req.body, { new: true });
        if (feature) {
            res.status(status.success.accepted).json({
                message: 'Feature Updated',
                status: 'success',
                data: feature
            });
        } else {
            res.status(status.success.accepted).json({
                message: 'Feature Not Upadted',
                status: 'failure'
            });
        }
    }),
    deleteFeature: asyncMiddleware(async (req, res) => {
        let feature = await FeatureModel.findByIdAndRemove(req.params.id);
        if (feature) {
            res.status(status.success.accepted).json({
                message: 'Feature deleted',
                status: 'success',
            });
        } else {
            res.status(status.success.accepted).json({
                message: 'Feature Not Deleted',
                status: 'failure'
            });
        }
    }),

    insertFeatureImages: asyncMiddleware(async (req, res) => {
        let feature = await FeatureModel.findOneAndUpdate({ plainName: req.params.name }, { $push: { "images": { "$each": req.body.images } } },
            { new: true }
        )
        if (feature) {
            res.status(status.success.accepted).json({
                message: 'Feature Updated',
                status: 'success',
                data: feature
            });
        } else {
            res.status(status.success.accepted).json({
                message: 'Feature Not Upadted',
                status: 'failure'
            });
        }
    }),

    recaptchaImages: asyncMiddleware(async (req, res) => {
        let feature = await FeatureModel.findOne({ plainName: req.params.name });
        // let feature = await FeatureModel.findById(req.params.name);

        let images = [];
        if (feature) {
            let random = Math.floor(Math.random() * Math.floor(3));
            random = random == 0 ? 2 : random
            for (let i = 0; i < random; i++) {
                let randomIndex = Math.floor(Math.random() * Math.floor(feature.images.length));
                let image = {
                    _id: feature._id,
                    imageUrl: feature.images[randomIndex],
                    name: feature.plainName
                }
                images.push(image)
            }

            let seed = await SeedModel.find();
            if (seed) {
                for (let i = 0; images.length < 9; i++) {
                    let randomIndex = Math.floor(Math.random() * Math.floor(seed[0].satelliteImages.length));
                    let image = {
                        imageUrl: seed[0].satelliteImages[randomIndex],
                        name: 'satellite'
                    }
                    images.push(image)
                }
            }
            res.status(status.success.accepted).json({
                message: 'reCaptcha Images',
                status: 'success',
                data: images
            });
        } else {
            res.status(status.success.accepted).json({
                message: 'Feature Not Upadted',
                status: 'failure'
            });
        }
    }),

    boundingImages: asyncMiddleware(async (req, res) => {
        let feature = await FeatureModel.findOne({ plainName: req.params.name })
        if (feature) {
            res.status(status.success.accepted).json({
                message: 'Bounding Images',
                status: 'success',
                data: feature
            });
        }
    })
}

module.exports = featureActions;
