const Folder = require("../models/folder");

exports.getFolders = async (req, res) => {
    try {
        const folders = await Folder.findAll();

        return res.json(folders);
    } catch (error) {
        console.error(error)
        return res.json({ error: error.message });
    }
}

exports.deleteFolder = async (req, res) => {
    try {
        const folderId = req.params.id;

        const folder = await Folder.findByPk(folderId);
        if (!folder) {
            return res.status(404).json({ message: 'Dossier non trouvé' });
        }

        await folder.destroy();

        return res.status(204).json();
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Erreur lors de la suppression du dossier' });
    }
}

exports.updateFolder = async (req, res) => {
    try {
        const folderId = req.params.id;
        const { name, description } = req.body;

        const folder = await Folder.findByPk(folderId);
        if (!folder) {
            return res.status(404).json({ message: 'Dossier non trouvé' });
        }

        folder.name = name || folder.name;
        folder.description = description || folder.description;

        await folder.save();

        return res.status(200).json(folder);
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Erreur lors de la mise à jour du dossier' });
    }
}

exports.createFolder = async (req, res) => {
    try {
        console.log(req.body)
        const { name, description, parent_id } = req.body;
        console.log('log : ', name)

        const folder = await Folder.create({
            name,
            description,
            parent_id
        });
        return res.status(201).json(folder);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erreur lors de la création du dossier' });
    }
}