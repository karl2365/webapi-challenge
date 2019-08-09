const people = [
    {
        id: 1,
        name: "Karl"
    },    
    {
        id: 2,
        name: "Lisa"
    },
    {
        id: 3,
        name: "Josh"
    },
    {
        id: 4,
        name: "Katie"
    }
];
let peopleId = 4;

let chores = [
    {
        id: 1,
        description: "Code a new API",
        notes: "",
        assignedTo: 1,
        completed: false
    }
];
let choreId = 1;

const getPeople = () => {
    return people;
}

const getChores = () => {
    return chores;
}

const insertChore = chore => {
    choreId += 1
    chore.id = choreId;
    chores.push(chore);
    
}

const modifyChore = (id, changes) => {
    for (let i = 0;i < chores.length; i++){
        if (chores[i].id = id){
            chores[i].description = changes.description;
            chores[i].assignedTo = changes.assignedTo;
            chores[i].completed = changes.completed;
            if (changes.notes) {
                chores[i].notes = changes.notes;
            }
            return chores[i];
        }
    }
}

const removeChore = id => {
    const temp = [];
    for (let i = 0; i < chores.length; i++){
        if (chores[i].id !== id){
            temp.push(chores[i])
        }
    }
    chores = [];
    for (let i = 0; i < temp.length; i++){
        chores.push(temp[i]);
    }
    return `Chore ${id} was removed.`
}

module.exports = {getPeople, getChores, insertChore, modifyChore, removeChore};

