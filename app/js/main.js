  // create input type date element for mozzila and ie

var datefield = document.createElement("input")
datefield.setAttribute("type", "date")
if (datefield.type!="date"){ //if browser doesn't support input type="date", load files for jQuery UI Date Picker
  document.write('<link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="stylesheet" type="text/css" />\n')
  document.write('<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js"><\/script>\n')
  document.write('<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js"><\/script>\n') 
    }

  

// document ready
jQuery(document).ready(function() {

  // cashing DOM
  // normally i use let instead of var
  var name = $('#name');
  var nameError = $('#name-error');
  var lastName = $('#lastname');
  var lastNameError = $('#lastNameError');
  var date = $('#date');
  var dateError = $('#dateError');
  var address = $('#address');
  var addressError = $('#addressError');

  //upload
  var upload = $('#file-upload');
  var uploadError = $('#uploadError');

  var city = $('#city');
  var cityError = $('#cityError');
  var zip = $('#zip');
  var zipError = $('#zipError');
  var phone = $('#phone');
  var phoneError = $('#phoneError');
  var email = $('#email');
  var emailError = $('#emailError');
  var male = $('#male');
  var female = $('#female');

  var btn = $('#btn-submit');

 



  // crete on document.ready input-date for firefox and ie
  if (datefield.type!="date") { //if browser doesn't support input type="date", initialize date picker widget:
    //on document.ready
    date.datepicker();
  };

    // function constructor model for repeating tasks
  function isError(input, inputError) {
    if (input.val().length < 3) {
      turnOnRed(input, inputError)

    } else {
      inputError.hide(500);
      turnOffRed(input, inputError)
    }
  }

  function turnOnRed(input, inputError) {
    inputError.show(500);
    input.parents('.input-group').addClass('isRed');
  }

  function turnOffRed(input, inputError) {
    inputError.hide(500);
    input.parent().removeClass('isRed');
  }


  //focusOut Events and showing spanErrors if needs

    name.focusout(function() {
      isError(name, nameError);
    });

    lastName.focusout(function() {
      isError(lastName, lastNameError)
    });

    date.focusout(function() {
      if (date.val() == "") {
        turnOnRed(date, dateError)
      } else {
        turnOffRed(date, dateError)
      }
    });

    address.focusout(function() {
      isError(address, addressError);
    });

    city.focusout(function() {
      isError(city, cityError);
    });

    zip.focusout(function() {
      isError(zip, zipError);
    });

    phone.focusout(function() {
      if (isNaN($('#phone').val()) == false) {
        turnOffRed(phone, phoneError)
        isError(phone, phoneError);
      } else {
        turnOnRed(phone, phoneError)
      }
    });

    // regex object
    function isEmail(email) {
      var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return regex.test(email);
  }

    email.focusout(function() {
      if (isEmail($("#email").val()) == false) {
        turnOnRed(email, emailError);

      } else {
        turnOffRed(email, emailError);
      }
    });



  btn.click(function(){
    
    // $.when(checkErrors()).then(fire());

    checkErrors();
    fire();
    // check errorSpans
    function checkErrors() {


      if (name.val() == "") {
        turnOnRed(name, nameError);
      } else {
        turnOffRed(name, nameError);
      }
      
      if (lastName.val() == "") {
        turnOnRed(lastName, lastNameError);
      } else {
        turnOffRed(lastName, lastNameError);
      }

      if (date.val() == "") {
        turnOnRed(date, dateError);
      } else {
        turnOffRed(date, dateError);
      }

      if (address.val() == "") {
        turnOnRed(address, addressError);
      } else {
        turnOffRed(address, addressError);
      }
      
      if (upload.val() == "") {
        turnOnRed(upload, uploadError);
      } else {
        turnOffRed(upload, uploadError);
      }

      if (city.val() == "") {
        turnOnRed(city, cityError);
      } else {
        turnOffRed(city, cityError);
      }

      if (zip.val() == "") {
        turnOnRed(zip, zipError);
      } else {
        turnOffRed(zip, zipError);
      }

      if (isNaN($('#phone').val()) == false) {
        turnOffRed(phone, phoneError);
        isError(phone, phoneError);
      } else {
        turnOnRed(phone, phoneError);
      }

      if (isEmail($("#email").val()) == false) {
        turnOnRed(email, emailError);
      } else {
        turnOffRed(email, emailError);
      }
      
      
    };
    
    
     //fire ajax
     function fire() {
      if ($('.input-group').hasClass('isRed')) {
        return
      } else {
        //ajax call
        callAJAX();
      }
     }
    
     function callAJAX() {
        $('#success_message').show(500);

        function sex() {
         $( "input:checked" ).val();
        };
         
        // get the form data
        // there are many ways to get this data using jQuery (you can use the class or id also)
        var formData = {
          'Name'             : name.val(),
          'Last Name'        : lastName.val(),
          'Date Of Birth'    : date.val(),
          'Gender'           : sex(),
          'Address'          : address.val(),
          'Picture'          : upload.val(),
          'Phone'            : phone.val(),
          'Email'            : email.val()
        };

    // process the form
    $.ajax({
      type    : 'POST', // define the type of HTTP verb we want to use (POST for our form)
      url     : 'test.php', // the url where we want to POST
      data    : formData, // our data object
      dataType  : 'json', // what type of data do we expect back from the server
      encode    : true
    })
      // using the done promise callback
      .done(function(data) {

        // log data to the console so we can see
        console.log(data); 

        // here we will handle errors and validation messages
        

       })

      // using the fail promise callback
      .fail(function(data) {

        // show any errors
        // best to remove for production
        console.log(data);
      });

    // stop the form from submitting the normal way and refreshing the page
    event.preventDefault();

     }


  });



});

