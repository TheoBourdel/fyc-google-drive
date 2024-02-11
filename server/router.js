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
router.delete("/folder/:id", folderController.deleteFolder);

router.put("/folder/:id", folderController.updateFolder);
router.put("/document/:id", documentController.updateDocument);

router.get("/documents", documentController.getDocuments);
router.get("/document/:title", documentController.getDocument);

router.post("/document", documentController.createDocument);
router.delete("/document/:id", documentController.deleteDocument);


module.exports = router;