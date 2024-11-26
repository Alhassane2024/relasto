import db from "../models/database.js";

export const createOperation = (req, res)=>{
    const { name } = req.body;

    if(!name){
        res.status(500).json({error: "Le nom est obligatoire"});
    }else{
        const query = `INSERT INTO operations(name) VALUES(?)`;
        db.run(query, [name], function(err){
            if(err){
                res.status(500).json({ message: "ERREUR", error: err.message });
            }else{
                res.status(200).json({id: this.lastID, name: name})
            }
        })
    }
};

export const getOperation = (req, res)=>{
    const query = `SELECT * FROM operations`;

    db.all(query, [], (err, rows)=>{
        if(err){
            res.status(500).json({ error: err.message });
        }else{
            res.status(200).json(rows)
        }
    })
}


export const updateOpertaion = (req, res)=>{
    const { id } =req.query;
    const { name } = req.body;

    
    if(!name){
       return res.status(400).json({error: "Le nom est obligatoire"});
        
    }

    const checkQuery = `SELCT * FROM operations WHERE id = ?`
    db.get(checkQuery, [id], (err, row)=>{
        if(err){
            return res.status(500).json({error: "Une erruer s'est produite" + err.message})
        }

        if(!row){
            return res.status(404).json({ error: `L'opération avec l'ID ${id} n'existe pas.` });
        }
    })
    
    const query = `UPDATE operations SET name=? WHERE id=?`;
    const params = [ name, id ]    

    db.run(query, params, function(err){
        if(err){
           return res.status(500).json({ error: "Une erreur s'est produite " + err.message });
        }
        
        // if (this.changes === 0) {
        //     // Si aucune ligne n'a été supprimée
        //     return res.status(404).json({ 
        //         error: "Aucune opération trouvée avec cet ID : " + id 
        //     });
        // }

            res.json({
                updateID: id,
                changes: this.changes,
                message: name ? `Nouveau nom de l'opération ${name}` : `Opération conserve l'ancien nom`
            })
    })
};



export const deleteOperation = (req, res)=>{
    const { id } = req.query;

    const query = `DELETE FROM operations WHERE id = ?`;

    const checkQuery = `SELECT * FROM operations WHERE id = ?`;
    db.get(checkQuery, [id], (err, row)=>{
        if(err){
            return res.status(500).json({error: "Une erruer s'est produite" + err.message})
        }

        if(!row){
            return res.status(404).json({ error: `L'opération avec l'ID ${id} n'existe pas.` });
        }
    })

     db.run(query, [ id ], function(err){
        if(err){
           return res.status(500).json({ error: "Impossible de supprimer " + err.message });
        }

        // if (this.changes === 0) {
        //     // Si aucune ligne n'a été supprimée
        //     return res.status(404).json({ 
        //         error: "Aucune opération trouvée avec cet ID : " + id 
        //     });
        // }

         // Succès
         res.status(200).json({
            deletedID: id,
            message: `Opération avec ID ${id} supprimée avec succès.`,
        });
     })
}