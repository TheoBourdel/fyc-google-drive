import DataTypes from 'sequelize';
import sequelize from '../db/conn.js';

const Recipe = sequelize.define('recipe', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    ingredients: {
        type: DataTypes.JSON,
        allowNull: false
    },
    instructions: {
        type: DataTypes.JSON,
        allowNull: false
    },
    temps_preparation: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    temps_cuisson: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    difficulte: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    type: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    image_url: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    date_creation: {
        type: DataTypes.DATE,
        allowNull: false
    },
    regime_special: {
        type: DataTypes.JSON,
        allowNull: false
    },
    restrictions_sante: {
        type: DataTypes.JSON,
        allowNull: false
    }
}, {
    tableName: 'recipes',
    timestamps: false,
    subQuery: false
});

export default Recipe;