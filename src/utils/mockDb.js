class EntityTable{


    constructor(){
        this.table = [];
    }

    /**
     * Add range of data to table
     * @param {object[]} data Input data
     */
    addRange(data){
        data.forEach(d => this.table.push(d));
    }

    add(item){
        this.table.push(item);
    }

    getAll(){
        return this.table;
    }

    clear(){
        this.table = [];
    }
}

class Arranger {
    
    constructor(db){
        this.db = db;
    }

    clearAll(){
        this.db['users'].clear();
        this.db['goals'].clear();
    }

    /**
     * Get the instance of table    
     * @param {string} entityName The name of table
     */
    entity(entityName){
        return this.db[entityName];
    }
}

class LiteMocker{
    constructor(db){
        this.db = db;
    }

    init(){
        this.db.users.addRange([
            {id: 1, username: 'grigdevelop', password: 'password'},
            {id: 2, username: 'mos', password: 'mospas'}
        ]);
        
        this.db.goals.addRange([
            {id: 1, title: 'do something', desc: 'desc somthing', userId: 1},
            {id: 2, title: 'do something', desc: 'desc somthing', userId: 1},
            {id: 3, title: 'do something', desc: 'desc somthing', userId: 1},
        ]);
    }
}

let db = {
    users: new EntityTable(),
    goals: new EntityTable()
};

let arranger = new Arranger(db);
let liteMocker = new LiteMocker(db);

export { arranger, liteMocker } ;