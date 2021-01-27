// Wait for the DOM to completely load before we run our JS
document.addEventListener('DOMContentLoaded', (e) => {
    if (e) {
        console.log('DOM loaded! 🚀');
    }
  
    const artworkInfo = document.querySelector('.artwork-info');

    let artworks;
  
    // Function to grab artworks from the database
    const getArtwork = (category) => {
      let categoryString = category || '';
      if (categoryString) {
            categoryString = categoryString.replace(' ', '');
            categoryString = `category/${categoryString}`;
        }
  
      fetch(`/api/artworks/${categoryString}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success in getting artworks:', data);
            artworks = data;
            initializeRows();
        })
        .catch((error) => console.error('Error:', error));
    };
  
    // Getting inital list of artwork
    getArtwork();
  
    // Function to help construct the post HTML content inside artworkInfo
    const initializeRows = () => {
        artworkInfo.innerHTML = '';
        const artworksToAdd = [];
  
        artworks.forEach((artwork) => artworksToAdd.push(createNewRow(artwork)));
        artworksToAdd.forEach((artwork) => artworkInfo.appendChild(artwork));
    };
  
    const createNewRow = (artwork) => {
        // Artworkcard div
        const newArtworkCard = document.createElement('div');
        newArtworkCard.classList.add('card');
  
        // Heading
        const newArtworkCardHeading = document.createElement('div');
        newArtworkCardHeading.classList.add('card-header');
  
        // New artwork info
        const newArtworkTitle = document.createElement('h5');
        const newArtworkDate = document.createElement('p');

        // New artwork posted by
        const newArtworkPostedBy = document.createElement('p')
        newArtworkPostedBy.textContent = artwork.postedBy;
        
        // New artwork year
        const newArtworkYear  = document.createElement('p');
        newArtworkYear.textContent = artwork.year

        // New artwork category
        const newArtworkCategory = document.createElement('p');
        newArtworkCategory.textContent = artwork.category;
    
        // New artwork condition
        const newArtworkCondition = document.createElement('p')
        newArtworkCondition.textContent = artwork.condition;

        // New artwork image
        const newArtworkImage = document.createElement('img');
        newArtworkImage.src = artwork.image;
        newArtworkImage.style.width = "150px";
        newArtworkImage.style.height = "150px";
        console.log(artwork.image)

        // New artwork card body
        const newArtworkCardBody = document.createElement('div');
        newArtworkCardBody.classList.add('card-body');

        // New artwork
        const newArtworkBody = document.createElement('p');
        newArtworkImage.textContent = artwork.image;
        newArtworkTitle.textContent = artwork.title;
        newArtworkPostedBy.textContent = ('Posted By: ' + artwork.postedBy);
        newArtworkYear.textContent = ('Year: ' + artwork.year);
        newArtworkBody.textContent = ('Description: ' + artwork.body);
        newArtworkCategory.textContent = ('Category: ' + artwork.category);
        newArtworkCondition.textContent = ('Condition: ' + artwork.condition);
      
  
        let formattedDate = new Date(artwork.createdAt);
        formattedDate = moment(formattedDate).format('MMMM Do YYYY');
        newArtworkDate.textContent = ` (${formattedDate})`;
  
        newArtworkTitle.appendChild(newArtworkDate);
        newArtworkCardHeading.appendChild(newArtworkImage);
        newArtworkCardHeading.appendChild(newArtworkTitle);
        newArtworkCardHeading.appendChild(newArtworkPostedBy);
        newArtworkCardHeading.appendChild(newArtworkYear);
        newArtworkCardHeading.appendChild(newArtworkCategory);
        newArtworkCardHeading.appendChild(newArtworkCondition);
        newArtworkCardBody.appendChild(newArtworkBody);
        newArtworkCard.appendChild(newArtworkCardHeading);
        newArtworkCard.appendChild(newArtworkCardBody);
        newArtworkCard.setAttribute('data-artwork', JSON.stringify(artwork));
  
        return newArtworkCard;
    };
  
    const handleCategoryChange = (e) => {
        const newArtworkCategory = e.target.value;
        console.log('handleCategoryChange -> newArtworkCategory', newArtworkCategory);
        getArtwork(newArtworkCategory.toLowerCase());
    };
    artworkInfo.addEventListener('change', handleCategoryChange);

  });