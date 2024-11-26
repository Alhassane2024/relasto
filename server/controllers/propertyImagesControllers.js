import db from '../models/database.js';  // Assure-toi d'importer correctement ton fichier de base de données

// Ajouter une image à une propriété
export const addPropertyImage = (req, res) => {
    const { property_id } = req.body;
    const imageUrl = req.file? `/upload/${req.file.filename}` : "";

    // Vérification des données
    if (!property_id || !imageUrl) {
        console.log(property_id, imageUrl);
        
        return res.status(400).json({ error: "L'ID de la propriété et l'URL de l'image sont obligatoires." });
    }

    // Requête d'insertion pour ajouter une image
    const query = `
        INSERT INTO property_images (property_id, image_url) 
        VALUES (?, ?)
    `;
    const params = [property_id, imageUrl];

    // Exécution de la requête
    db.run(query, params, function (err) {
        if (err) {
            return res.status(500).json({ error: "Une erreur est survenue lors de l'ajout de l'image : " + err.message });
        }

        // Réponse avec l'ID de l'image insérée
        res.status(201).json({
            message: "Image ajoutée avec succès",
            imageId: this.lastID  // ID généré pour la nouvelle image
        });
    });
};


// Récupérer toutes les images pour une propriété donnée
export const getPropertyImages = (req, res) => {
    const { property_id } = req.query;

    if (!property_id) {
        return res.status(400).json({ error: "L'ID de la propriété est requis." });
    }

    const query = `
        SELECT * FROM property_images WHERE property_id = ?
    `;
    const params = [property_id];

    db.all(query, params, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: "Erreur lors de la récupération des images : " + err.message });
        }

        if (rows.length === 0) {
            return res.status(404).json({ message: "Aucune image trouvée pour cette propriété." });
        }

        res.status(200).json(rows);  // Envoi des images
    });
};


// Supprimer une image pour une propriété donnée
export const deletePropertyImage = (req, res) => {
    const { image_id } = req.query;

    if (!image_id) {
        return res.status(400).json({ error: "L'ID de l'image est requis." });
    }

    const query = `
        DELETE FROM property_images WHERE id = ?
    `;
    const params = [image_id];

    db.run(query, params, function (err) {
        if (err) {
            return res.status(500).json({ error: "Erreur lors de la suppression de l'image : " + err.message });
        }

        if (this.changes === 0) {
            return res.status(404).json({ message: "Aucune image trouvée avec cet ID." });
        }

        res.status(200).json({ message: "Image supprimée avec succès" });
    });
};
