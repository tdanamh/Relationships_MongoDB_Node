// Many-to-Many Relationship with Tag.js and Tutorial.js

const mongoose = require('mongoose');

mongoose
    .connect("mongodb://localhost/Relationships", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then( () => console.log("Successfully connected to MongoDB."))
    .catch( err => console.log("Connection error ", err));
;

const db = require('./src/many-to-many');

const createTutorial = function(tutorial) {
    return db.Tutorial.create(tutorial).then(docTutorial => {
        console.log("\n Created Tutorial: \n", docTutorial);
        return docTutorial;
    });
};

const createTag = function(tag) {
    return db.Tag.create(tag).then(docTag => {
        console.log("\n Created Tag: \n", docTag);
        return docTag;
    })
};

const addTagToTutorial = function(tutorialId, tag) {
    return db.Tutorial.findByIdAndUpdate(
        tutorialId,
        {
            $push: {
                tags: tag._id
            }
        },
        {
            new: true,
            useFindAndModify: false
        }
    );
};

const addTutorialToTag = function(tagId, tutorial) {
    return db.Tag.findByIdAndUpdate(
        tagId,
        {
            $push: {
                tutorials: tutorial._id
            }
        },
        {
            new: true,
            useFindAndModify: false
        }
    )
};

// This is the time to use populate() function to get full data. 

const getTutorialWithPopulate = function(id) {
    return db.Tutorial.findById(id).populate("tags", "-_id -__v -tutorials");
};

const getTagWithPopulate = function(id) {
    return db.Tag.findById(id).populate("tutorials", "-_id -__v -tags");
};

const run = async function() {
    var tutorial = await createTutorial({
        title: 'Tutorial #1',
        author: 'Author 1'
    });

    var tag1 = await createTag({
        name: "tag1",
        slug: "tag-1"
    });

    var tag2 = await createTag({
        name: "tag2",
        slug: "tag-2"
    });

    var tutorial = await addTagToTutorial(tutorial._id, tag1);
    //console.log("\n tutorial: \n", tutorial);

    var tag1 = await addTutorialToTag(tag1._id, tutorial);
    //console.log("\n tag1: \n", tag1);

    var tutorial = await addTagToTutorial(tutorial._id, tag2);
    //console.log("\n tutorial: \n", tutorial);

    var tag2 = await addTutorialToTag(tag2._id, tutorial);
    //console.log("\n tag2: \n", tag2);

    // For full data
    tutorial = await getTutorialWithPopulate(tutorial._id);
    console.log("\n populated tutorial: \n", tutorial);

    tag1 = await getTagWithPopulate(tag1._id);
    console.log("\n populated tag1: \n", tag1);
};

run();