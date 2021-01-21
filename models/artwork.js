module.exports = (sequelize, DataTypes) => {
    const Artwork = sequelize.define('Artwork', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1],
        },
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1],
      },
    });
  
    Artwork.associate = (models) => {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
      Artwork.belongsTo(models.Artist, {
        foreignKey: {
          allowNull: false,
        },
      });
    };
  
    return Artwork;
  };
  