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

    // function to update the artwork
    const updateArtwork = (artwork) => {
        console.log('attempting to update', artwork);
        fetch(`/api/artworks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(artwork),
        }).then((response) => console.log(response));
    };

    // Function to make DELETE request for an artwork
    const deleteArtwork = (id) => {
        fetch(`/api/artworks/${id}`, {
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
        },
        }).then(() => {
            console.log(artworks.id)
            getArtwork(artworks.id);
        })
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
        // added 2 classes so card can be wrapped
        newArtworkCard.classList.add('card', 'col-md-4');
        newArtworkCard.setAttribute('id', 'art-card');
   
  
        // Heading
        const newArtworkCardHeading = document.createElement('div');
        newArtworkCardHeading.classList.add('card-header');
  
        // Delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'x';
        deleteBtn.classList.add('delete', 'btn', 'btn-danger');
        deleteBtn.style.float = "right"
        deleteBtn.addEventListener('click', handleArtworkDelete);
  
        // Edit button
        const editBtn = document.createElement('button');
        editBtn.textContent = 'EDIT';
        editBtn.classList.add('delete', 'btn', 'btn-danger');
        editBtn.style.float = "right";
        editBtn.addEventListener('click', handleArtworkEdit);
  
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


        // New artwork what the user will see in the browser
        const newArtworkBody = document.createElement('p');
        newArtworkImage.textContent = artwork.image;
        newArtworkTitle.textContent = artwork.title;
        newArtworkPostedBy.textContent = ('Posted By: ' + artwork.postedBy);
        newArtworkYear.textContent = ('Year: ' + artwork.year);
        newArtworkBody.textContent = ('Description: ' + artwork.body);
        newArtworkCategory.textContent = ('Category: ' + artwork.category);
        newArtworkCondition.textContent = ('Condition: ' + artwork.condition);
        
        // Moment used here for the date the user posted the artwork
        let formattedDate = new Date(artwork.createdAt);
        formattedDate = moment(formattedDate).format('MMMM Do YYYY');
        newArtworkDate.textContent = ` (${formattedDate})`;
  
        newArtworkTitle.appendChild(newArtworkDate);
        newArtworkCardHeading.appendChild(deleteBtn);
        newArtworkCardHeading.appendChild(editBtn);
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
    

    // delete artwork by id
    const handleArtworkDelete = (e) => {
        const currentArtwork = JSON.parse(
            e.target.parentElement.parentElement.dataset.artwork
        );
        console.log('handleArtworkDelete -> currentArtwork', currentArtwork);
        deleteArtwork(currentArtwork.id);
    };
    
    // edit artwork by id
    const handleArtworkEdit = (e) => {
        const currentArtwork = JSON.parse(
            e.target.parentElement.parentElement.dataset.artwork
        );
        console.log('handleArtworkEdit -> currentArtwork', currentArtwork);
        window.location.href = `/create?artwork_id=${currentArtwork.id}`;
        updateArtwork(currentArtwork.id);
    };
  
    const handleCategoryChange = (e) => {
        const newArtworkCategory = e.target.value;
        console.log('handleCategoryChange -> newArtworkCategory', newArtworkCategory);
        getArtwork(newArtworkCategory.toLowerCase());
    };
    artworkInfo.addEventListener('change', handleCategoryChange);


  // add artwork button bring user to create page to add artwork
  document.getElementById('addArtworkButton').onclick = () => {
        location.href = './create.html';
    };
});
  