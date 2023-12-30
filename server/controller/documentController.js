const Document = require('../models/document.js');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../uploads/'));
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Méthode de contrôleur pour gérer l'upload
const uploadController = {
    upload: upload.single('file'),
};

exports.createDocument = async (req, res) => {
    try {
        filePath = '';
        fileName = '';

        uploadController.upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                // Une erreur liée à Multer s'est produite
                return res.json({ error: err.message });
            } else if (err) {
                // Une erreur inattendue s'est produite
                console.error(err);
                return res.json({ error: 'Une erreur est survenue lors de l\'upload.' });
            }

            filePath = req.file.path;
            fileName = req.file.originalname;
            const document = await Document.create({
                title: fileName,
                file_path: filePath,
            });
    
            return res.status(201).json(document);
        });
        console.log(filePath);
    } catch (error) {
        console.error(error)
        return res.json({ error: error.message });
    }

}

exports.getDocuments = async (req, res) => {
    try {
        const documents = await Document.findAll();

        return res.json(documents);
    } catch (error) {
        console.error(error)
        return res.json({ error: error.message });
    }
}

exports.deleteDocument = async (req, res) => {
    try {
        const document = await Document.findByPk(req.params.id);

        if (!document) {
            return res.status(404).json({ error: 'Document not found' });
        }

        await document.destroy();

        return res.status(204).json();
    } catch (error) {
        console.error(error)
        return res.json({ error: error.message });
    }
}