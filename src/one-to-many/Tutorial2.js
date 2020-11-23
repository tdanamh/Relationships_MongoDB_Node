const mongoose = require('mongoose');

const Tutorial2 = mongoose.model(
    "Tutorial2",
    new mongoose.Schema({
        title: String,
        author: String,
        images: [],
        comments: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Comment"    // helps us get full fields of Comment when we call populate() method.
            }
          ]
    })
);

module.exports = Tutorial2;