let db = {
    users: [
        {id: 1, username: 'grigdevelop', password: 'password'},
        {id: 2, username: 'mos', password: 'mospas'}
    ],
    goals: [
        {id: 1, title: 'do something', desc: 'desc somthing', userId: 1},
        {id: 2, title: 'do something', desc: 'desc somthing', userId: 1},
        {id: 3, title: 'do something', desc: 'desc somthing', userId: 1},
    ]
};

function Data(entity){
    return db[entity];
}

export { Data } ;