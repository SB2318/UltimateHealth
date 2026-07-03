const mongoose = require("mongoose");

const dbConnect = () => {
    mongoose.connect(process.env.MONGODB_URL,{
      //useNewUrlParser: true,
     // useUnifiedTopology: true,
      serverSelectionTimeoutMS: 15000, // Increase the timeout
    })
    .then(() => {
        console.log("DB CONNECTION IS SUCCESSFUL");
    })
    .catch((error) => {
        console.log('ISSUE IN DB CONNECTION');
        console.error(error.message);
        process.exit(1); 
    });
}


  module.exports = { dbConnect};


