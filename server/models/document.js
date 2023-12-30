const DataTypes = require('sequelize');
const sequelize = require('../db/conn.js');
const Folder = require('./folder.js');

const Document = sequelize.define('document', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        allowNull: false,
        type: DataTypes.STRING
    },
    content: {
        allowNull: true,
        type: DataTypes.TEXT
    },
    upload_date: {
        allowNull: true,
        type: DataTypes.DATE
    },
    folder_id: {
        allowNull: true,
        type: DataTypes.INTEGER
    },
    file_path: {
        allowNull: true,
        type: DataTypes.STRING
    }
}, {
    tableName: 'document',
    timestamps: false
});

Document.belongsTo(Folder, { foreignKey: 'folder_id' });
Folder.hasMany(Document, { foreignKey: 'folder_id' });

module.exports = Document;