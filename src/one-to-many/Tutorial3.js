const mongoose = require('mongoose');

const Tutorial3 = mongoose.model(
    "Tutorial3",
    new mongoose.Schema({
        title: String,
        author: String,
        images: [],
        comments: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Comment"
            }
        ],
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        }
    })
);

module.exports = Tutorial3;