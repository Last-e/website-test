/**/
function memory() 
{
	/**/
	if (sessionStorage.getItem("slab_v") == 'yes')
	{
		$("#wrap_page").addClass("slab_wrap");
	}
	else
	{
		$("#wrap_page").removeClass("slab_wrap");
	}
	/**/
}
/**/
$(document).ready(function() {
	/**/
	var win__h = $(window).height();
	var win__w = $(window).width();
	
	// if(win__w > 1200)
	// {
	// 	var ap_b1line__h = win__h - 503;
		
	// 	$("#ap_b1line").css('min-height', ap_b1line__h);
	// }
	/**/
	memory();
	/**/
    $("#hp_slider").slick({
		autoplay: true,
		autoplaySpeed: 5000,
        infinite: true,
        speed: 900,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: true
    });
	/**/
	$("#bnl_slider").slick({
        infinite: true,
        speed: 900,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: true,
		dots: false,
        responsive: [
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
			},
            {
                breakpoint: 620,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
			},
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
			}
		]
    });
	/**/
	$("#bel_slider").slick({
        infinite: true,
        speed: 900,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: true,
		dots: false,
        responsive: [
            {
                breakpoint: 769,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
			},
            {
                breakpoint: 620,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
			},
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
			}
		]
    });
	/**/
	$(".form_tel").mask("+7 (999) 999-99-99");
	/**/
	$("#header_slab, #header_slab_no").click(function () 
	{
		if (sessionStorage.getItem("slab_v") != "yes")
		{
			sessionStorage.setItem("slab_v", "yes");
		}
		else
		{
			sessionStorage.setItem("slab_v", "");
		}
		memory();		
		
		return false;
	});
	/**/
    $("#m-menu-btn").click(function () {
        $("#header_menu > ul").slideToggle();
    });
	/**/
});