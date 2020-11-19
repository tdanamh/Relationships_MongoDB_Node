const mongoose = require('mongoose');

mongoose
    .connect("mongodb://localhost/Relationships", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then( () => console.log("Successfully connected to MongoDB."))
    .catch( err => console.log("Connection error ", err));
;


const Customer = require("./src/one-to-one-embedding/Customer").Customer;
const Identifier = require("./src/one-to-one-embedding/Identifier");

const createCustomer = function(name, age, gender) {
    const customer = new Customer({
        name,
        age,
        gender
    });
    return customer.save();
};

const createIdentifier = function(cardCode, customer) {
    const identifier = new Identifier({
        cardCode,
        customer
    });
    return identifier.save();
};

createCustomer("Ana", 26, "woman")
    .then( customer => {
        console.log("Created new Customer \n", customer);
        // Get customer id from MongoDB
        const customerId = customer._id.toString().substring(0, 10).toUpperCase();
        return createIdentifier(customerId, customer);
    })
    .then(identifier => {
        console.log("Created new Identifier\n", identifier);
      })
    .catch(err => console.log(err));
;
