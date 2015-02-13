$(document).ready(function() {

  var createAccount = function(){

    var name = $("#username").val(),
        password = $("#password").val(),
        passwordAgain = $("#password-again").val();
        //image = $("#inputFileToLoad").files[0];

        console.log(image);

    $.ajax({
      url: "http://localhost:3700/api/users",
      type: "POST",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify({
        "name": name,
        "password": password
        //"avatar": image
      })
    });
  }


  $(document).on("click", "#create-account", function(){
    createAccount();
  });

  function loadImageFileAsURL()
  {
      var filesSelected = document.getElementById("inputFileToLoad").files;
      if (filesSelected.length > 0)
      {
          var fileToLoad = filesSelected[0];

          if (fileToLoad.type.match("image.*"))
          {
              var fileReader = new FileReader();
              fileReader.onload = function(fileLoadedEvent)
              {
                  var imageLoaded = document.createElement("img");
                  imageLoaded.src = fileLoadedEvent.target.result;
                  document.body.appendChild(imageLoaded);
              };
              fileReader.readAsDataURL(fileToLoad);
          }
      }
  }

  $(document).on("click", "#image-button", function(){
    loadImageFileAsURL();
  });

});
