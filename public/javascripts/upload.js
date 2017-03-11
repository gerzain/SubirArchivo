$('.upload-btn').on('click', function (){
    $('#upload-input').click();
    $('.progress-bar').text('0%');
    $('.progress-bar').width('0%');
});

$('#upload-input').on('change', function(){

  var files = $(this).get(0).files;

  if (files.length > 0){
    
    var formData = new FormData();

    
    for (var i = 0; i < files.length; i++) {
      var file = files[i];

    
      formData.append('uploads[]', file, file.name);
    }

    $.ajax({
      url: '/upload',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(data){
          console.log('Se subio correctamente !\n' + data);
      },
      xhr: function() {
        // crear  una nueva  XMLHttpRequest
        var xhr = new XMLHttpRequest();

        // crear un evento 
        xhr.upload.addEventListener('progress', function(evt) 
        {

          if (evt.lengthComputable) 
          {
            // Calcular el porcentaje de subida 
            var percentComplete = evt.loaded / evt.total;
            percentComplete = parseInt(percentComplete * 100);

            // actualizar  porcentaje de subida 
            $('.progress-bar').text(percentComplete + '%');
            $('.progress-bar').width(percentComplete + '%');

            // Cuando termina muetrsa el mensaje de completado 
            if (percentComplete === 100) {
              $('.progress-bar').html('Completado');
            }

          }

        }, false);

        return xhr;
      }
    });

  }
});
