module.exports = (sequelize, DataTypes) => {
    const Artwork = sequelize.define('Artwork', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1],
        },
      },
      postedBy: { // link to artist page
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true,
        },
      },
      year: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isDate: true,
        },
      },
      body: { // description
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1],
        },
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3],
        },
      },
      condition: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1],
        },
      },
      images: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true,
        },
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
  