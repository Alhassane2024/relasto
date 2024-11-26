import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./relasto.db", (err)=> {
    err ? console.log("Erreur lors de la connexion à la base de données :", err.message) : 
    console.log("Connexion à la base de données SQLite réussie !");   
    
});

db.serialize(()=>{
    db.run(
        `CREATE TABLE IF NOT EXISTS operations (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
    )`, (err)=>{
        if(err){
            console.error("Erreur lors de la création de la table :", err.message);
        }else{
            console.log("Tables 'operations'prête !");
        }
    }
    );

    db.run(
        `CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
     ) `, (err)=>{
        if(err){
            console.error("Erreur lors de la création de la table :", err.message);
        }else{
            console.log("Tables 'categories'prête !");
        }
    }
    );

    db.run(
         `CREATE TABLE IF NOT EXISTS properties (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            location TEXT NOT NULL,
            category_id INTEGER NOT NULL,
            operation_id INTEGER NOT NULL,
            FOREIGN KEY(operation_id) REFERENCES operations(id) ON DELETE CASCADE,
            FOREIGN KEY(category_id) REFERENCES categories(id) ON DELETE CASCADE
    )`, (err)=>{
        if(err){
            console.error("Erreur lors de la création de la table :", err.message);
        }else{
            console.log("Tables 'properties'prête !");
        }
    }
        
    );

    db.run(
        `CREATE TABLE IF NOT EXISTS property_images (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            property_id INTEGER NOT NULL,
            image_url TEXT NOT NULL,
            FOREIGN KEY(property_id) REFERENCES properties(id) ON DELETE CASCADE
        )`, (err)=>{
            if(err){
                console.error("Erreur lors de la création de la table :", err.message);
            }else{
                console.log("Tables 'property_images' prête !");
            }
        }
    );

    db.run(
        `CREATE TABLE IF NOT EXISTS amenities (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            property_id INTEGER NOT NULL,
            bedrooms INTEGER NOT NULL,
            bathrooms INTEGER NOT NULL,
            sqft INTEGER NOT NULL,
            wifi BOOLEAN NOT NULL,
            FOREIGN KEY (property_id) REFERENCES properties(id) ON DELETE CASCADE
        )
        `, (err)=>{
            if(err){
                console.error("Erreur lors de la création de la table :", err.message);
            }else{
                console.log("Tables 'amenities' prête !");
            }
        }
    );

    // db.run("ALTER TABLE properties ADD COLUMN property_id TEXT", (err) => {
    //     if (err) {
    //         console.log("Le champ property_id existe déjà ou une erreur s'est produite.");
    //     } else {
    //         console.log("Champ property_id ajouté à la table properties.");
    //     }
    // });

    
});

export default db;





