const express = require("express");
const router = express.Router();
const path = require('path');
const folderController = require("./controller/folderController");
const documentController = require("./controller/documentController");

router.use('/uploads', express.static(path.join(__dirname, 'uploads')));

router.get("/", (req, res) => {
    res.json("Hello world!!");
});

router.get("/folders", folderController.getFolders);
router.post("/folder", folderController.createFolder);
router.put("/folder/:id", folderController.updateFolder);
router.delete("/folder/:id", folderController.deleteFolder);

router.get("/documents", documentController.getDocuments);
router.post("/document", documentController.createDocument);
router.delete("/document/:id", documentController.deleteDocument);

module.exports = router;