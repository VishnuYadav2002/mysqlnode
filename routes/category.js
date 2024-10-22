const express = require('express');
const {
    getCategory,
    getSubcategory,
    getChildgetcategories,
    getCategoryByID,
    createCategory
} = require('../controllers/category');

//router object
const router = express.Router();

//routes

//get all category 
router.get("/category", getCategory);
router.get('/subcategory', getSubcategory);
router.get('/chieldcategory', getChildgetcategories);

//get category by id
router.get('/category/:id', getCategoryByID);

//Create Category || POST
router.post('/createCategory' , createCategory)



module.exports = router