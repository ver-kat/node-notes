//console.log("Starting app.js");

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js')
const titleObj = {
        describe: 'Title of note',
        demand: true,
        alias: 't'
};

const argv = yargs
    .command('add','Add a new note', {
        title: titleObj,
        body: {
            describe: 'Body of note',
            demand: true,
            alias: 'b'
        }
    })
    .command('list', 'List notes')
    .command('read', 'Read a note', {
        title: titleObj,
    })
    .command('remove', 'Remove a note', {
        title:  titleObj,
    })
    .help()
    .argv;
var command = argv._[0];
//console.log("Command: ", command);
//console.log('Yargs: ', argv);

if (command === 'add') {
    var note = notes.addNote(argv.title, argv.body);
    if (note == undefined) { //if(note)
        console.log("Title alreay in use.")
    } else {
        notes.logNote(note);
    }
} else if (command === 'list') {
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach((note) => notes.logNote(note));
} else if (command === 'read') {
    var note = notes.getNote(argv.title);
    if (note == undefined) { //if(note)
        console.log("Title not found.")
    } else {
        notes.logNote(note);
    }
} else if (command === 'remove') {
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? "Removed" : 'Note not found';
    console.log(message);
} else {
    console.log("Command not recognized")
}