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
        // validate: {
        //   isUrl: true, // should we remove url and just let the user input their name?
        // },
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
        defaultValue: 'Painting',
      },
      condition: {
        type: DataTypes.STRING,
        defaultValue: 'Excellent',
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: true,
        },
      },
    });
  
    Artwork.associate = (models) => {
      // We're saying that Artwork should belong to an Artist
      // Artwork can't be created without an Artit due to the foreign key constraint
      Artwork.belongsTo(models.Artist, {
        foreignKey: {
          allowNull: false,
        },
      });
    };
  
    return Artwork;
  };
  