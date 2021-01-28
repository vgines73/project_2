// Using Sequelize to create and use the database. Pretty much mySQL under the hood.
// Creates the table for the database with the needed info

module.exports = (sequelize, DataTypes) => {
    const Artwork = sequelize.define('Artwork', {
      // title of artwork
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1],
        },
      },
      // User who posted the artwork
      postedBy: { 
        type: DataTypes.STRING,
        allowNull: false,
       
      },
      // Year artwork was made
      year: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isDate: true,
        },
      },
      // Description with at least a length of 1
      body: { 
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: [1],
        },
      },
      // Category of the artwork; only 3 categories to simplify; will add more for future development
      category: {
        type: DataTypes.STRING,
        defaultValue: 'Painting',
      },
      // Condition of artwork; only 3 categories for simplicity; will add more for future development 
      condition: {
        type: DataTypes.STRING,
        defaultValue: 'Excellent',
      },
      // Image Url. Must be a Url and no more than 255 characters.
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
      // Artwork can't be created without an Artist due to the foreign key constraint
      Artwork.belongsTo(models.Artist, {
        foreignKey: {
          allowNull: false,
        },
      });
    };
  
    return Artwork;
  };
  