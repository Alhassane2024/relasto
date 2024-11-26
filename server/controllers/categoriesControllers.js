
import db from "../models/database.js";


export const createCategory = (req, res) => {
    const { name } = req.body;
   

    if (!name) {
        return res.status(400).json({ error: "Le nom est obligatoire" });
    }

    const query = `INSERT INTO categories(name) VALUES(?)`;
    const params = [name];

    db.run(query, params, function (err) {
        if (err) {
            res.status(500).json({ error: `Impossible de créer la catégorie ${name}` + err.message })
        } else {
            res.status(200).json({ id: this.lastID, name: name })
        }
    })

};


export const getCategory = (req, res) => {
    const { name } = req.query;

    let query;
    let params = [];

    if(name){
        console.log(params);
        
        query = `SELECT * FROM categories WHERE name = ?`;
        params = [ name ];
    }else{
        query = `SELECT * FROM categories`;
    }
    console.log(params);
    db.all(query, params, (err, rows)=>{
        if(err){
            res.status(400).json({error: "Une erreur s'est produite " + err.message})
        }else{
            if(name && rows.length == 0){
                res.status(404).json({ message: `La catégorie '${name}' est introuvable.` });
            }else {
                res.status(200).json(rows); // Renvoie les catégories trouvées
            }
        }

    })
};

export const updateCategory = (req, res)=>{
    const { id } = req.query;
    const { name } = req.body;

    if(!name){
       return res.status(400).json({error: "Le nom est obligatoire"})
    }

    // Étape 1 : Vérifier si l'ID existe
    const checkQuery = `SELECT * FROM categories WHERE id = ?`;
    db.get(checkQuery, [id], (err, row)=>{
        if(err){
            return res.status(500).json({ error: "Une erreur s'est produite: " + err.message });
        }

        if(!row){
            return res.status(404).json({ error: `La catégorie avec l'ID ${id} n'existe pas.` });
        }
    });

    // Étape 2 : Procéder à l'update si l'ID est valide
    const updateQuery = `UPDATE categories SET name = ? WHERE id = ?`;
    db.run(updateQuery, [ name, id ], function(updateErr){
        if(updateErr){
            return res.status(500).json({ error: "Une erreur s'est produite lors de la mise à jour: " + updateErr.message });
        }else{
            res.status(200).json({
                message: `La catégorie avec l'ID ${id} a été mise à jour.`,
                updateID: id,
                changes: this.changes
            })
        }
    })
};

export const deleteCategory = (req, res)=>{
    const { id } = req.query;
    
    const checkQuery = `SELECT * FROM categories WHERE id = ?`;
    db.get(checkQuery, [id], (err, row)=>{
        if(err){
            
            return res.status(500).json({error: "Une erreur s'est produite " + err.message})
        }

        if(!row){
            return res.status(404).json({NotFund: `La catégorie avec l'ID ${id} n'existe pas.`})
        }
    });

    const deleteQuery = `DELETE FROM categories WHERE id = ?`;
    db.run(deleteQuery, [ id ], (err)=>{
        if(err){
            
            
            res.status(500).json({error: "Une erreur s'est produite " + err.message})
        }else{
            res.status(200).json({message: `La catégorie avec l'id ${id} a été supprimée avec succès`})
        }
    })
}