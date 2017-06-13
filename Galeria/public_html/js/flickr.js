/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function () 
{
    $('#myCarousel').carousel(
    {
        interval: 5000
    });

    $('[id^=carousel-selector-]').click(function () 
    {
        var id_selector = $(this).attr("id");
        try 
        {
            var id = /-(\d+)$/.exec(id_selector)[1];
            console.log(id_selector, id);
            $('#myCarousel').carousel(parseInt(id));
        } catch (e) 
        {
            console.log('Regex failed!', e);
        }
    });
    
    $('#myCarousel').on('slid.bs.carousel', function (e) 
    {
        var id = $('.item.active').data('slide-number');
        $('#carousel-text').html($('#slide-content-' + id).html());
    });
    
        
    $("#tags_done").click(function ()
    {
        var flickr_url = "https://api.flickr.com/services/rest/?method=flickr.photos.search";
        var tags = $("#tags").val().toString().toLowerCase().replace(/ /g, ",");
        var key = "3452cfd03eb7fbb81a0a44681be972ef";
        var tag_mode = "all";
        var extras = "url_m";
        var per_page = 10;
        var format = "json";
        var nojsoncallback = 1;
        var complete_flickr_url = flickr_url + "&api_key=" + key + "&tags=" + tags + "&tag_mode=" + tag_mode + "&extras=" + extras + "&per_page=" + per_page + "&format=" + format + "&nojsoncallback=" + nojsoncallback;
        
        for(var i=0;i<10;i++){
            $("#image_small_" + i).attr("src", "http://placehold.it/150x150&text="+i);
            $("#image_large_" + i).attr("src", "http://placehold.it/470x480&text="+i);
        }
        
        $.getJSON(complete_flickr_url,
            function (data)
            {                               
                if (data.photos.photo.length === 0)alert("No images found!");             
                else
                {
                    if(data.photos.photo.length<10)alert("We found only "+data.photos.photo.length+" images.");
                    $.each(data.photos.photo, function (i, item)
                    {                      
                        $("#image_small_" + i).attr("src", item.url_m).width(100).height(100);                       
                        $("#image_large_" + i).attr("src", item.url_m).width(530).height(470);                      
                    });
                }
            });
    });
});


