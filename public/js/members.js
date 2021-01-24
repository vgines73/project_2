// Wait for the DOM to completely load before we run our JS
document.addEventListener('DOMContentLoaded', (e) => {
    if (e) {
      console.log('DOM loaded! 🚀');
    }
  
    const artworkInfo = document.querySelector('.artwork-info');
    const createArt = document.getElementById('create-art');
    const titleInput = document.getElementById('title');
    const postedByInput = document.getElementById('posted-by');
    const yearInput = document.getElementById('year');
    const bodyInput = document.getElementById('body');
    const categoryInput = document.getElementById('category');
    const conditionInput = document.getElementById('condition');
    const imageInput = document.getElementById('image')
  
    let artworks;
  
    // Function to grab posts from the database
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
  
          if (!artworks.length) {
            displayEmpty();
          } else {
            initializeRows();
          }
        })
        .catch((error) => console.error('Error:', error));
    };
  
    // Function to make DELETE request for an artwork
    const deleteArtwork = (id) => {
      fetch(`/api/artworks/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then(() => getArtwork(titleInput.value, postedByInput.value, yearInput.value, bodyInput.value, categoryInput.value, conditionInput.value, imageInput.value));
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
  
      // Delete button
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'x';
      deleteBtn.classList.add('delete', 'btn', 'btn-danger');
      deleteBtn.addEventListener('click', handleArtworkDelete);
  
      // Edit button
      const editBtn = document.createElement('button');
      editBtn.textContent = 'EDIT';
      editBtn.classList.add('delete', 'btn', 'btn-danger');
      editBtn.addEventListener('click', handleArtworkEdit);
  
      // New post info
      const newArtworkTitle = document.createElement('h2');
      const newArtworkDate = document.createElement('small');
  
      // New post category
      const newArtworkCategory = document.createElement('h5');
      newArtworkCategory.textContent = artwork.category;
      newArtworkCategory.style.float = 'right';
      newArtworkCategory.style.fontWeight = '700';
      newArtworkCategory.style.marginTop = '-15px';
  
      // New post card body
      const newArtworkCardBody = document.createElement('div');
      newArtworkCardBody.classList.add('card-body');
  
      // New Post
      const newArtworkBody = document.createElement('p');
      newArtworkTitle.textContent = artwork.title;
    //   newArtworkPostedBy.textContent = artwork.postedBy;
    //   newArtworkYear.textContent = artwork.year;
      newArtworkBody.textContent = artwork.body;
      newArtworkCategory.textContent = artwork.category;
    //   newArtworkCondition.textContent = artwork.condition;
    //   newArtworkImage.textContent = artwork.image;
  
      let formattedDate = new Date(artwork.createdAt);
      formattedDate = moment(formattedDate).format('MMMM Do YYYY, h:mm:ss a');
      newPostDate.textContent = ` (${formattedDate})`;
  
      newArtworkTitle.appendChild(newArtworkDate);
      newArtworkCardHeading.appendChild(deleteBtn);
      newArtworkCardHeading.appendChild(editBtn);
      newArtworkCardHeading.appendChild(newArtworkTitle);
      newArtworkCardHeading.appendChild(newArtworkCategory);
      newArtworkCardBody.appendChild(newArtworkBody);
      newArtworkCard.appendChild(newArtworkCardHeading);
      newArtworkCard.appendChild(newArtworkCardBody);
      newArtworkCard.setAttribute('data-artwork', JSON.stringify(artwork));
  
      return newArtworkCard;
    };
  
    const handleArtworkDelete = (e) => {
      const currentArtwork = JSON.parse(
        e.target.parentElement.parentElement.dataset.artwork
      );
      console.log('handleArtworkDelete -> currentArtwork', currentArtwork);
      deleteArtwork(currentArtwork.id);
    };
  
    const handleArtworkEdit = (e) => {
      const currentArtwork = JSON.parse(
        e.target.parentElement.parentElement.dataset.artwork
      );
      console.log('handleArtworkDelete -> currentArtwork', currentArtwork);
      window.location.href = `/create?artwork_id=${currentArtwork.id}`;
    };
  
    const displayEmpty = () => {
      artworkInfo.innerHTML = '';
      const messageH2 = document.createElement('h4');
      messageH2.style.textAlign = 'center';
      messageH2.style.marginTop = '50px';
      messageH2.innerHTML = `No posts yet for this category. <br>Click <a href="/create">here</a> to make a new post.`;
      artworkInfo.appendChild(messageH2);
    };
  
    const handleCategoryChange = (e) => {
      const newArtworkCategory = e.target.value;
      console.log('handleCategoryChange -> newArtworkCategory', newArtworkCategory);
      getPosts(newArtworkCategory.toLowerCase());
    };
    artworkInfo.addEventListener('change', handleCategoryChange);
  });
  