import db from "../models/database.js";

export const createAmenities = (req, res)=>{
    const { property_id, bedrooms, bathrooms, sqft, wifi } = req.body;

    if(!property_id || !bedrooms || !bathrooms || !sqft || !wifi){
        console.log(property_id, bedrooms, bathrooms, sqft, wifi);
        
        return res.status(400).json({ error: "Tous les champs (property_id, bedrooms, bathrooms, sqft, wifi) sont obligatoires." });
    }

    //Création de la requête
    const query = `INSERT INTO amenities(property_id, bedrooms, bathrooms, sqft, wifi) VALUES(?, ?, ?, ?, ?)`;
    const params = [ property_id, bedrooms, bathrooms, sqft, wifi ];

    db.run(query, params, function(err){
        if(err){
            return res.status(500).json({ error: "Une erreur est survenue lors de l'ajout de la commodité : " + err.message });
        }
        res.status(200).json({
            message: "Commdodités ajoutées avec succès",
            propertyId: this.lastID
        })
    })
}


export const getAmenities = (req, res)=>{
    const { property_id, bedrooms, bathrooms, sqft, wifi } = req.query;

    let query = `SELECT * FROM amenities WHERE 1=1`;
    const params = [];

    if(property_id){
        query += ` AND property_id LIKE ?`;
        params.push(`%${property_id}%`);
    }

    if(bedrooms){
        query += ` AND bedrooms LIKE ?`;
        params.push(`%${bedrooms}%`);
    }

    if(bathrooms){
        query += ` AND bathrooms LIKE ?`;
        params.push(`%${bathrooms}%`);
    }

    if(sqft){
        query += ` AND sqft LIKE ?`;
        params.push(`%${sqft}%`)
    }

    if(wifi){
        query += ` AND wifi LIKE ?`;
        params.push(`%${wifi}%`)
    }

    db.all(query, params, (err, rows)=>{
        if(err){
            res.status(500).json({ error: err.message });
        }else{
            res.status(200).json(rows);
        }
    })
};

export const updateAmenities = (req, res)=>{
    const { id } = req.query;
    const { property_id, bedrooms, bathrooms, sqft, wifi } = req.body;

    if(!property_id || !bedrooms || !bathrooms || sqft || !wifi){
        return res.status(400).json({ error: "Tous les champs (property_id, bedrooms, bathrooms, sqft, wifi) sont obligatoires." });
    }

    // Étape 1 : Vérifier si l'ID existe
    const checkQuery = `SELECT * FROM amenities WHERE id = ?`; //CONSEIL DE affana je n'ai changé que le nom de la table
    db.get(checkQuery, [id], (err, row)=>{
        if(err){
            return res.status(500).json({ error: "Une erreur s'est produite: " + err.message });
        }

        if(!row){
            return res.status(404).json({ error: `La commodité avec l'ID ${id} n'existe pas.` });
        }
    });

    // Étape 2 : Procéder à l'update si l'ID est valide
    const updateQuery = `UPDATE amenities SET property_id = ?, bedrooms = ?, bathrooms = ?, sqft = ?, wifi = ? WHERE id = ?`;
    db.run(updateQuery, [ property_id, bedrooms, bathrooms, sqft, wifi, id ], function(updateErr){
        if(updateErr){
            return res.status(500).json({ error: "Une erreur s'est produite lors de la mise à jour: " + updateErr.message });
        }else{
            res.status(200).json({
                message: `La commodité avec l'ID ${id} a été mise à jour.`,
                updateID: id,
                changes: this.changes
            })
        }
    })
};


export const deleteAmenities = (req, res)=>{
    const { id } = req.query;
    
    const checkQuery = `SELECT * FROM amenities WHERE id = ?`;
    db.get(checkQuery, [id], (err, row)=>{
        if(err){
            return res.status(500).json({error: "Une erreur s'est produite " + err.message})
        }

        if(!row){
            return res.status(404).json({NotFund: `La commodité avec l'ID ${id} n'existe pas.`})
        }
    });

    const deleteQuery = `DELETE FROM amenities WHERE id = ?`;
    db.run(deleteQuery, [ id ], (err)=>{
        if(err){
            res.status(500).json({error: "Une erreur s'est produite " + err.message})
        }else{
            res.status(200).json({message: `La commodité avec l'id ${id} a été supprimée avec succès`})
        }
    })
}

