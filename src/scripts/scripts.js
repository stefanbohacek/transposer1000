$(document).ready(function(){

  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top-70
        }, 1000);
        return false;
      }
    }
  });

  /* Copy, paste, thank you Nathan! (nspady.com) */
  var $dropZone = $('#transposer');
  var handleDragEnter = function(event){
    $dropZone.addClass('transposer-hover');
    return false;
  };
  var handleDragLeave = function(event){
    $dropZone.removeClass('transposer-hover');
    return false;
  };
  var handleDragOver = function(event){
    return false;
  };
  var handleDrop = function(event){
    $dropZone.removeClass('transposer-hover');
    handleFiles(event.originalEvent.dataTransfer.files);
    return false;
  };
  $dropZone
    .on('dragenter', handleDragEnter)
    .on('dragleave', handleDragLeave)
    .on('dragover', handleDragOver)
    .on('drop', handleDrop);

  function handleFiles(files) {
    var $draggedImages = $('#dragged-images');
    var imageType      = /image.*/;
    var fileCount      = files.length;

    for (var i = 0; i < fileCount; i++) {
      var file = files[i];

      if (file.type.match(imageType)) {
        var reader = new FileReader();
        reader.onload = function(event) {
          $('html,body').animate({
            scrollTop: $("#dragged-image-preview").offset().top-70
          }, 1000);
          var base64data = event.target.result;
          $("#dragged-image-preview").attr("src", base64data);
           var data = {
            content:{
              data: base64data
            },
            metadata:{
              hello: "stefan@fourtonfish.com"
            }
          };

          $.ajax({
              url: "./service",
              type: "POST",
              data: JSON.stringify(data, null, '\t'),
              contentType: 'application/json;charset=UTF-8',
             success: function(data)
             {
                alert('DONE.');
                console.log(data["content"]["data"]);
                $("#dragged-image-preview").attr("src", data.content.data);

             },
             error: function(data)
             {
                alert('ERROR.');
                console.log(data);
             }
          }); 

          imageInfo = { images: [
            {'class': 'dragged-image-preview', file: event.target.result}
            ]};

            var $imageSection = $draggedImages.find('.image-section').first();
            var $image        = $('#dragged-image-preview');

            $image.on('load', function() {
              console.log("READY.");
            });
          };
          reader.readAsDataURL(file);

        } else {
          alert('NO.');
        }
      }
    }


  });