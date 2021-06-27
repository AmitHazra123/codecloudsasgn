const router = require("express").Router();

// controllers
const attributeApi = require('../api/controllers/attribute');

router.get('/getAllAttributes', attributeApi.getAllAttributes);
router.get('/getAttributeById/:id', attributeApi.getAttributeById);
router.post('/createAttribute', attributeApi.createAttribute);
router.put('/updateAttributeById/:id', attributeApi.updateAttributeById);
router.delete('/deleteAttributeById/:id', attributeApi.deleteAttributeById);

module.exports = router;