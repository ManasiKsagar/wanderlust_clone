const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review.js");

const listingSchema=new mongoose.Schema({
    title:{
        type:String,
        // required:true
    },
    description:String,
    image:{
       filename: {
    type: String,
    default: 'defaultImage'
  },
  url: {
    type: String,
    // default: 'https://unsplash.com/photos/a-beautiful-dome-of-a-magnificent-church-Wya6thlv4ys',
  
    // set:(v)=>v ==="" ? "https://unsplash.com/photos/a-beautiful-dome-of-a-magnificent-church-Wya6thlv4ys":v,
  },
  },
    price:Number,
    location:String,
    country:String,
    reviews:[
      {
        type:Schema.Types.ObjectId,
        ref:"Review",
      },
    ],
    Owner:{
      type:Schema.Types.ObjectId,
      ref:"User",
    },
    category:{
      type:String,
      enum:["mountains","arctic","farms","deserts"]
    }
});

listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
  await Review.deleteMany({_id : {$in : listing.reviews}});
  }
})

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;