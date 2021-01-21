console.log("Sanity Check");

/* CLIENT-SIDE JS */

$(document).ready(function() {
    //grab data from the server to display on the page
    renderPhotos();
  
    $('#photo-share form').on('submit', function(event){
      event.preventDefault();
      $.ajax({
        method: 'POST',
        url: '/api/photos/',
        data: $(this).serialize(),
        success: renderNewPhoto,
        error: handleError
      });
      $(this).trigger("reset");
    });
  
    /* Changes existing post */
    $('#photos').on('click', '.delete-photo', handleDelete);
    $('#photos').on('click', '.edit-photo', handleEdit);
    $('#photos').on('click', '.save-photo', saveEdits);
    $('#photos').on('click', '.cancel', cancelChanges);
  
  });
  
  
  function handleEdit(event) {
    var currentPost = $(this).closest('.photo-post');
    var photoId = currentPost.data('photo-id');
  
    currentPost.find('.save-photo').toggleClass('hidden');
    currentPost.find('.edit-photo').toggleClass('hidden');
    currentPost.find('.edit-tags').toggleClass('hidden');
    currentPost.find('.delete-photo').toggleClass('hidden');
    currentPost.find('.cancel').toggleClass('hidden');
  
    var title = currentPost.find('h3.title').text();
    currentPost.find('h3.title').html('<input class="edit-title" value="' + title + '"></input>');
  
    var about = currentPost.find('p.about').text();
    currentPost.find('p.about').html('<input class="edit-about" value="' + about + '"></input>');
  }
  
  
  function cancelChanges(event) {
    var currentPost = $(this).closest('.photo-post');
    var photoId = currentPost.data('photo-id');
  
    currentPost.find('.save-photo').toggleClass('hidden');
    currentPost.find('.edit-photo').toggleClass('hidden');
    currentPost.find('.edit-tags').toggleClass('hidden');
    currentPost.find('.delete-photo').toggleClass('hidden');
    currentPost.find('.cancel').toggleClass('hidden');
  
    var title = currentPost.find('h3.title input').val();
    currentPost.find('h3.title').text(title);
  
    var about = currentPost.find('p.about input').val();
    currentPost.find('p.about').text(about);
  }
  
  
  function saveEdits(event) {
    var photoId = $(this).closest('.photo-post').data('photo-id');
    var currentPost = $('[data-photo-id=' + photoId + ']');
  
    var data = {
      title: currentPost.find('.edit-title').val(),
      about: currentPost.find('.edit-about').val(),
    };
    $.ajax({
      method: 'PUT',
      url: '/api/photos/' + photoId,
      data: data,
      success: updatePhoto
    });
  }
  
  
  function updatePhoto (data) {
    var photoId = data._id;
    $('[data-photo-id=' + photoId + ']').remove();
    renderNewPhoto(data);
  }
  
  
  function renderPhotos() {
    $.ajax({
      method: 'GET',
      url: '/api/photos/',
      success: handleSuccess,
      error: handleError
    });
  }
  
  
  function renderHTML(pics) {
    var source = $('#pic-template').html();
    var template = Handlebars.compile(source);
    var newHTML = template(pics);
    $('#photos').append(newHTML);
  }
  
  
  function handleDelete(event) {
    var photoId = $(this).closest('.photo-post').data('photo-id');
    $.ajax({
      url: '/api/photos/' + photoId,
      method: 'DELETE',
      success: handleDeletePhotoSuccess,
      error: handleError
    });
  }
  
  
  function handleDeletePhotoSuccess(data) {
    var deletedPhotoId = data._id;
    $('div[data-photo-id=' + deletedPhotoId + ']').remove();
  }
  
  
  function renderNewPhoto(photo) {
    var source = $('#pic-template').html();
    var template = Handlebars.compile(source);
    var newHTML = template(photo);
    $('#photos').append(newHTML);
  }
  
  
  function handleSuccess(json) {
    json.forEach(renderHTML);
  }
  
  
  function handleError(error) {
    console.log("DAMMIT! ERROR!! ", error);
    alert("Sorry, something went wrong. Please try again later.");
  }