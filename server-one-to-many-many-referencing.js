// One-to-Many Relationship with Tutorial2.js and Comment.js.

const mongoose = require('mongoose');

mongoose
    .connect("mongodb://localhost/Relationships", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then( () => console.log("Successfully connected to MongoDB."))
    .catch( err => console.log("Connection error ", err));
;

const db = require('./src/one-to-many');

const createTutorial = function(tutorial) {
    return db.Tutorial2.create(tutorial).then(docTutorial => {
        console.log('\n Created Tutorial: \n', docTutorial);
        return docTutorial;
    });
};

const createComment = function(tutorialId, comment) {
    return db.Comment.create(comment).then(docComment => {
      console.log("\n Created Comment: \n", docComment);
      return db.Tutorial2.findByIdAndUpdate(
        tutorialId,
        { 
            $push: { 
                comments: docComment._id 
            } 
        },
        { 
            new: true, 
            useFindAndModify: false
        }
      );
    });
};

const getTutorialWithPopulate = function(id) {
    return db.Tutorial2.findById(id).populate("comments", "-_id -__v");
  };

const run = async function() {
    var tutorial = await createTutorial({
        title: 'Tutorial #1',
        author: 'Author 1'
    });

    tutorial = await createComment(tutorial._id, {
        username: "jack",
        text: "This is a great tutorial.",
        createdAt: Date.now()
    });

    console.log("\n Tutorial: \n", tutorial);

    tutorial = await createComment(tutorial._id, {
        username: "mary",
        text: "Thank you, it helps me alot.",
        createdAt: Date.now()
    });

    console.log("\n Tutorial: \n", tutorial);

    // add this
    tutorial = await getTutorialWithPopulate(tutorial._id);
    console.log("\n populated Tutorial: \n", tutorial);
};

run();