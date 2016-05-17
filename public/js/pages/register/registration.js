jQuery(document).ready(function() {
var url = document.URL;
$('.icheckbox_minimal').css('background','none');
$('input.term').css('opacity', '1');
$('#url').val(url);
$('.bs-error-register-modal-lg').modal('show');

$("#form-register").validate({
	rules:{
		name:{
			required:true,
			minlength:6,
			remote:{
				url:"check/check-username",
				type:"POST",
                dataType: "json",
				dataFilter: function(data) {
					var json = JSON.parse(data);
                    console.log(json.result);                    
					if (json.result === true) {
						return 'true';
					}
					return '"'+ json.result +'"';
				}                              
			}
		},
		password:{
			required:true,
			minlength:6
		},
		password_confirmation:{
		    required:true,
			equalTo:"#password"
		},
		email:{
			required:true,
			email:true,
			remote:{
				url:"check/check-email",
				type:"POST",
                dataType: "json",
				dataFilter: function(data) {
					var json = JSON.parse(data);
                    console.log(json.result);                    
					if (json.result === true) {
						return 'true';
					}
					return '"'+ json.result +'"';
				} 
			}
		},
        term:{
            required:true
        }
	},
	messages:{
		name:{
			required:"Please fill out username field",
			minlength:"Username must be at least 6 characters",
			remote:"This username has already been taken"
		},
		password:{
			required:"Please fill out password field",
			minlength:"Password must be at least 6 characters",
		},
		password_confirmation:{
		    required:"Please fill out re-password field",
			equalTo:"Confirm password is incorrect"
		},
		email:{
			required:"Please fill out email address field",
			email:"This is an invalid email format",
			remote:"This email has already been taken"
		},
        term:{
            required:"Please check Dandismo's terms of service"
        }
	},
    errorPlacement: function (error, element) {
        error.insertAfter(element);
        if ($('#term-button label.error')) {
            $('#term-button label.error').insertAfter('#term-button a');
        }
    }
})
});