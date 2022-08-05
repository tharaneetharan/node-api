module.exports = (sequelize, DataTypes) => {
    const Note = sequelize.define("Note", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        author: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING, allowNull: false
        },
        content: {
            type: DataTypes.STRING, allowNull: false
        }
    }, {
        timestamps: false
    });

    return Note;
};