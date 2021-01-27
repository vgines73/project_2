// Wait for the DOM to completely load before we run our JS
document.addEventListener('DOMContentLoaded', (e) => {
    if (e) {
        console.log('DOM loaded! 🚀');
    }
  
    const artistInfo = document.querySelector('.artist-info');

    let artists;
  
    // Function to grab artworks from the database
    const getArtist = (category) => {
      let categoryString = category || '';
      if (categoryString) {
            categoryString = categoryString.replace(' ', '');
            categoryString = `category/${categoryString}`;
        }
  
      fetch(`/api/artists/${categoryString}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success in getting artists:', data);
            artists = data;
            initializeRows();
        })
        .catch((error) => console.error('Error:', error));
    };
  
    // Getting inital list of artwork
    getArtists();
  
    // Function to help construct the post HTML content inside artworkInfo
    const initializeRows = () => {
        artistInfo.innerHTML = '';
        const artistToAdd = [];
  
        artists.forEach((artist) => artistsToAdd.push(createNewRow(artist)));
        artistsToAdd.forEach((artist) => artistInfo.appendChild(artist));
    };
  
    const createNewRow = (artist => {
        // Artworkcard div
        const newArtistCard = document.createElement('div');
        newArtistCard.classList.add('card');
  
        // Heading
        const newArtistCardHeading = document.createElement('div');
        newArtistCardHeading.classList.add('card-header');
  
        // New artist info
        const newArtistName = document.createElement('h5');
        const newArtistDate = document.createElement('p');

        // New artist phone
        const newArtistPhoneNumber = document.createElement('p')
        newArtistPhoneNumber.textContent = artist.phone;
        
        // New artist date created
        const newArtistDateCreated  = document.createElement('p');
        newArtistDateCreated.textContent = artist.dateCreated;

        // New artist email
        const newArtistEmail = document.createElement('p')
        newArtistEmail.textContent = artist.email;

        // New artwork condition
        const newArtworkCategory = document.createElement('p');
        newArtworkCategory.textContent = artwork.category;

        // New artwork image
        // const newArtworkImage = document.createElement('img');
        // newArtworkImage.src = artwork.image;
        // newArtworkImage.style.width = "150px";
        // newArtworkImage.style.height = "150px";
        // console.log(artwork.image)

        // New artwork card body
        const newArtistCardBody = document.createElement('div');
        newArtistCardBody.classList.add('card-body');

        // New artist
        const newArtistBody = document.createElement('p');
        newArtistName.textContent = ('Name: ' + artist.name);
        newArtistDateCreated.textContent = ('Member since: ' + artist.dateCreated);
        newArtistPhoneNumber.textContent = ('Phone Number: ' + artist.phone);
        newArtistBody.textContent = ('Bio: ' + artist.body);
        newArtworkCategory.textContent = ('Category: ' + artwork.category);

      
  
        let formattedDate = new Date(artist.dateCreated);
        formattedDate = moment(formattedDate).format('MMMM YYYY');
        newArtistDate.textContent = ` (${formattedDate})`;
  
        newArtistName.appendChild(newArtistDate);
        newArtistCardHeading.appendChild(newArtistName);
        newArtistCardHeading.appendChild(newArtistDateCreated);
        newArtistCardHeading.appendChild(newArtistPhoneNumber);
        newArtistCardHeading.appendChild(newArtistEmail);
        newArtistCardBody.appendChild(newArtistBody);
        newArtistCard.appendChild(newArtistCardHeading);
        newArtistCard.appendChild(newArtistCardBody);
        newArtistCard.setAttribute('data-artist', JSON.stringify(artist));
  
        return newArtistCard;
    };
  
    const handleCategoryChange = (e) => {
        const newArtistName = e.target.value;
        console.log('handleCategoryChange -> newArtistName', newArtistName);
        getArtist(newArtistName.toLowerCase());
    };
    artistnfo.addEventListener('change', handleCategoryChange);

  });