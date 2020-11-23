// One-to-Many Relationship with Tutorial3.js and Category.js.

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
    return db.Tutorial3.create(tutorial).then(docTutorial => {
        console.log('\n Created Tutorial: \n', docTutorial);
        return docTutorial;
    });
};

const createCategory = function(category) {
    return db.Category.create(category).then(docCategory => {
      console.log("\n Created Category:\n", docCategory);
      return docCategory;
    });
};
  
const addTutorialToCategory = function(tutorialId, categoryId) {
    return db.Tutorial3.findByIdAndUpdate(
        tutorialId,
        { 
            category: categoryId 
        },
        { 
            new: true,
            useFindAndModify: false 
        }
    );
};


const run = async function() {
    var tutorial = await createTutorial({
        title: 'Tutorial #1',
        author: 'Author 1'
    });

    var category = await createCategory({
        name: "Node.js",
        description: "Node.js tutorial"
    });

    tutorial = await addTutorialToCategory(tutorial._id, category._id);
    console.log("\n Tutorial: \n", tutorial);

};

run();