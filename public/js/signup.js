$(document).ready(function () {
    
    $(document).on('submit','#signupform',function(e){
        
        var post_obj = {};

        $.each($('#signupform').serializeArray(), function () {
            post_obj[this.name] = this.value;
        });

        $.post("api/signup", post_obj ,function (data) {
            
            if(data.result == true)
            {
                alert('Sign up successfully');
                window.location.href = '/login';
            }

            $('#signupalert').empty('div').show();

            $.each(data.msg,function( i,v ) {
                $('#signupalert').append('<div>'+v.join(',')+'</div>');
                $('#signupform').find('input[name="'+i+'"]').closest('div').addClass('has-error');
            });

        });

        e.preventDefault();
        return false;
    });
});