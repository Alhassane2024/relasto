import db from "../models/database.js";

export const createProperty = (req, res)=>{
    const { name, price, location, category_id, operation_id } = req.body;

    if(!name || !price || !location || !category_id || !operation_id){
        console.log(name, price, location, category_id, operation_id);
        
        return res.status(400).json({ error: "Tous les champs (nom, prix, localisation, catégorie, opération) sont obligatoires." });
    }

    //Création de la requête
    const query = `INSERT INTO properties(name, price, location, category_id, operation_id) VALUES(?, ?, ?, ?, ?)`;
    const params = [ name, price, location, category_id, operation_id ];

    db.run(query, params, function(err){
        if(err){
            return res.status(500).json({ error: "Une erreur est survenue lors de l'ajout de la propriété : " + err.message });
        }
        res.status(200).json({
            message: "Propriété ajoutée avec succès",
            propertyId: this.lastID
        })
    })
}


export const getProperty = (req, res)=>{
    const { name, price, location, category_id, operation_id } = req.query;

    let query = `SELECT properties.*, 
    (SELECT image_url FROM property_images WHERE property_images.property_id = properties.id LIMIT 1) AS image_url
    FROM properties WHERE 1=1`;
    const params = [];

    if(name){
        query += ` AND name LIKE ?`;
        params.push(`%${name}%`);
    }

    if(location){
        query += ` AND location LIKE ?`;
        params.push(`%${location}%`);
    }

    if(price){
        query += ` AND price LIKE ?`;
        params.push(`%${price}%`);
    }

    if(category_id){
        query += ` AND category_id LIKE ?`;
        params.push(`%${category_id}%`)
    }

    if(operation_id){
        query += ` AND operation_id LIKE ?`;
        params.push(`%${operation_id}%`)
    }

    db.all(query, params, (err, rows)=>{
        if(err){
            res.status(500).json({ error: err.message });
        }else{
            res.status(200).json(rows);
        }
    })
};

export const updateProperty = (req, res)=>{
    const { id } = req.query;
    const { name, price, location, category_id, operation_id } = req.body;

    if(!name || !price || !location || category_id || !operation_id){
        return res.status(400).json({ error: "Tous les champs (nom, prix, localisation, catégorie, opération) sont obligatoires." });
    }

    // Étape 1 : Vérifier si l'ID existe
    const checkQuery = `SELECT * FROM properties WHERE id = ?`; //CONSEIL DE affana je n'ai changé que le nom de la table
    db.get(checkQuery, [id], (err, row)=>{
        if(err){
            return res.status(500).json({ error: "Une erreur s'est produite: " + err.message });
        }

        if(!row){
            return res.status(404).json({ error: `La properiété avec l'ID ${id} n'existe pas.` });
        }
    });

    // Étape 2 : Procéder à l'update si l'ID est valide
    const updateQuery = `UPDATE properties SET name = ?, price = ?, location = ?, category_id = ?, operation_id = ? WHERE id = ?`;
    db.run(updateQuery, [ name, price, location, category_id, operation_id, id ], function(updateErr){
        if(updateErr){
            return res.status(500).json({ error: "Une erreur s'est produite lors de la mise à jour: " + updateErr.message });
        }else{
            res.status(200).json({
                message: `La propriété avec l'ID ${id} a été mise à jour.`,
                updateID: id,
                changes: this.changes
            })
        }
    })
};


export const deleteProperty = (req, res)=>{
    const { id } = req.query;
    
    const checkQuery = `SELECT * FROM properties WHERE id = ?`;
    db.get(checkQuery, [id], (err, row)=>{
        if(err){
            return res.status(500).json({error: "Une erreur s'est produite " + err.message})
        }

        if(!row){
            return res.status(404).json({NotFund: `La propriété avec l'ID ${id} n'existe pas.`})
        }
    });

    const deleteQuery = `DELETE FROM properties WHERE id = ?`;
    db.run(deleteQuery, [ id ], (err)=>{
        if(err){
            res.status(500).json({error: "Une erreur s'est produite " + err.message})
        }else{
            res.status(200).json({message: `La propriété avec l'id ${id} a été supprimée avec succès`})
        }
    })
}

