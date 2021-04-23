//the const that create the saved changes for the data
const fs = require('fs');
const path = require("path");
//the const that is needed to use for the delete function
const { v4: uuidv4 } = require('uuid');
//link to the data
let notesDB = require('../db/db.json');

module.exports = (app) => {

//the function that takes and reads the database
  app.get('/api/notes', (req, res) => {
        return res.json(notesDB)
    });
//uuidv adds the id ti the body object to be called for the delete function
//.push, pushes any new entries to the database from the object
//.writefile establishe the changes in the file, being placed in a string with stringify
  app.post('/api/notes', (req, res) => {
      req.body.id=uuidv4()
      notesDB.push(req.body);
      fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notesDB), function(err)
      {
        if (err)throw err
        console.log(notesDB);
        console.log(__dirname);
        res.json(notesDB);
      });
    
  });
//here the id is being grabbed
  app.delete('/api/notes/:id', (req, res) => {
      const id = req.params.id
     //the filter function that brings back everything not equaling that specific id which is being requested 
      notesDB = notesDB.filter(note => note.id !== id);
      //writes the changes to the database in json and returns a string
      fs.writeFile(path.join(__dirname, "../db/db.json"), JSON.stringify(notesDB), 

      // here the the file that has been updated should be returned to the page
      function(err){
        if (err)throw err
        console.log(notesDB);
        console.log(__dirname);
        res.json(notesDB);
      });
      
  })

};

