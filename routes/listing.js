if(process.env.NODE_ENV !="production"){
require('dotenv').config();
}
// console.log(process.env.SECRET);

const express=require("express");
const router=express.Router({mergeParams:true});
const wrapAsync=require("../utils/wrapAsync.js");
const ExpressError=require("../utils/ExpressError.js");
const {listingSchema,reviewSchema}=require("../schema.js");
const Listing=require("../models/listing.js");
const Review=require("../models/review.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const listingController=require("../controllers/listings.js");
const multer=require('multer');
const {storage}=require("../cloudConfig.js");
const upload=multer({storage});
// const upload=multer({dest:'uploads/'})
//Index route
router.get("/",wrapAsync (listingController.index));

//New route
router.get("/new",isLoggedIn,listingController.renderNewForm);


//Create route
router.post("/",isLoggedIn,upload.single('listing[image]'),listingController.createListing);
// router.post("/",upload.single('listing[image]'),(req,res)=>{
//     res.send(req.file);
// })

//Show route
router.get("/:id",wrapAsync (listingController.showListing));

//Edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync (listingController.renderEditForm));

//Update Route
router.put("/:id",isLoggedIn,isOwner,upload.single('listing[image]'),wrapAsync (listingController.updateListing));


//delete route
router.delete("/:id",isLoggedIn,isOwner,wrapAsync (listingController.destroyListing));

// router.delete("/:id", wrapAsync(async (req, res) => {
//     const { id } = req.params;
//     await Listing.findByIdAndDelete(id);
//     res.redirect("/listings"); // or "/" if that's intended
// }));



module.exports=router;