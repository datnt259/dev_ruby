jQuery(document).ready(function() {
$("#form-editprofile").validate({
	rules:{
		name:{
			required:true,
			minlength:6,
			remote:{
				url:"check/check-edit-username",
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
			minlength:6
		},
		re_password:{
			equalTo:"#password"
		},
		email:{
			required:true,
			email:true,
			remote:{
				url:"check/check-edit-email",
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
        zip:{
            required:true,
			minlength:5,
            maxlength:5,
            number: true,
            digits: true
		},
        phone:{
			required:true,
		},
        address:{
			required:true,
		},
        bank_name:{
			required:true,
		},
        bank_branch_name:{
			required:true,
		},
        bank_account:{
			required:true,
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
		re_password:{
		    required:"Please fill out re-password field",
			equalTo:"Confirm password is incorrect"
		},
		email:{
			required:"Please fill out email address field",
			email:"This is an invalid email format",
			remote:"This email has already been taken"
		},
        zip:{
			minlength:"Zip code must be 5 characters",
            maxlength:"Zip code must be 5 characters",
            number:"Zip code must be digits",
		},
        phone:{
            required:"Please fill out phone field"
        },
        address:{
            required:"Please fill out address field"
        },
        bank_name:{
            required:"Please fill out bank name field"
        },
        bank_branch_name:{
            required:"Please fill out bank branch name field"
        },
        bank_account:{
            required:"Please fill out bank account field"
        }
	},
    submitHandler: function() {
        var data = [];
        param = {'email':$('#email').val(), 'name':$('#name').val(), 'password':$('#password').val(),'re-password':$('#re-password').val(),
                 'phone':$('#txtPhone').val(), 'zipcode':$('#zip').val(), 'address':$('#txtAddress').val(), 'bank_name':$('#txtBankName').val(),
                 'bank_branch_name':$('#txtBankBranchName').val(), 'bank_account':$('#txtBankAccount').val(), 'protocol':window.location.protocol + '//' + window.location.host};
        $('img.edit-loading').show();
        $('button.btn').attr("disabled", true); 
        $.ajax({
                url: '/account',
                type: 'PUT',
                cache: false,
                contentType: 'application/x-www-form-urlencoded',
                dataType: 'json',
                data: $.param(param),
                success: function(data){
                    $('button.btn').attr("disabled", false); 
                    data = data.changed;
                    var string = '';
                    count = 0;
                    if (data['email']) {
                        if (count) {
                            string +=', ';
                        }
                        count ++;
                        string += 'E-mail address';
                        $('#confirm_email').closest('.row').attr('class','row');
                        $('#confirm_email').html('Please check your new e-mail address to confirm email change.');
                        
                    }
                    if (data['name']) {
                        if (count) {
                            string +=', ';
                        }
                        count ++;
                        string += 'Name';
                    }
                    if (data['password']) {
                        if (count) {
                            string +=', ';
                        }
                        count ++;
                        string += 'Password';
                    }
                    if (data['phone_number']) {
                        if (count) {
                            string +=', ';
                        }
                        count ++;
                        string += 'Phone number';
                    }
                    if (data['zip']) {
                        if (count) {
                            string +=', ';
                        }
                        count ++;
                        string += 'Zip code';
                    }
                    if (data['address']) {
                        if (count) {
                            string +=', ';
                        }
                        count ++;
                        string += 'Address';
                    }
                    if (data['bank_name']) {
                        if (count) {
                            string +=', ';
                        }
                        count ++;
                        string += 'Bank Name';
                    }
                    if (data['bank_branch_name']) {
                        if (count) {
                            string +=', ';
                        }
                        count ++;
                        string += 'Bank Branch Name';
                    }
                    if (data['bank_account_number']) {
                        if (count) {
                            string +=', ';
                        }
                        count ++;
                        string += 'Bank Account';
                    }
                    if (string) {
                        if (count > 1) {
                            string = 'Your ' + string + ' have been changed.';
                        } else {
                            string = 'Your ' + string + ' has been changed.';
                        }
                        $('#confirm').closest('.row').attr('class','row');
                        $('#confirm').html(string);
                    }
                    $('img.edit-loading').hide(); 
                }
            });  
    }
})
});
