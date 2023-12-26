require('dotenv').config();
const envs = process.env;
const mongoose = require('mongoose');
const { Schema } = mongoose;


mongoose.connect(envs.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true },
  ()=>{
    console.log("DB Connected")
  });
  const personSchema = new Schema({
    name:  {type: String, required: true},
    age: {type: Number},
    favoriteFoods: [String]
  });

  const Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const person = new Person({
    name: 'anis',
    age: 23,
    favoriteFoods: ['PIZZA']
  });
  person.save((err,data)=>{
    if(err) return done(err);
    done(null,data);
  })
};
arrayOfPeople=[{
  name: 'fetoui',
  age: 20,
  favoriteFoods: ['COUSCOUS']
},{
  name: 'JAWHAR',
  age: 27,
  favoriteFoods: ['MLOUKHIA']
}];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople,(err,document)=>{
    done(null,document);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName},(err,azerty)=>{
    done(null,azerty);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food},(err,azerty)=>{
    done(null,azerty);
  });
};

const findPersonById = (personId, done) => {
  Person.findById({_id: personId},(err,azerty)=>{
    done(null,azerty);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId,(err,person)=>{
    person.favoriteFoods.push(foodToAdd);
    person.save((error,updatedPerson)=>{
      done(null,updatedPerson);
    })  
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

Person.findOneAndUpdate({name:personName },{age:ageToSet},{new:true},(err,person)=>{
  done(null,person);
})
};

const removeById = (personId, done) => {
Person.findByIdAndRemove(personId,(err,person)=>{
  done(null,person)
})
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name:nameToRemove},(err,person)=>{
  done(null,person);

  })

};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({favoriteFoods: foodToSearch}).sort({name: 1}).limit(2).select({age:0}).exec((err,data)=>{
    done(null,data);
  })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
