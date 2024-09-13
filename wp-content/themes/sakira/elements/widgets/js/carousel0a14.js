( function( $ ) {

    $( window ).on( 'elementor/frontend/init', function() {
        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_post_carousel.default', function( $scope ) {
            pxl_swiper_handler($scope);
        } );

        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_team_carousel.default', function( $scope ) {
            pxl_swiper_handler($scope);
        } );

        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_testimonial_slip.default', function( $scope ) {
            pxl_swiper_handler($scope);
        } );

        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_tab_carousel.default', function( $scope ) {
            pxl_swiper_handler($scope);
        } );

        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_testimonial_carousel.default', function( $scope ) {
            pxl_swiper_handler($scope);
        } );

        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_partner_carousel.default', function( $scope ) {
            pxl_swiper_handler($scope);
        } );

        elementorFrontend.hooks.addAction( 'frontend/element_ready/pxl_icon_box_carousel.default', function( $scope ) {
            pxl_swiper_handler($scope);
        } );
  
    } );
    
    
    function pxl_swiper_handler($scope){
        $scope.find('.pxl-swiper-slider').each(function(index, element) {
            var $this = $(this);
            
            var settings = $this.find(".pxl-swiper-container").data().settings;

            var carousel_settings = {
                direction: settings['slide_direction'],
                effect: settings['slide_mode'],
                wrapperClass : 'pxl-swiper-wrapper',
                slideClass: 'pxl-swiper-slide',
                slidesPerView: settings['slides_to_show'],
                slidesPerGroup: settings['slides_to_scroll'],
                slidesPerColumn: settings['slide_percolumn'],
                spaceBetween: 0,
                observer: true,
                observeParents: true,
                navigation: {
                    nextEl: $this.find('.pxl-swiper-arrow-next')[0],
                    prevEl: $this.find('.pxl-swiper-arrow-prev')[0],
                },
                pagination : {
                    type: settings['pagination_type'],
                    el: $this.find('.pxl-swiper-dots')[0],
                    clickable : true,
                    modifierClass: 'pxl-swiper-pagination-',
                    bulletClass : 'pxl-swiper-pagination-bullet',
                    renderCustom: function (swiper, element, current, total) {
                        return current + ' of ' + total;
                    }
                },
                speed: settings['speed'],
                watchSlidesProgress: true,
                watchSlidesVisibility: true,
                breakpoints: {
                    0 : {
                        slidesPerView: settings['slides_to_show_xs'],
                        slidesPerGroup: settings['slides_to_scroll'],
                    },
                    576 : {
                        slidesPerView: settings['slides_to_show_sm'],
                        slidesPerGroup: settings['slides_to_scroll'],
                    },
                    768 : {
                        slidesPerView: settings['slides_to_show_md'],
                        slidesPerGroup: settings['slides_to_scroll'],
                    },
                    992 : {
                        slidesPerView: settings['slides_to_show_lg'],
                        slidesPerGroup: settings['slides_to_scroll'],
                    },
                    1200 : {
                        slidesPerView: settings['slides_to_show'],
                        slidesPerGroup: settings['slides_to_scroll'],
                    },
                    1400 : {
                        slidesPerView: settings['slides_to_show_xxl'],
                        slidesPerGroup: settings['slides_to_scroll'],
                    }
                },
                on: {

                    slideChangeTransitionStart : function (swiper){
                        var activeIndex = this.activeIndex;
                        $(this.slides).each(function(index){
                            if(index == activeIndex)
                                $(this).find('.wow').removeClass('pxl-invisible').addClass('animated');
                            else
                                $(this).find('.wow').removeClass('animated').addClass('pxl-invisible');
                        });
                        
                    },

                    slideChange: function (swiper) { 
                        
                        var activeIndex = this.activeIndex; 
                        $(this.slides).each(function(index){
                            if(index == activeIndex)
                                $(this).find('.wow').removeClass('pxl-invisible').addClass('animated');
                            else
                                $(this).find('.wow').removeClass('animated').addClass('pxl-invisible');
                        });
 
                    },

                    sliderMove: function (swiper) { 
                        
                        var activeIndex = this.activeIndex; 
                        $(this.slides).each(function(index){
                            if(index == activeIndex)
                                $(this).find('.wow').removeClass('pxl-invisible').addClass('animated');
                            else
                                $(this).find('.wow').removeClass('animated').addClass('pxl-invisible');
                        });
 
                    },

                }
            };

            if(settings['center_slide'] || settings['center_slide'] == 'true')
                carousel_settings['centeredSlides'] = true;

            if(settings['loop'] || settings['loop'] === 'true'){
                carousel_settings['loop'] = true;
            }

            if(settings['autoplay'] || settings['autoplay'] === 'true'){
                carousel_settings['autoplay'] = {
                    delay : settings['delay'],
                    disableOnInteraction : settings['pause_on_interaction']
                };
            } else {
                carousel_settings['autoplay'] = false;
            }

            // Creative Effect
            if(settings['creative-effect'] === 'effect1'){
                carousel_settings['creativeEffect'] = {
                    prev: {
                        opacity: 0,
                    },
                    next: {
                        opacity: 0,
                    },
                };
            }

            // Start Swiper Thumbnail
            if($this.find('.pxl-swiper-thumbs').length > 0) {
                
                var thumb_settings = $this.find('.pxl-swiper-thumbs').data().settings;

                var thumb_carousel_settings = {
                    effect: thumb_settings['slide_mode'],
                    direction: thumb_settings['slide_direction'],
                    spaceBetween: 0,
                    slidesPerView: thumb_settings['slides_to_show'],
                    centeredSlides: false,
                    loop: thumb_settings['loop'],  
                    watchSlidesProgress: true,
                    slideToClickedSlide: true,
                };

                if(thumb_settings['creative-effect'] === 'effect2'){
                    thumb_carousel_settings['creativeEffect'] = {
                        prev: {
                            opacity: 0,
                            translate: [0, "0%", 0],
                        },
                        next: {
                            opacity: 0,
                            translate: [0, "100%", 0],
                        },
                    };
                }   

                var slide_thumbs = new Swiper($this.find('.pxl-swiper-thumbs')[0], thumb_carousel_settings);
                carousel_settings['thumbs'] = { swiper: slide_thumbs };
            }
            // End Swiper Thumbnail

            var swiper = new Swiper($this.find(".pxl-swiper-container")[0], carousel_settings);

            if(settings['autoplay'] === 'true' && settings['pause_on_hover'] === 'true'){
                $( $this.find('.pxl-swiper-container') ).on({
                    mouseenter: function mouseenter() {
                        this.swiper.autoplay.stop();
                    },
                    mouseleave: function mouseleave() {
                        this.swiper.autoplay.start();
                    }
                });
            }

            // Scroll Section Slip
            $(window).scroll(function() {
                pxl_window_height = $(window).innerHeight();

                let slides = swiper.slides;
                let hPerc = Math.round(100 / slides.length);
               
                if($('.pxl-testimonial-slip-wrapper').length > 0) {
                    let offset = $('.pxl-testimonial-slip-wrapper')[0].getBoundingClientRect();
                    if (offset.top < 0 && offset.bottom - pxl_window_height > 0) {
                        let perc = Math.round(100 * Math.abs(offset.top) / (offset.height - $(window).height()));
                        if (hPerc > 19) {
                            for (var i = 0; i < slides.length; i++) {
                                if (perc > (hPerc * i) && perc < (hPerc * (i + 1))) {
                                    swiper.slideTo(i, 300);
                                }
                            }
                        }
                    }
                }
            });

            // Navigation-Carousel
            $('.pxl-navigation-carousel').parents('.elementor-section').addClass('pxl--hide-arrow');
            setTimeout(function() {
                $('.pxl-navigation-carousel .pxl-navigation-arrow-prev').on('click', function () {
                    $(this).parents('.elementor-section').find('.pxl-swiper-arrow.pxl-swiper-arrow-prev').trigger('click');
                });
                $('.pxl-navigation-carousel .pxl-navigation-arrow-next').on('click', function () {
                    $(this).parents('.elementor-section').find('.pxl-swiper-arrow.pxl-swiper-arrow-next').trigger('click');
                });
            }, 300);

        });  

    };
} )( jQuery );