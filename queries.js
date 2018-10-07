/* Add all the required libraries*/
var mongoose = require('mongoose'), 
    Listing = require('./ListingSchema.js'),
    config = require('./config');

/* Connect to your database using mongoose - remember to keep your key secret*/
mongoose.connect(config.db.uri);

/* Fill out these functions using Mongoose queries*/

var findLibraryWest = function() {
  /* 
    Find the document that contains data corresponding to Library West,
    then log it to the console. 
   */
  Listing.find({ name: "Library West" }, function(err, listing) {
    if (err) throw err;

    console.log(listing);
  });
};
var removeCable = function() {
  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed 
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console. 
   */
  Listing.findOneAndRemove({code: "CABL"}, function(err, listing) {
    if (err) throw err;
    console.log(listing);
  })
};
var updatePhelpsMemorial = function() {
  /*
    Phelps Memorial Hospital Center's address is incorrect. Find the listing, update it, and then 
    log the updated document to the console. 
   */
  // We could use findOneAndUpdate here but that bypasses our pre-save hook
  // (hence, preventing updated_at from being updated)
  Listing.find({ code: "PHL" }, function(err, listing) {
    if (err) throw err;

    // The passed-in listing is a document, not an instance of our Listing model...
    // So, create an instance of our Listing model from it.
    var newListing = new Listing(listing[0]);
    newListing.address = '1275 Center Dr, Gainesville, FL 32611, United States';
    newListing.save(function(err) {
      if (err) throw err;
      console.log('Listing updated:');
      console.log(newListing);
    });
  });
};
var retrieveAllListings = function() {
  /* 
    Retrieve all listings in the database, and log them to the console. 
   */
  Listing.find({}, function(err, listings) {
    if (err) throw err;

    // Iterate over the listings and log each one to the console
    // If we just log the entire array to the console, the output will be truncated
    for (var i = 0, len = listings.length; i < len; i++) {
      console.log(listings[i]);
    }
  });
};

findLibraryWest();
removeCable();
updatePhelpsMemorial();
retrieveAllListings();