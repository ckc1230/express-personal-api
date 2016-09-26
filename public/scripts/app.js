console.log("Sanity Check: JS is working!");
var template;
var $sharksList;
var allSharks = [];

$(document).ready(function(){
  $sharksList = $('#sharksList');
  var source = $('#sharks-template').html();
  template = Handlebars.compile(source);

  $.ajax({
    method: 'GET',
    url: '/api/sjsharks',
    success: handleSuccess,
    error: handleError
  })

  $('#new-shark-form').on('submit', function(e) {
    e.preventDefault();
    $.ajax({
      method:'POST',
      url: '/api/sjsharks',
      data: $(this).serialize(),
      success: newSharkSuccess,
      error: newSharkError 
    })
  })

  $sharksList.on('click', '.deleteBtn', function() {
    console.log("clicked delete button to " + "/api/sjsharks/" + $(this).attr('data-id'));
    $.ajax({
      method: 'DELETE',
      url: '/api/sjsharks/' + $(this).attr('data-id'),
      success: deleteSharkSuccess,
      error: deleteSharkError
    })
  })

  function render() {
    $sharksList.empty();
    var sharksHTML = template({ allsharks: allSharks });
    $sharksList.append(sharksHTML);
  };

  function handleSuccess(json) {
    allSharks = json;
    render();
  }

  function handleError(e) {
    console.log("No good...");
    $('#sharkList').text("Failed to load the players.")
  }

  function newSharkSuccess(json) {
    $('#new-shark-form input').val('');
    $('#submit-button').val('Submit');
    allSharks.push(json);
    render();
  }

  function newSharkError() {
    console.log('New Shark Error!');
  }

  function deleteSharkSuccess(json) {
    var shark = json;
    var sharkId = shark._id;
    for (var i=0; i < allSharks.length; i++) {
      if (allSharks[i]._id === sharkId) {
        allSharks.splice(i,1);
        break;
      }
    }
    render();
  }

  function deleteSharkError() {
    console.log("Uh oh. Didn't delete.");
  }


});
