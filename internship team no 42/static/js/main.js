$(document).ready(function () {
    // Init
    $('.image-section').hide();
    $('.image-section1').hide();
    $('.loader').hide();
    $('.loader1').hide();
    $('#result').hide();
    $('#result1').hide();

    // Upload Preview
    function readURL(input,flag) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            var imagePreview=flag?'imagePreview':'imagePreview1'
            reader.onload = function (e) {
                $(`#${imagePreview}`).css('background-image', 'url(' + e.target.result + ')');
                $(`#${imagePreview}`).hide();
                $(`#${imagePreview}`).fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#imageUpload").change(function () {
        $('.image-section').show();
        $('#btn-predict').show();
        $('#result').text('');
        $('#result').hide();
        readURL(this,true);
    });
    $("#imageUpload1").change(function () {
        $('.image-section1').show();
        $('#btn-predict1').show();
        $('#result1').text('');
        $('#result1').hide();
        readURL(this,false);
    });

    // Predict
    $('#btn-predict').click(function () {
        var form_data = new FormData($('#upload-file')[0]);

        // Show loading animation
        $(this).hide();
        $('.loader').show();

        // Make prediction by calling api /predict
        $.ajax({
            type: 'POST',
            url: '/predict',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                $('.loader').hide();
                $('#result').fadeIn(600);
                $('#result').text(' Result:  ' + data);
                console.log('Success!',data);
            },
        });
    });
    $('#btn-predict1').click(function () {
        var form_data = new FormData($('#upload-file1')[0]);

        // Show loading animation
        $(this).hide();
        $('.loader').show();

        // Make prediction by calling api /predict
        $.ajax({
            type: 'POST',
            url: '/predict',
            data: form_data,
            contentType: false,
            cache: false,
            processData: false,
            async: true,
            success: function (data) {
                // Get and display the result
                $('.loader').hide();
                $('#result1').fadeIn(600);
                $('#result1').text(' Result:  ' + data);
                console.log('Success!',data);
            },
        });
    });
});
