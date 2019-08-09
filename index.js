require('dotenv').config();

const express = require('express');
const server = express();

const db = require('./data/data');

server.use(express.json());



server.get('/chores', (req, res) => {
    const queryReturn = [];
    const chores = db.getChores()
        if (chores.length === 0) {
            res.status(404).json({error: "The array is empty!"});
        }
        else if (!req.query.completed) {
            res.status(200).json(chores);
        }
        else if (req.query.completed === false){
            for (let i = 0; i < chores.length; i++){
                if (chores[i].completed === false){
                    queryReturn.push(chores[i]);
                }
            }
            res.status(200).json(queryReturn);
        }
        else if (req.query.completed === true) {
            for (let i = 0; i < chores.length; i++){
                if (chores[i].completed === true){
                    queryReturn.push(chores[i]);
                }
            }
            res.status(200).json(queryReturn);
        }
        else {
            res.status(500).json({error: "Error accessing database."})
        }
    
});

server.post('/chores', (req, res) => {
    if (!req.body){
        res.status(400).json({error: "You must send a new chore!"});
    }
    const people = db.getPeople();
    const ids = []
    for (let i = 0; i < people.length; i++){
        ids.push(people[i].id);
    }
    if (!ids.includes(req.body.assignedTo)){
        res.status(400).json({error: "Assigned user does not exist"});
    }
    else {
        db.insertChore(req.body);
        res.status(201).json({inserted: "new chore inserted"});

    }
})

server.put('/chores/:id', (req, res) => {
    if (!req.body){
        res.status(400).json({error: "You must send a new chore!"});
    }
    const people = db.getPeople();
    const pid = []
    const cid = []
    for (let i = 0; i < people.length; i++){
        pid.push(people[i].id);
    }
    if (!pid.includes(req.body.assignedTo)){
        res.status(400).json({error: "Assigned user does not exist."});
    }
    const chores = db.getChores();

    for (let i = 0; i < chores.length; i++){
        cid.push(chores[i].id);
    }
    console.log(cid);
    console.log(req.params.id)
    if (cid.includes(req.params.id)){
        const returnedChore = db.modifyChore(req.params.id, req.body);
        res.status(201).json(returnedChore);
    }
    else {
        res.status(400).json({error: "Chore id does not exist."});

    }
});

server.delete('/chores/:id', (req, res) => {
    const chores = db.getChores();
    const cid = []
    for (let i = 0; i < chores.length; i++){
        cid.push(chores[i].id);
    }
    console.log(cid);
    console.log(req.params.id)
    if (cid.includes(req.params.id)){
        const removedChore = db.removeChore(req.params.id)
        res.status(200).json({removed: `Chore: ${removedChore}`})
    }
    else {
        res.status(400).json({error: "That chore id does not exist"});
    }
})



const port = process.env.PORT;
server.listen(port, () => console.log(`Api running on port ${port}`));