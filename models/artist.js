module.exports = (sequelize, DataTypes) => {
    const Artist = sequelize.define('Artist', {
      // Giving the Author model a name of type STRING
      name: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
              len: [1],
          }
      },
      body: { // little brief bio of the artist
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1],
        }
      },
      phone: {
          type: DataTypes.INTEGER,
          allowNull: false,
      },
      email: {
          type: DataTypes.STRING,
          allowNull: false,
          validate:{
            isEmail: true,
          }
      },
      dateCreated: {
          type: DataTypes.DATE,
          allowNull: false,
      }

    });
  
    Artist.associate = (models) => {
      // Associating Author with Posts
      // When an Author is deleted, also delete any associated Posts
      Artist.hasMany(models.Artwork, {
        onDelete: 'cascade',
      });
    };
  
    return Artist;
  };
  