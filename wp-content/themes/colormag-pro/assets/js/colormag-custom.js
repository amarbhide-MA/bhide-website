/**
 * ColorMag theme custom JS file.
 *
 * @package ColorMag
 */

// Main initialization function
function colormagInit() {
	/**
	 * Search.
	 */
	var hideSearchForm = function () {
		jQuery('#cm-masthead .search-form-top').removeClass('show');
		jQuery('#cm-content').removeClass('backdrop');
	};

	// For Search Icon Toggle effect added at the top.
	// Use event delegation to handle dynamically moved elements
	jQuery(document)
		.off('click.colormag', '.search-top')
		.on('click.colormag', '.search-top', function () {
			jQuery(this).next('#cm-masthead .search-form-top').toggleClass('show');

			jQuery('#cm-content').toggleClass('backdrop');
			// Focus after some time to fix conflict with toggleClass.
			setTimeout(function () {
				jQuery('#cm-masthead .search-form-top input').focus();
			}, 200);

			// Function to adjust search form position to prevent horizontal overflow
			function adjustSearchFormPosition() {
				var $form = jQuery(
					'.cm-desktop-row .search-form-top.show, .cm-mobile-row .search-form-top.show',
				);
				if (!$form.length) return;

				// Reset to default before checking
				$form.css({ right: '', left: '' });

				var rect = $form[0].getBoundingClientRect();
				var viewportWidth = window.innerWidth;

				if (rect.right > viewportWidth) {
					// Overflowing right, align to right edge
					$form.css({ right: 0, left: 'auto' });
					$form.css({ '--arrow-right': 10 + 'px' });
				} else if (rect.left < 0) {
					// Overflowing left, align to left edge
					$form.css({ left: 0, right: 'auto' });
					$form.css({ '--arrow-left': 10 + 'px' });
				}
			}

			adjustSearchFormPosition();

			// For esc key press.
			jQuery(document)
				.off('keyup.colormag')
				.on('keyup.colormag', function (e) {
					// On esc key press.
					if (27 === e.keyCode) {
						// If search box is opened.
						if (jQuery('#cm-masthead .search-form-top').hasClass('show')) {
							hideSearchForm();
						}
					}
				});

			jQuery(document)
				.off('click.outEvent.colormag')
				.on('click.outEvent.colormag', function (e) {
					if (e.target.closest('.cm-top-search')) {
						return;
					}

					hideSearchForm();

					// Unbind current click event.
					jQuery(document).off('click.outEvent.colormag');
				});
		});

	/**
	 * Scroll to top JS setting.
	 */
	// Hides the scroll up button initially.
	jQuery('#scroll-up').hide();

	// Scroll up settings.
	jQuery(window)
		.off('scroll.colormag')
		.on('scroll.colormag', function () {
			if (jQuery(this).scrollTop() > 1000) {
				jQuery('#scroll-up').fadeIn();
			} else {
				jQuery('#scroll-up').fadeOut();
			}
		});

	jQuery('a#scroll-up')
		.off('click.colormag')
		.on('click.colormag', function () {
			jQuery('body,html').animate(
				{
					scrollTop: 0,
				},
				800,
			);
			return false;
		});

	/**
	 * Better responsive menu settings.
	 */
	// Adds right icon to submenu.
	jQuery('.cm-menu-primary-container .menu-item-has-children');

	// Adds down icon for menu with sub menu.
	jQuery('.cm-submenu-toggle')
		.off('click.colormag')
		.on('click.colormag', function () {
			jQuery(this)
				.parent('.menu-item-has-children')
				.children('ul.sub-menu')
				.first()
				.slideToggle('1000');
		});

	jQuery(document)
		.off('click.colormag', '#cm-primary-nav ul li.menu-item-has-children > a')
		.on(
			'click.colormag',
			'#cm-primary-nav ul li.menu-item-has-children > a',
			function (event) {
				var menuClass = jQuery(this).parent('.menu-item-has-children');

				if (!menuClass.hasClass('focus') && jQuery(window).width() <= 768) {
					menuClass.addClass('focus');
					event.preventDefault();
					menuClass.children('.sub-menu').css({
						display: 'block',
					});
				}
			},
		);

	/**
	 * Scrollbar on fixed responsive menu and sticky footer.
	 */
	let stickyElementWrapper =
		document.getElementsByClassName('cm-header-builder');
	let stickyElement;
	if (stickyElementWrapper.length > 0) {
		stickyElement = '.cm-header-bottom-row';
	} else {
		stickyElement = '.cm-primary-nav';
	}

	// Check if window is already loaded
	if (document.readyState === 'complete') {
		initStickyMenu();
	} else {
		jQuery(window).off('load.colormag').on('load.colormag', initStickyMenu);
	}

	function initStickyMenu() {
		// Handle responsive menu scrollbar (existing code)
		if (
			window.matchMedia('(max-width: 768px)').matches &&
			jQuery(
				'#cm-masthead .sticky-wrapper, .cm-header-bottom-row .sticky-wrapper, #cm-masthead .headroom',
			).length >= 1
		) {
			var screenHeight = jQuery(window).height();
			var availableMenuHeight = screenHeight - 88;
			var menu = jQuery('#cm-primary-nav').find('ul').first();

			menu.css('max-height', availableMenuHeight);
			menu.addClass('menu-scrollbar');
		}
	}

	// Sticky footer implementation (separate from header)
	jQuery(document).ready(function () {
		const footerBuilder = jQuery('.cm-footer-builder.cm-sticky-footer');

		if (footerBuilder.length) {
			// Store footer height for spacing
			const footerHeight = footerBuilder.outerHeight();

			// Apply sticky styles to footer
			footerBuilder.css({
				position: 'sticky',
				bottom: '0',
				width: '100%',
				'z-index': '99',
			});

			// Add padding to prevent content from being hidden behind sticky footer
			jQuery('body').css('padding-bottom', footerHeight + 'px');

			// Optional: Add transition for smooth appearance/disappearance
			footerBuilder.css('transition', 'transform 0.3s ease-in-out');

			// Hide footer when scrolling up, show when scrolling down
			let lastScrollTop = 0;
			jQuery(window)
				.off('scroll.colormag')
				.on('scroll.colormag', function () {
					const scrollTop = jQuery(this).scrollTop();

					if (scrollTop > lastScrollTop) {
						// Scrolling down - show footer
						footerBuilder.css('transform', 'translateY(0)');
					} else {
						// Scrolling up - hide footer
						footerBuilder.css('transform', 'translateY(100%)');
					}

					lastScrollTop = scrollTop;
				});
		}
	});

	// Magnific Popup Setting.
	if (typeof jQuery.fn.magnificPopup !== 'undefined') {
		// Featured Image Popup Setting.
		jQuery('.image-popup').magnificPopup({ type: 'image' });
		jQuery('.image-popup-blog').magnificPopup({ type: 'image' });

		// Magnific Popup for gallery.
		jQuery('.gallery')
			.find(
				'a[href*=".jpg"], a[href*=".jpeg"], a[href*=".png"], a[href*=".gif"], a[href*=".ico"]',
			)
			.magnificPopup({
				type: 'image',
				gallery: { enabled: true },
			});

		// Ticker news popup.
		jQuery('.colormag-ticker-news-popup-link').magnificPopup({
			type: 'ajax',
			callbacks: {
				parseAjax: function (mfpResponse) {
					var setting = jQuery.magnificPopup.instance,
						content = jQuery(setting.currItem.el[0]),
						fragment = content.data('fragment');
					mfpResponse.data = jQuery(mfpResponse.data).find(fragment);
				},
			},
		});
	}

	// Fitvids setting.
	if (typeof jQuery.fn.fitVids !== 'undefined') {
		jQuery('.fitvids-video').fitVids();
	}

	if (typeof colormag_new_news_ticker_settings !== 'undefined') {
		let ticker_slide_effect =
			colormag_new_news_ticker_settings.ticker_slide_effect;
		let ticker_news_duration =
			colormag_new_news_ticker_settings.ticker_news_duration;
		let ticker_news_speed = colormag_new_news_ticker_settings.ticker_news_speed;
		jQuery('#cm-breaking-news-ticker').breakingNews({
			effect: ticker_slide_effect,
			scrollSpeed: ticker_news_speed,
			delayTimer: ticker_news_duration,
		});
	}

	// NewsTicker JS Settings.
	if (typeof jQuery.fn.newsTicker !== 'undefined') {
		/* global colormag_ticker_settings */
		if (typeof colormag_ticker_settings !== 'undefined') {
			// Settings of the ticker.
			var breaking_news_slide_effect =
				colormag_ticker_settings.breaking_news_slide_effect;
			var breaking_news_duration = parseInt(
				colormag_ticker_settings.breaking_news_duration,
				10,
			);
			var breaking_news_speed = parseInt(
				colormag_ticker_settings.breaking_news_speed,
				10,
			);

			jQuery('.newsticker').newsTicker({
				row_height: 20,
				max_rows: 1,
				direction: breaking_news_slide_effect,
				speed: breaking_news_speed,
				duration: breaking_news_duration,
				autostart: 1,
				pauseOnHover: 1,
				start: function () {
					jQuery('.newsticker').css('visibility', 'visible');
				},
			});
		}

		// Breaking news widget.
		var breaking_news_widget_init = function (
			breaking_news_slider,
			breaking_news_slider_up,
			breaking_news_slider_down,
			breaking_news_slider_direction,
			breaking_news_slider_duration,
			breaking_news_slider_row_height,
			breaking_news_slider_max_row,
		) {
			jQuery(breaking_news_slider).newsTicker({
				row_height: breaking_news_slider_row_height,
				max_rows: breaking_news_slider_max_row,
				duration: breaking_news_slider_duration,
				direction: breaking_news_slider_direction,
				prevButton: jQuery(breaking_news_slider_up),
				nextButton: jQuery(breaking_news_slider_down),
				start: function () {
					jQuery('.cm-breaking-news-slider-widget').css({
						visibility: 'visible',
					});
				},
			});
		};

		var breaking_news_widget_wrapper = jQuery('.cm-breaking-news');
		jQuery(breaking_news_widget_wrapper).each(function () {
			var breaking_news_slider = jQuery(this).children(
				'.cm-breaking-news-slider-widget',
			);
			var breaking_news_slider_up = jQuery(this).children('.cm-slide-up');
			var breaking_news_slider_down = jQuery(this).children('.cm-slide-down');
			var breaking_news_slider_direction = jQuery(this)
				.children('.cm-breaking-news-slider-widget')
				.data('direction');
			var breaking_news_slider_duration = jQuery(this)
				.children('.cm-breaking-news-slider-widget')
				.data('duration');
			var breaking_news_slider_row_height = jQuery(this)
				.children('.cm-breaking-news-slider-widget')
				.data('rowheight');
			var breaking_news_slider_max_row = jQuery(this)
				.children('.cm-breaking-news-slider-widget')
				.data('maxrows');

			breaking_news_widget_init(
				breaking_news_slider,
				breaking_news_slider_up,
				breaking_news_slider_down,
				breaking_news_slider_direction,
				breaking_news_slider_duration,
				breaking_news_slider_row_height,
				breaking_news_slider_max_row,
			);
		});
	}

	// Settings of the sticky menu.
	if (typeof jQuery.fn.sticky !== 'undefined') {
		var wpAdminBar = jQuery('#wpadminbar');

		if (wpAdminBar.length) {
			jQuery(stickyElement).sticky({
				topSpacing: wpAdminBar.height(),
				zIndex: 999,
			});
		} else {
			jQuery(stickyElement).sticky({
				topSpacing: 0,
				zIndex: 999,
			});
		}
	}

	// Adds placeholder in search input.
	jQuery('.wp-block-search__input').attr('placeholder', 'Search posts');

	// Menu reveal on scroll.
	if (typeof jQuery.fn.headroom !== 'undefined') {
		var offset_value = jQuery(stickyElement).offset().top;
		var wpAdminBar = jQuery('#wpadminbar');
		var menuwidth = jQuery(stickyElement).width();

		if (wpAdminBar.length) {
			offset_value = wpAdminBar.height() + jQuery(stickyElement).offset().top;
		}

		jQuery(stickyElement).headroom({
			offset: offset_value,
			tolerance: 0,
			onPin: function () {
				if (wpAdminBar.length) {
					jQuery(stickyElement).css({
						top: wpAdminBar.height(),
						position: 'fixed',
						width: menuwidth,
						'z-index': 999,
					});
				} else {
					jQuery(stickyElement).css({
						top: 0,
						position: 'fixed',
						'z-index': 999,
						width: menuwidth,
					});
				}
			},
			onTop: function () {
				jQuery(stickyElement).css({
					top: 0,
					position: 'relative',
				});
			},
		});
	}

	// BxSlider JS Settings.
	if (typeof jQuery.fn.bxSlider !== 'undefined') {
		// Category slider widget slider setting.
		var category_init = function (
			category_slider,
			category_mode,
			category_speed,
			category_pause,
			category_auto,
			category_hover,
		) {
			jQuery(category_slider).bxSlider({
				mode: category_mode,
				speed: category_speed,
				auto: category_auto,
				pause: category_pause,
				autoHover: category_hover,
				adaptiveHeight: true,
				nextText:
					'<div class="cm-category-slide-next"><svg class="cm-icon coloramg-icon--arrow-left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 11h15.59l-7.3-7.29a1 1 0 0 1 1.42-1.42l9 9a.93.93 0 0 1 .21.33A1 1 0 0 1 22 12a1 1 0 0 1-.08.39 1 1 0 0 1-.21.31l-9 9a1 1 0 0 1-1.42 0 1 1 0 0 1 0-1.42l7.3-7.28H3a1 1 0 0 1 0-2Z"></path></svg></div>',
				prevText:
					'<div class="cm-category-slide-prev"><svg class="cm-icon coloramg-icon--arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21 11H5.41l7.3-7.29a1 1 0 1 0-1.42-1.42l-9 9a.93.93 0 0 0-.21.33A1 1 0 0 0 2 12a1 1 0 0 0 .08.39 1 1 0 0 0 .21.31l9 9a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42L5.41 13H21a1 1 0 0 0 0-2Z"></path></svg></div>',
				pager: false,
				tickerHover: true,
				onSliderLoad: function () {
					jQuery('.cm-slider-area-rotate').css('visibility', 'visible');
					jQuery('.cm-slider-area-rotate').css('height', 'auto');
				},
			});
		};

		var category_slider_wrapper = jQuery('.cm-featured-category-slider ');
		jQuery(category_slider_wrapper).each(function () {
			var category_slider = jQuery(this).children('.cm-slider-area-rotate');
			var category_mode = jQuery(this)
				.children('.cm-slider-area-rotate')
				.data('mode');
			var category_speed = jQuery(this)
				.children('.cm-slider-area-rotate')
				.data('speed');
			var category_pause = jQuery(this)
				.children('.cm-slider-area-rotate')
				.data('pause');
			var category_auto = jQuery(this)
				.children('.cm-slider-area-rotate')
				.data('auto');
			var category_hover = jQuery(this)
				.children('.cm-slider-area-rotate')
				.data('hover');

			category_init(
				category_slider,
				category_mode,
				category_speed,
				category_pause,
				category_auto,
				category_hover,
			);
		});

		// Style 5 widget JS Setting.
		var style5_slider_init = function (
			style5_slider,
			style5_speed,
			style5_pause,
			style5_auto,
			style5_hover,
		) {
			jQuery(style5_slider).bxSlider({
				minSlides: 1,
				maxSlides: 2,
				slideWidth: 390,
				slideMargin: 20,
				speed: style5_speed,
				pause: style5_pause,
				auto: style5_auto,
				autoHover: style5_hover,
				adaptiveHeight: true,
				nextText:
					'<div class="slide-next"><i class="fa fa-angle-right"></i></div>',
				prevText:
					'<div class="slide-prev"><i class="fa fa-angle-left"></i></div>',
				pager: false,
				captions: false,
				onSliderLoad: function () {
					jQuery('.cm-featured-posts--style-5 .cm-highlighted-post').css(
						'visibility',
						'visible',
					);
					jQuery('.cm-featured-posts--style-5 .cm-highlighted-post').css(
						'height',
						'auto',
					);
				},
			});
		};

		var style5_slider_wrapper = jQuery('.cm-posts');
		jQuery(style5_slider_wrapper).each(function () {
			var style5_slider = jQuery(this).children(
				'.cm-featured-posts--style-5 .cm-highlighted-post',
			);
			var style5_speed = jQuery(this)
				.children('.cm-featured-posts--style-5 .cm-highlighted-post')
				.data('speed');
			var style5_pause = jQuery(this)
				.children('.cm-featured-posts--style-5 .cm-highlighted-post')
				.data('pause');
			var style5_auto = jQuery(this)
				.children('.cm-featured-posts--style-5 .cm-highlighted-post')
				.data('auto');
			var style5_hover = jQuery(this)
				.children('.cm-featured-posts--style-5 .cm-highlighted-post')
				.data('hover');

			style5_slider_init(
				style5_slider,
				style5_speed,
				style5_pause,
				style5_auto,
				style5_hover,
			);
		});

		// Style 6 widget JS Setting.
		var style6_slider_init = function (
			style6_slider_class,
			style6_pager_class,
			style6_mode,
			style6_speed,
			style6_pause,
			style6_auto,
			style6_hover,
		) {
			jQuery(style6_slider_class).bxSlider({
				mode: style6_mode,
				speed: style6_speed,
				pause: style6_pause,
				auto: style6_auto,
				pagerCustom: style6_pager_class,
				autoHover: style6_hover,
				controls: false,
				nextText: '',
				prevText: '',
				nextSelector: '',
				prevSelector: '',
				captions: false,
				onSliderLoad: function () {
					jQuery('.thumbnail-big-sliders').css('visibility', 'visible');
					jQuery('.thumbnail-big-sliders').css('height', 'auto');
				},
			});
		};

		var style6_slider_wrapper = jQuery('.cm-thumbnail-slider-news');
		jQuery(style6_slider_wrapper).each(function () {
			var style6_slider_class = jQuery(this).children('.thumbnail-big-sliders');
			var style6_pager_class = jQuery(this).children('.cm-thumbnail-slider');
			var style6_mode = jQuery(this)
				.children('.thumbnail-big-sliders')
				.data('mode');
			var style6_speed = jQuery(this)
				.children('.thumbnail-big-sliders')
				.data('speed');
			var style6_pause = jQuery(this)
				.children('.thumbnail-big-sliders')
				.data('pause');
			var style6_auto = jQuery(this)
				.children('.thumbnail-big-sliders')
				.data('auto');
			var style6_hover = jQuery(this)
				.children('.thumbnail-big-sliders')
				.data('hover');

			style6_slider_init(
				style6_slider_class,
				style6_pager_class,
				style6_mode,
				style6_speed,
				style6_pause,
				style6_auto,
				style6_hover,
			);
		});

		// Style 7 widget JS Setting.
		var style7_slider_init = function (style7_slider, style7_speed) {
			jQuery(style7_slider).bxSlider({
				minSlides: 5,
				maxSlides: 8,
				slideWidth: 150,
				slideMargin: 12,
				ticker: true,
				speed: style7_speed,
				tickerHover: true,
				useCSS: false,
				onSliderLoad: function () {
					jQuery('.cm-image-ticker-news').css('visibility', 'visible');
					jQuery('.cm-image-ticker-news').css('height', 'auto');
				},
			});
		};

		var style7_slider_wrapper = jQuery('.cm-featured-posts--style-7');
		jQuery(style7_slider_wrapper).each(function () {
			var style7_slider = jQuery(this).children('.cm-image-ticker-news');
			var style7_speed = jQuery(this)
				.children('.cm-image-ticker-news')
				.data('speed');

			style7_slider_init(style7_slider, style7_speed);
		});

		// Post format gallery slider setting.
		jQuery(
			'.blog .gallery-images, .archive .gallery-images, .search .gallery-images, .single-post .gallery-images',
		).bxSlider({
			mode: 'fade',
			speed: 1500,
			auto: true,
			pause: 3000,
			adaptiveHeight: true,
			nextText: '',
			prevText: '',
			nextSelector: '.slide-next',
			prevSelector: '.slide-prev',
			pager: false,
		});

		// Related post carousel.
		jQuery(window)
			.off('load.colormag colormagAjaxSinglePostLoaded.colormag')
			.on('load.colormag colormagAjaxSinglePostLoaded.colormag', function () {
				jQuery('.related-post-carousel').bxSlider({
					minSlides: 1,
					maxSlides: 2,
					auto: true,
					slideWidth: 390,
					slideMargin: 20,
					moveSlides: 1,
					shrinkItems: true,
					speed: 3000,
					autoHover: true,
					nextText:
						'<div class="slide-next"><svg class="cm-icon coloramg-icon--arrow-left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 11h15.59l-7.3-7.29a1 1 0 0 1 1.42-1.42l9 9a.93.93 0 0 1 .21.33A1 1 0 0 1 22 12a1 1 0 0 1-.08.39 1 1 0 0 1-.21.31l-9 9a1 1 0 0 1-1.42 0 1 1 0 0 1 0-1.42l7.3-7.28H3a1 1 0 0 1 0-2Z"></path></svg></i></div>',
					prevText:
						'<div class="slide-prev"><svg class="cm-icon coloramg-icon--arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21 11H5.41l7.3-7.29a1 1 0 1 0-1.42-1.42l-9 9a.93.93 0 0 0-.21.33A1 1 0 0 0 2 12a1 1 0 0 0 .08.39 1 1 0 0 0 .21.31l9 9a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42L5.41 13H21a1 1 0 0 0 0-2Z"></path></svg></div>',
					pager: false,
					captions: false,
					onSliderLoad: function () {
						jQuery('.related-post-carousel').css('visibility', 'visible');
						jQuery('.related-post-carousel').css('height', 'auto');
					},
				});
			});
	}

	// Tabbed widget.
	if (typeof jQuery.fn.easytabs !== 'undefined') {
		jQuery('.cm-tabbed-widget').easytabs();
	}

	// Sticky sidebar JS setting.
	if (
		typeof jQuery.fn.theiaStickySidebar !== 'undefined' &&
		typeof ResizeSensor !== 'undefined'
	) {
		// Calculate the whole height of sticky menu.
		var height = jQuery('#sticky-wrapper').outerHeight();

		// Assign height value to 0 if it returns null.
		if (height === null) {
			height = 0;
		}

		// Apply sticky sidebar/content area JS setting.
		jQuery('#cm-primary, #cm-secondary, #cm-tertiary').theiaStickySidebar({
			additionalMarginTop: 40 + height,
		});
	}

	/**
	 * Featured video playlist widget setting.
	 */
	jQuery('.video-player').each(function (index) {
		var playercontainer = jQuery(this);
		var itemid = 'video-playlist-item-' + index;
		var playerframe = jQuery(this).find('.player-frame');

		playercontainer.attr('id', itemid);

		playerframe.video();

		update_video_status(playercontainer);

		playerframe.addVideoEvent('ready', function () {
			playerframe.css('visibility', 'visible').fadeIn();
		});

		playercontainer
			.off('click.colormag', '.video-playlist-item')
			.on('click.colormag', '.video-playlist-item', function () {
				var item = jQuery(this);
				var iframe_id = item.data('id');
				var current_video_id = jQuery('#' + iframe_id);
				var src = item.data('src');

				// Pause all videos if a item is clicked.
				playercontainer.find('.player-frame').each(function () {
					jQuery(this).pauseVideo().hide();
				});

				if (!current_video_id.length) {
					playercontainer
						.find('.video-frame')
						.append(
							'<iframe id="' +
								iframe_id +
								'" class="player-frame" src="' +
								src +
								'" frameborder="0" width="100%" height="434" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>',
						);
					current_video_id = jQuery('#' + iframe_id);
					current_video_id.video();

					current_video_id.addVideoEvent(
						'ready',
						function (e, $current_video_id, video_type) {
							current_video_id.playVideo();
						},
					);
				} else {
					current_video_id.playVideo();
				}

				current_video_id.css('visibility', 'visible').fadeIn();

				update_video_status(playercontainer);
			});
	});

	// Update Video status.
	function update_video_status(playercontainer) {
		playercontainer.find('.player-frame').each(function () {
			var frame = jQuery(this),
				videoitem = jQuery('[data-id="' + frame.attr('id') + '"]');

			frame.addVideoEvent('play', function (e, $video, video_type) {
				videoitem.removeClass('is-paused').addClass('is-playing');
			});

			frame.addVideoEvent('pause', function (e, $video, video_type) {
				videoitem.removeClass('is-playing').addClass('is-paused');
			});

			frame.addVideoEvent('finish', function (e, $video, video_type) {
				videoitem.removeClass('is-paused is-playing');
			});
		});
	}

	// Scroll Reading Progress JS Setting.
	if (typeof jQuery.fn.prognroll !== 'undefined') {
		jQuery('body').prognroll({
			height: 5,
			color: colormag_progress_bar_indicator_color.bg_color,
			custom: false,
		});
	}

	// Google Maps Settings.
	if (
		typeof google !== 'undefined' &&
		typeof colormag_google_maps_widget_settings !== 'undefined'
	) {
		// Create function to initialize Google Maps.
		function initMap() {
			// Float the value coming from wp_localize_script to be used for JS.
			var longitude = parseFloat(
				colormag_google_maps_widget_settings.longitude,
			);
			var latitude = parseFloat(colormag_google_maps_widget_settings.latitude);
			var zoom_size = parseInt(colormag_google_maps_widget_settings.zoom_size);

			// Add latitude and longitude to variable.
			var latitudelongitude = {
				lat: latitude,
				lng: longitude,
			};

			var map = new google.maps.Map(document.getElementById('GoogleMaps'), {
				zoom: zoom_size,
				center: latitudelongitude,
			});

			var marker = new google.maps.Marker({
				position: latitudelongitude,
				map: map,
			});
		}

		// Call the function to display the Google Maps.
		initMap();

		// Add the dynamic width and height set in widget options.
		jQuery('#GoogleMaps').css({
			height: colormag_google_maps_widget_settings.height,
		});
	}

	/**
	 * Social share button.
	 */
	(function () {
		var facebookShare = jQuery('.share-buttons #facebook')[0],
			twitterShare = jQuery('.share-buttons #twitter')[0],
			pinterestshare = jQuery('.share-buttons #pinterest')[0],
			emailshare = jQuery('.share-buttons #email')[0],
			facebookWindow,
			twitterWindow,
			pinterestWindow,
			emailWindow;

		if (facebookShare) {
			jQuery(facebookShare)
				.off('click.colormag')
				.on('click.colormag', function (e) {
					e.preventDefault();
					facebookWindow = window.open(
						'https://www.facebook.com/sharer/sharer.php?u=' +
							document.URL +
							'&p[title]=' +
							document.title,
						'facebook-popup',
						'height=350,width=600',
					);

					if (facebookWindow.focus) {
						facebookWindow.focus();
					}

					return false;
				});
		}

		if (twitterShare) {
			jQuery(twitterShare)
				.off('click.colormag')
				.on('click.colormag', function (e) {
					e.preventDefault();
					twitterWindow = window.open(
						'https://twitter.com/share?text=' +
							document.title +
							'&url=' +
							document.URL,
						'twitter-popup',
						'height=350,width=600',
					);

					if (twitterWindow.focus) {
						twitterWindow.focus();
					}

					return false;
				});
		}

		if (pinterestshare) {
			jQuery(pinterestshare)
				.off('click.colormag')
				.on('click.colormag', function (e) {
					e.preventDefault();
					var featuredImage = jQuery('.cm-posts .cm-featured-image img').attr(
						'src',
					)
						? jQuery('.cm-posts .cm-featured-image img').attr('src')
						: '';

					pinterestWindow = window.open(
						'https://pinterest.com/pin/create/button/?url=' +
							document.URL +
							'&media=' +
							featuredImage +
							'&description=' +
							document.title,
						'pinterest-popup',
						'height=350,width=600',
					);

					if (pinterestWindow.focus) {
						pinterestWindow.focus();
					}

					return false;
				});
		}

		if (emailshare) {
			jQuery(emailshare)
				.off('click.colormag')
				.on('click.colormag', function (e) {
					e.preventDefault();

					var shareUrl = document.URL;
					var shareTitle = document.title;

					var emailBaseUrl =
						'mailto:?subject=' +
						encodeURIComponent(shareTitle) +
						'&body=' +
						encodeURIComponent(shareUrl);

					emailWindow = window.open(
						emailBaseUrl,
						'email-popup',
						'height=350,width=600',
					);

					if (emailWindow.focus) {
						emailWindow.focus();
					}

					return false;
				});
		}
	})();
}

// Initialize on document ready (Elementor Pro compatible)
jQuery(document).ready(function () {
	// Check if Elementor is active before initializing
	var isElementorActive =
		typeof elementorFrontend !== 'undefined' ||
		typeof elementor !== 'undefined' ||
		document.body.classList.contains('elementor-editor-active') ||
		document.body.classList.contains('elementor-page');

	// Only initialize if Elementor is not active
	if (!isElementorActive) {
		colormagInit();
	} else {
		// For Elementor pages, initialize only essential functions
		initEssentialFunctions();
	}
});

// Essential functions for Elementor compatibility
function initEssentialFunctions() {
	// Initialize only scroll to top functionality
	jQuery('#scroll-up').hide();
	jQuery(window).on('scroll.colormag', function () {
		if (jQuery(this).scrollTop() > 1000) {
			jQuery('#scroll-up').fadeIn();
		} else {
			jQuery('#scroll-up').fadeOut();
		}
	});

	jQuery('a#scroll-up').on('click.colormag', function () {
		jQuery('body,html').animate({ scrollTop: 0 }, 800);
		return false;
	});

	// Initialize dark mode if available
	const colorSwitch = document.getElementById('cm-color-switch-checkbox');
	if (colorSwitch) {
		colorSwitch.addEventListener('change', handleColorSwitchChange);
	}

	jQuery('.cm-submenu-toggle').on('click.colormag', function () {
		jQuery(this)
			.parent('.menu-item-has-children')
			.children('ul.sub-menu')
			.first()
			.slideToggle('1000');
	});

	jQuery(document).on(
		'click.colormag',
		'#cm-primary-nav ul li.menu-item-has-children > a',
		function (event) {
			var menuClass = jQuery(this).parent('.menu-item-has-children');

			if (!menuClass.hasClass('focus') && jQuery(window).width() <= 768) {
				menuClass.addClass('focus');
				event.preventDefault();
				menuClass.children('.sub-menu').css({
					display: 'block',
				});
			}
		},
	);

	// BxSlider JS Settings.
	if (typeof jQuery.fn.bxSlider !== 'undefined') {
		// Category slider widget slider setting.
		var category_init = function (
			category_slider,
			category_mode,
			category_speed,
			category_pause,
			category_auto,
			category_hover,
		) {
			jQuery(category_slider).bxSlider({
				mode: category_mode,
				speed: category_speed,
				auto: category_auto,
				pause: category_pause,
				autoHover: category_hover,
				adaptiveHeight: true,
				nextText:
					'<div class="cm-category-slide-next"><svg class="cm-icon coloramg-icon--arrow-left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 11h15.59l-7.3-7.29a1 1 0 0 1 1.42-1.42l9 9a.93.93 0 0 1 .21.33A1 1 0 0 1 22 12a1 1 0 0 1-.08.39 1 1 0 0 1-.21.31l-9 9a1 1 0 0 1-1.42 0 1 1 0 0 1 0-1.42l7.3-7.28H3a1 1 0 0 1 0-2Z"></path></svg></div>',
				prevText:
					'<div class="cm-category-slide-prev"><svg class="cm-icon coloramg-icon--arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21 11H5.41l7.3-7.29a1 1 0 1 0-1.42-1.42l-9 9a.93.93 0 0 0-.21.33A1 1 0 0 0 2 12a1 1 0 0 0 .08.39 1 1 0 0 0 .21.31l9 9a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42L5.41 13H21a1 1 0 0 0 0-2Z"></path></svg></div>',
				pager: false,
				tickerHover: true,
				onSliderLoad: function () {
					jQuery('.cm-slider-area-rotate').css('visibility', 'visible');
					jQuery('.cm-slider-area-rotate').css('height', 'auto');
				},
			});
		};

		var category_slider_wrapper = jQuery('.cm-featured-category-slider ');
		jQuery(category_slider_wrapper).each(function () {
			var category_slider = jQuery(this).children('.cm-slider-area-rotate');
			var category_mode = jQuery(this)
				.children('.cm-slider-area-rotate')
				.data('mode');
			var category_speed = jQuery(this)
				.children('.cm-slider-area-rotate')
				.data('speed');
			var category_pause = jQuery(this)
				.children('.cm-slider-area-rotate')
				.data('pause');
			var category_auto = jQuery(this)
				.children('.cm-slider-area-rotate')
				.data('auto');
			var category_hover = jQuery(this)
				.children('.cm-slider-area-rotate')
				.data('hover');

			category_init(
				category_slider,
				category_mode,
				category_speed,
				category_pause,
				category_auto,
				category_hover,
			);
		});

		// Style 5 widget JS Setting.
		var style5_slider_init = function (
			style5_slider,
			style5_speed,
			style5_pause,
			style5_auto,
			style5_hover,
		) {
			jQuery(style5_slider).bxSlider({
				minSlides: 1,
				maxSlides: 2,
				slideWidth: 390,
				slideMargin: 20,
				speed: style5_speed,
				pause: style5_pause,
				auto: style5_auto,
				autoHover: style5_hover,
				adaptiveHeight: true,
				nextText:
					'<div class="slide-next"><i class="fa fa-angle-right"></i></div>',
				prevText:
					'<div class="slide-prev"><i class="fa fa-angle-left"></i></div>',
				pager: false,
				captions: false,
				onSliderLoad: function () {
					jQuery('.cm-featured-posts--style-5 .cm-highlighted-post').css(
						'visibility',
						'visible',
					);
					jQuery('.cm-featured-posts--style-5 .cm-highlighted-post').css(
						'height',
						'auto',
					);
				},
			});
		};

		var style5_slider_wrapper = jQuery('.cm-posts');
		jQuery(style5_slider_wrapper).each(function () {
			var style5_slider = jQuery(this).children(
				'.cm-featured-posts--style-5 .cm-highlighted-post',
			);
			var style5_speed = jQuery(this)
				.children('.cm-featured-posts--style-5 .cm-highlighted-post')
				.data('speed');
			var style5_pause = jQuery(this)
				.children('.cm-featured-posts--style-5 .cm-highlighted-post')
				.data('pause');
			var style5_auto = jQuery(this)
				.children('.cm-featured-posts--style-5 .cm-highlighted-post')
				.data('auto');
			var style5_hover = jQuery(this)
				.children('.cm-featured-posts--style-5 .cm-highlighted-post')
				.data('hover');

			style5_slider_init(
				style5_slider,
				style5_speed,
				style5_pause,
				style5_auto,
				style5_hover,
			);
		});

		// Style 6 widget JS Setting.
		var style6_slider_init = function (
			style6_slider_class,
			style6_pager_class,
			style6_mode,
			style6_speed,
			style6_pause,
			style6_auto,
			style6_hover,
		) {
			jQuery(style6_slider_class).bxSlider({
				mode: style6_mode,
				speed: style6_speed,
				pause: style6_pause,
				auto: style6_auto,
				pagerCustom: style6_pager_class,
				autoHover: style6_hover,
				controls: false,
				nextText: '',
				prevText: '',
				nextSelector: '',
				prevSelector: '',
				captions: false,
				onSliderLoad: function () {
					jQuery('.thumbnail-big-sliders').css('visibility', 'visible');
					jQuery('.thumbnail-big-sliders').css('height', 'auto');
				},
			});
		};

		var style6_slider_wrapper = jQuery('.cm-thumbnail-slider-news');
		jQuery(style6_slider_wrapper).each(function () {
			var style6_slider_class = jQuery(this).children('.thumbnail-big-sliders');
			var style6_pager_class = jQuery(this).children('.cm-thumbnail-slider');
			var style6_mode = jQuery(this)
				.children('.thumbnail-big-sliders')
				.data('mode');
			var style6_speed = jQuery(this)
				.children('.thumbnail-big-sliders')
				.data('speed');
			var style6_pause = jQuery(this)
				.children('.thumbnail-big-sliders')
				.data('pause');
			var style6_auto = jQuery(this)
				.children('.thumbnail-big-sliders')
				.data('auto');
			var style6_hover = jQuery(this)
				.children('.thumbnail-big-sliders')
				.data('hover');

			style6_slider_init(
				style6_slider_class,
				style6_pager_class,
				style6_mode,
				style6_speed,
				style6_pause,
				style6_auto,
				style6_hover,
			);
		});

		// Style 7 widget JS Setting.
		var style7_slider_init = function (style7_slider, style7_speed) {
			jQuery(style7_slider).bxSlider({
				minSlides: 5,
				maxSlides: 8,
				slideWidth: 150,
				slideMargin: 12,
				ticker: true,
				speed: style7_speed,
				tickerHover: true,
				useCSS: false,
				onSliderLoad: function () {
					jQuery('.cm-image-ticker-news').css('visibility', 'visible');
					jQuery('.cm-image-ticker-news').css('height', 'auto');
				},
			});
		};

		var style7_slider_wrapper = jQuery('.cm-featured-posts--style-7');
		jQuery(style7_slider_wrapper).each(function () {
			var style7_slider = jQuery(this).children('.cm-image-ticker-news');
			var style7_speed = jQuery(this)
				.children('.cm-image-ticker-news')
				.data('speed');

			style7_slider_init(style7_slider, style7_speed);
		});

		// Post format gallery slider setting.
		jQuery(
			'.blog .gallery-images, .archive .gallery-images, .search .gallery-images, .single-post .gallery-images',
		).bxSlider({
			mode: 'fade',
			speed: 1500,
			auto: true,
			pause: 3000,
			adaptiveHeight: true,
			nextText: '',
			prevText: '',
			nextSelector: '.slide-next',
			prevSelector: '.slide-prev',
			pager: false,
		});

		// Related post carousel.
		jQuery(window)
			.off('load.colormag colormagAjaxSinglePostLoaded.colormag')
			.on('load.colormag colormagAjaxSinglePostLoaded.colormag', function () {
				jQuery('.related-post-carousel').bxSlider({
					minSlides: 1,
					maxSlides: 2,
					auto: true,
					slideWidth: 390,
					slideMargin: 20,
					moveSlides: 1,
					shrinkItems: true,
					speed: 3000,
					autoHover: true,
					nextText:
						'<div class="slide-next"><svg class="cm-icon coloramg-icon--arrow-left" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 11h15.59l-7.3-7.29a1 1 0 0 1 1.42-1.42l9 9a.93.93 0 0 1 .21.33A1 1 0 0 1 22 12a1 1 0 0 1-.08.39 1 1 0 0 1-.21.31l-9 9a1 1 0 0 1-1.42 0 1 1 0 0 1 0-1.42l7.3-7.28H3a1 1 0 0 1 0-2Z"></path></svg></i></div>',
					prevText:
						'<div class="slide-prev"><svg class="cm-icon coloramg-icon--arrow-right" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21 11H5.41l7.3-7.29a1 1 0 1 0-1.42-1.42l-9 9a.93.93 0 0 0-.21.33A1 1 0 0 0 2 12a1 1 0 0 0 .08.39 1 1 0 0 0 .21.31l9 9a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42L5.41 13H21a1 1 0 0 0 0-2Z"></path></svg></div>',
					pager: false,
					captions: false,
					onSliderLoad: function () {
						jQuery('.related-post-carousel').css('visibility', 'visible');
						jQuery('.related-post-carousel').css('height', 'auto');
					},
				});
			});
	}

	/**
	 * Search.
	 */
	var hideSearchForm = function () {
		jQuery('#cm-masthead .search-form-top').removeClass('show');
		jQuery('#cm-content').removeClass('backdrop');
	};

	// For Search Icon Toggle effect added at the top.
	// Use event delegation to handle dynamically moved elements
	jQuery(document).on('click.colormag', '.search-top', function () {
		jQuery(this).next('#cm-masthead .search-form-top').toggleClass('show');

		jQuery('#cm-content').toggleClass('backdrop');
		// Focus after some time to fix conflict with toggleClass.
		setTimeout(function () {
			jQuery('#cm-masthead .search-form-top input').focus();
		}, 200);

		// Function to adjust search form position to prevent horizontal overflow
		function adjustSearchFormPosition() {
			var $form = jQuery(
				'.cm-desktop-row .search-form-top.show, .cm-mobile-row .search-form-top.show',
			);
			if (!$form.length) return;

			// Reset to default before checking
			$form.css({ right: '', left: '' });

			var rect = $form[0].getBoundingClientRect();
			var viewportWidth = window.innerWidth;

			if (rect.right > viewportWidth) {
				// Overflowing right, align to right edge
				$form.css({ right: 0, left: 'auto' });
				$form.css({ '--arrow-right': 10 + 'px' });
			} else if (rect.left < 0) {
				// Overflowing left, align to left edge
				$form.css({ left: 0, right: 'auto' });
				$form.css({ '--arrow-left': 10 + 'px' });
			}
		}

		adjustSearchFormPosition();

		// For esc key press.
		jQuery(document)
			.off('keyup.colormag')
			.on('keyup.colormag', function (e) {
				// On esc key press.
				if (27 === e.keyCode) {
					// If search box is opened.
					if (jQuery('#cm-masthead .search-form-top').hasClass('show')) {
						hideSearchForm();
					}
				}
			});

		jQuery(document)
			.off('click.outEvent.colormag')
			.on('click.outEvent.colormag', function (e) {
				if (e.target.closest('.cm-top-search')) {
					return;
				}

				hideSearchForm();

				// Unbind current click event.
				jQuery(document).off('click.outEvent.colormag');
			});
	});

	if (typeof colormag_new_news_ticker_settings !== 'undefined') {
		let ticker_slide_effect =
			colormag_new_news_ticker_settings.ticker_slide_effect;
		let ticker_news_duration =
			colormag_new_news_ticker_settings.ticker_news_duration;
		let ticker_news_speed = colormag_new_news_ticker_settings.ticker_news_speed;
		jQuery('#cm-breaking-news-ticker').breakingNews({
			effect: ticker_slide_effect,
			scrollSpeed: ticker_news_speed,
			delayTimer: ticker_news_duration,
		});
	}

	// NewsTicker JS Settings.
	if (typeof jQuery.fn.newsTicker !== 'undefined') {
		/* global colormag_ticker_settings */
		if (typeof colormag_ticker_settings !== 'undefined') {
			// Settings of the ticker.
			var breaking_news_slide_effect =
				colormag_ticker_settings.breaking_news_slide_effect;
			var breaking_news_duration = parseInt(
				colormag_ticker_settings.breaking_news_duration,
				10,
			);
			var breaking_news_speed = parseInt(
				colormag_ticker_settings.breaking_news_speed,
				10,
			);

			jQuery('.newsticker').newsTicker({
				row_height: 20,
				max_rows: 1,
				direction: breaking_news_slide_effect,
				speed: breaking_news_speed,
				duration: breaking_news_duration,
				autostart: 1,
				pauseOnHover: 1,
				start: function () {
					jQuery('.newsticker').css('visibility', 'visible');
				},
			});
		}

		// Breaking news widget.
		var breaking_news_widget_init = function (
			breaking_news_slider,
			breaking_news_slider_up,
			breaking_news_slider_down,
			breaking_news_slider_direction,
			breaking_news_slider_duration,
			breaking_news_slider_row_height,
			breaking_news_slider_max_row,
		) {
			jQuery(breaking_news_slider).newsTicker({
				row_height: breaking_news_slider_row_height,
				max_rows: breaking_news_slider_max_row,
				duration: breaking_news_slider_duration,
				direction: breaking_news_slider_direction,
				prevButton: jQuery(breaking_news_slider_up),
				nextButton: jQuery(breaking_news_slider_down),
				start: function () {
					jQuery('.cm-breaking-news-slider-widget').css({
						visibility: 'visible',
					});
				},
			});
		};

		var breaking_news_widget_wrapper = jQuery('.cm-breaking-news');
		jQuery(breaking_news_widget_wrapper).each(function () {
			var breaking_news_slider = jQuery(this).children(
				'.cm-breaking-news-slider-widget',
			);
			var breaking_news_slider_up = jQuery(this).children('.cm-slide-up');
			var breaking_news_slider_down = jQuery(this).children('.cm-slide-down');
			var breaking_news_slider_direction = jQuery(this)
				.children('.cm-breaking-news-slider-widget')
				.data('direction');
			var breaking_news_slider_duration = jQuery(this)
				.children('.cm-breaking-news-slider-widget')
				.data('duration');
			var breaking_news_slider_row_height = jQuery(this)
				.children('.cm-breaking-news-slider-widget')
				.data('rowheight');
			var breaking_news_slider_max_row = jQuery(this)
				.children('.cm-breaking-news-slider-widget')
				.data('maxrows');

			breaking_news_widget_init(
				breaking_news_slider,
				breaking_news_slider_up,
				breaking_news_slider_down,
				breaking_news_slider_direction,
				breaking_news_slider_duration,
				breaking_news_slider_row_height,
				breaking_news_slider_max_row,
			);
		});
	}
}

// Enhanced header builder change detection - Elementor Pro compatible
(function () {
	var lastHeaderHTML = '';
	var lastMastheadHTML = '';
	var checkInterval;
	var observer;
	var isElementorActive = false;

	// Check if Elementor is active to avoid conflicts
	function checkElementorStatus() {
		isElementorActive =
			typeof elementorFrontend !== 'undefined' ||
			typeof elementor !== 'undefined' ||
			document.body.classList.contains('elementor-editor-active') ||
			document.body.classList.contains('elementor-page');
	}

	function checkForHeaderChanges() {
		// Skip if Elementor is active to prevent conflicts
		if (isElementorActive) {
			return;
		}

		var headerBuilder = document.querySelector('.cm-header-builder');
		var masthead = document.querySelector('#cm-masthead');
		var colorSwitch = document.querySelector('#cm-color-switch-checkbox');

		if (headerBuilder) {
			var currentHeaderHTML = headerBuilder.innerHTML;
			if (currentHeaderHTML !== lastHeaderHTML) {
				lastHeaderHTML = currentHeaderHTML;
				// Reinitialize all functionality
				if (typeof colormagInit === 'function') {
					colormagInit();
				}
				// Also reinitialize dark mode specifically
				reinitializeDarkMode();
			}
		}

		if (masthead) {
			var currentMastheadHTML = masthead.innerHTML;
			if (currentMastheadHTML !== lastMastheadHTML) {
				lastMastheadHTML = currentMastheadHTML;
				// Reinitialize all functionality
				if (typeof colormagInit === 'function') {
					colormagInit();
				}
				// Also reinitialize dark mode specifically
				reinitializeDarkMode();
			}
		}

		// Check if dark mode component was moved or recreated
		if (colorSwitch) {
			// If the component exists but doesn't have the event listener, reinitialize it
			if (!colorSwitch.hasAttribute('data-dark-mode-initialized')) {
				colorSwitch.setAttribute('data-dark-mode-initialized', 'true');
				reinitializeDarkMode();
			}
		}
	}

	// Check Elementor status on load
	checkElementorStatus();

	// More frequent checking when customizer is active (but not when Elementor is active)
	if (typeof wp !== 'undefined' && wp.customize && !isElementorActive) {
		wp.customize.bind('preview-ready', function () {
			checkElementorStatus();
			if (!isElementorActive) {
				// Check every 500ms instead of 100ms to reduce conflicts
				checkInterval = setInterval(checkForHeaderChanges, 500);
			}
		});

		wp.customize.bind('preview-url', function () {
			if (checkInterval) {
				clearInterval(checkInterval);
			}
			checkElementorStatus();
			if (!isElementorActive) {
				checkInterval = setInterval(checkForHeaderChanges, 500);
			}
		});

		// Listen for any customizer changes with immediate response
		wp.customize.bind('change', function () {
			checkElementorStatus();
			if (!isElementorActive) {
				setTimeout(checkForHeaderChanges, 200);
			}
		});

		// Listen for section changes specifically
		wp.customize.bind('section', function () {
			checkElementorStatus();
			if (!isElementorActive) {
				setTimeout(checkForHeaderChanges, 300);
			}
		});
	}

	// Enhanced MutationObserver with Elementor Pro compatibility
	if (typeof MutationObserver !== 'undefined') {
		observer = new MutationObserver(function (mutations) {
			// Skip if Elementor is active to prevent conflicts
			if (isElementorActive) {
				return;
			}

			var shouldReinit = false;

			mutations.forEach(function (mutation) {
				// Check if the mutation affects header-related elements
				if (mutation.type === 'childList' || mutation.type === 'attributes') {
					var target = mutation.target;

					// Check if target is header-related
					if (
						target &&
						(target.classList.contains('cm-header-builder') ||
							target.classList.contains('cm-desktop-row') ||
							target.classList.contains('cm-mobile-row') ||
							target.classList.contains('cm-top-search') ||
							target.classList.contains('cm-color-switch-checkbox') ||
							target.closest('.cm-header-builder') ||
							target.closest('#cm-masthead') ||
							target.closest('.cm-top-search') ||
							target.closest('[id*="color-switch"]') ||
							target.closest('[class*="color-switch"]'))
					) {
						shouldReinit = true;
					}

					// Check if any added/removed nodes are header-related
					if (mutation.addedNodes) {
						mutation.addedNodes.forEach(function (node) {
							if (
								node.nodeType === 1 &&
								(node.classList.contains('cm-header-builder') ||
									node.classList.contains('cm-desktop-row') ||
									node.classList.contains('cm-mobile-row') ||
									node.classList.contains('cm-top-search') ||
									node.classList.contains('cm-color-switch-checkbox') ||
									node.closest('.cm-header-builder') ||
									node.closest('#cm-masthead') ||
									node.closest('.cm-top-search') ||
									node.closest('[id*="color-switch"]') ||
									node.closest('[class*="color-switch"]'))
							) {
								shouldReinit = true;
							}
						});
					}
				}
			});

			if (shouldReinit) {
				setTimeout(function () {
					if (typeof colormagInit === 'function') {
						colormagInit();
					}
					// Also reinitialize dark mode functionality specifically
					reinitializeDarkMode();
				}, 200); // Increased delay to reduce conflicts
			}
		});

		// Start observing when ready
		jQuery(document).ready(function () {
			var headerBuilder = document.querySelector('.cm-header-builder');
			var masthead = document.querySelector('#cm-masthead');
			var searchTop = document.querySelector('.cm-top-search');
			var colorSwitch = document.querySelector('#cm-color-switch-checkbox');

			if (headerBuilder) {
				observer.observe(headerBuilder, {
					childList: true,
					subtree: true,
					attributes: true,
					attributeFilter: ['class', 'style', 'data-position'],
				});
			}

			if (masthead) {
				observer.observe(masthead, {
					childList: true,
					subtree: true,
					attributes: true,
					attributeFilter: ['class', 'style', 'data-position'],
				});
			}

			// Also watch for search element changes
			if (searchTop) {
				observer.observe(searchTop, {
					childList: true,
					subtree: true,
					attributes: true,
					attributeFilter: ['class', 'style', 'data-position'],
				});
			}

			// Watch for dark mode component changes
			if (colorSwitch) {
				observer.observe(colorSwitch, {
					childList: true,
					subtree: true,
					attributes: true,
					attributeFilter: ['class', 'style', 'data-position', 'checked'],
				});
			}
		});
	}

	// Additional fallback: watch for window resize and orientation changes (Elementor compatible)
	window.addEventListener('resize', function () {
		checkElementorStatus();
		if (!isElementorActive) {
			setTimeout(checkForHeaderChanges, 200);
		}
	});

	window.addEventListener('orientationchange', function () {
		checkElementorStatus();
		if (!isElementorActive) {
			setTimeout(checkForHeaderChanges, 300);
		}
	});

	// Watch for any clicks on header builder elements that might indicate changes
	document.addEventListener(
		'click',
		function (e) {
			checkElementorStatus();
			if (
				!isElementorActive &&
				(e.target.closest('.cm-header-builder') ||
					e.target.closest('#cm-masthead'))
			) {
				setTimeout(checkForHeaderChanges, 200);
			}
		},
		true,
	);
})();

/**
 * Flyout related posts featured JS setting.
 */
jQuery(function () {
	// Flyout related post.
	var related_posts_flyout_wrapper = jQuery('#related-posts-wrapper-flyout');

	function colormag_flyout_posts_window_scroll() {
		var primary_height = jQuery('#cm-primary').outerHeight();
		var window_height = jQuery(this).scrollTop() + jQuery(this).height();
		var window_bottom = jQuery(document).height() - window_height;

		if (window_height > window_bottom) {
			related_posts_flyout_wrapper.addClass('flyout');
		} else {
			related_posts_flyout_wrapper.removeClass('flyout');
		}
	}

	jQuery(window)
		.off('scroll.colormag')
		.on('scroll.colormag', colormag_flyout_posts_window_scroll);

	jQuery('#flyout-related-post-close')
		.off('click.colormag')
		.on('click.colormag', function () {
			related_posts_flyout_wrapper.removeClass('flyout');

			jQuery(window).off(
				'scroll.colormag',
				colormag_flyout_posts_window_scroll,
			);
		});
});

// Dark mode reinitialization function
function reinitializeDarkMode() {
	const colorSwitch = document.getElementById('cm-color-switch-checkbox');
	if (colorSwitch) {
		// Remove existing event listeners to prevent duplicates
		colorSwitch.removeEventListener('change', handleColorSwitchChange);
		// Add the event listener back
		colorSwitch.addEventListener('change', handleColorSwitchChange);

		// Update the checkbox state based on current body class
		// With new logic: checked = light mode (no dark-skin class), unchecked = dark mode (has dark-skin class)
		const isDarkMode = document.body.classList.contains('dark-skin');
		colorSwitch.checked = !isDarkMode; // Inverted logic
	}
}

// Dark mode change handler
function handleColorSwitchChange() {
	const colorSwitch = document.getElementById('cm-color-switch-checkbox');
	if (colorSwitch) {
		localStorage.removeItem('colorSwitcherState');
		localStorage.setItem('colorSwitcherState', colorSwitch.checked);
		if (colorSwitch.checked) {
			document.body.classList.remove('dark-skin');
		} else {
			document.body.classList.add('dark-skin');
		}
	}
}

// add widget block title class.
jQuery('.wp-block-group__inner-container h2').wrap(
	'<div class="block-title"></div>',
);
jQuery('.wp-block-heading').wrap('<div class="block-title"></div>');

document.addEventListener('DOMContentLoaded', function () {
	const colorSwitch = document.getElementById('cm-color-switch-checkbox');
	let switchValue = colormag_color_switcher.colormag_switcher;
	if (switchValue === undefined) {
		switchValue = 'white';
	}
	if (null === colorSwitch || undefined === colorSwitch) {
		localStorage.removeItem('hasRunColor');
	}
	let hasRunColor = localStorage.getItem('hasRunColor');

	if (
		'false' === hasRunColor ||
		null === hasRunColor ||
		undefined === hasRunColor
	) {
		if (switchValue === 'dark') {
			localStorage.setItem('colorSwitcherState', 'false');
		} else {
			localStorage.setItem('colorSwitcherState', 'true');
		}
	}
	const savedState = localStorage.getItem('colorSwitcherState');
	if (savedState === 'true') {
		document.body.classList.remove('dark-skin');
	} else {
		document.body.classList.add('dark-skin');
	}
	if (colorSwitch !== null) {
		localStorage.setItem('hasRunColor', 'true');
		colorSwitch.checked = savedState === 'true';

		colorSwitch.addEventListener('change', function () {
			localStorage.removeItem('colorSwitcherState');
			localStorage.setItem('colorSwitcherState', colorSwitch.checked);
			if (colorSwitch.checked) {
				document.body.classList.remove('dark-skin');
			} else {
				document.body.classList.add('dark-skin');
			}
		});
	}
});

// Off Canvas.
(function ($) {
	'use strict';

	$(document).ready(function () {
		// Toggle off-canvas menu
		$('.cm-off-canvas-toggle')
			.off('click.colormag')
			.on('click.colormag', function (e) {
				e.preventDefault();
				toggleOffCanvas();
			});

		// Close off-canvas menu
		$('.cm-off-canvas-close, .cm-off-canvas-overlay')
			.off('click.colormag')
			.on('click.colormag', function (e) {
				e.preventDefault();
				closeOffCanvas();
			});

		// Close off-canvas menu on ESC key
		$(document)
			.off('keyup.colormag')
			.on('keyup.colormag', function (e) {
				if (e.key === 'Escape') {
					closeOffCanvas();
				}
			});

		// Function to toggle off-canvas menu
		function toggleOffCanvas() {
			$('.cm-header-off-canvas').toggleClass('active');
			$('.cm-off-canvas-overlay').toggleClass('active');
			$('body').toggleClass('off-canvas-open');

			if ($('.cm-header-off-canvas').hasClass('active')) {
				$('.cm-off-canvas-toggle').attr('aria-expanded', 'true');
			} else {
				$('.cm-off-canvas-toggle').attr('aria-expanded', 'false');
			}
		}

		// Function to close off-canvas menu
		function closeOffCanvas() {
			$('.cm-header-off-canvas').removeClass('active');
			$('.cm-off-canvas-overlay').removeClass('active');
			$('body').removeClass('off-canvas-open');
			$('.cm-off-canvas-toggle').attr('aria-expanded', 'false');
		}
	});
})(jQuery);
