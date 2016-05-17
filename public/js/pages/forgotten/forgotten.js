jQuery(document).ready(function() {
    $("form#form-reset button.btn").bind( 'click', function (e){
        e.preventDefault();
        var url = document.URL;
        var email = $('#email').val();
        if (email) {
            $('form#form-reset button').attr("disabled", true);
            $('.bg-gray').attr('style', 'background-color: rgba(234, 234, 236, 0.8) !important;');
            $('div#reset-box .header').css('opacity', '0.8');
            $('div#reset-box .footer').css('opacity', '0.8');
            $('input#email').css('opacity', '0.8');
            $('img.loading').show();
            
            $.ajax({
                url: url,
                type: 'POST',
                cache: false,
                contentType: 'application/x-www-form-urlencoded',
                dataType: 'json',
                data: {email:email},
                success: function(data){
                    $('.bg-gray').attr('style', 'background-color: rgba(234, 234, 236, 0.8)');
                    $('div#reset-box .header').css('opacity', '1');
                    $('div#reset-box .footer').css('opacity', '1');
                    $('input#email').css('opacity', '1');
                    $('img.loading').hide(); 
	                if (data) {
	                    $('label.error').html('Your Password changed. Please check your email.');
	                } else {
	                    $('label.error').html('This email address is not register.');
	                }
                    $('form#form-reset button').attr("disabled", false);
                }
            });     
        }                         
    }) ;    
});