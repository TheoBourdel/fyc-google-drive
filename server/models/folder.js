const DataTypes = require('sequelize');
const sequelize = require('../db/conn.js');

const Folder = sequelize.define('folder', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    description: {
        allowNull: true,
        type: DataTypes.TEXT
    },
    created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    parent_id: {
        allowNull: true,
        type: DataTypes.INTEGER,
        references: {
            model: 'folder',
            key: 'id'
        },
        onDelete: 'CASCADE'
    }
}, {
    tableName: 'folder',
    timestamps: false
});

module.exports = Folder;