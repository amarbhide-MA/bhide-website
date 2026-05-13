(function ($) {
	function colormagColorPalette(v, to) {
		let styles = '';
		Object.entries(to.colors).forEach(([k, v]) => {
			styles += `--${k}:${v};`;
		});
		v = `:root {${styles}}`;
		return v;
	}

	function colormagGenerateCommonCSS(selector, property, value) {
		return `${selector} {${property}:${value};}`;
	}

	function colormagElementLayoutCSS(selector, property, value) {
		return `${selector} {${property}: ${value};}`;
	}

	function colormagGenerateSlidebarWidthCSS(
		selector,
		secondarySelector,
		property,
		value,
	) {
		let sidebarCss = value.size;
		let primaryCss = 100 - value.size;
		let css = '';
		css = `${selector} {${property}: ${sidebarCss}${value.unit};}`;
		css += `${secondarySelector} {${property}: ${primaryCss}${value.unit};}`;

		return css;
	}

	function colormagGenerateSliderCSS(selector, property, value) {
		let css = '';

		// Check if we have responsive values (desktop, tablet, mobile)
		if (value.desktop || value.tablet || value.mobile) {
			// Desktop styling
			if (value.desktop?.size) {
				const unit = value.desktop.unit || 'px';
				css += `${selector} {${property}: ${value.desktop.size}${unit};}`;
			}

			// Tablet styling
			if (value.tablet?.size) {
				const tabletUnit = value.tablet.unit || 'px';
				css += `@media(max-width: 768px) {${selector} {${property}: ${value.tablet.size}${tabletUnit};}}`;
			}

			// Mobile styling
			if (value.mobile?.size) {
				const mobileUnit = value.mobile.unit || 'px';
				css += `@media(max-width: 600px) {${selector} {${property}: ${value.mobile.size}${mobileUnit};}}`;
			}
		} else {
			// Legacy format (non-responsive)
			const unit = value.unit || 'px';
			css = `${selector} {${property}: ${value.size}${unit};}`;
		}

		return css;
	}

	function colormagGenerateBackgroundCSS(selector, value) {
		let backgroundColor = value['background-color'],
			backgroundImage = value['background-image'],
			backgroundAttachment = value['background-attachment'],
			backgroundPosition = value['background-position'],
			backgroundSize = value['background-size'],
			backgroundRepeat = value['background-repeat'];

		return `${selector}{background-color: ${backgroundColor};background-image: url( ${backgroundImage} );background-attachment: ${backgroundAttachment};background-position: ${backgroundPosition};background-size: ${backgroundSize};background-repeat: ${backgroundRepeat};}`;
	}

	/**
	 * @param {string} str
	 * @returns {boolean}
	 */
	function colormagIsNumeric(str) {
		var matches;

		if ('string' !== typeof str) {
			return false;
		}

		matches = str.match(/\d+/g);

		return null !== matches;
	}

	function colormagGenerateTypographyCSS(controlId, selector, typography) {
		let css = '';
		var link = '',
			fontFamily = '',
			fontWeight = '',
			fontStyle = '',
			fontTransform = '',
			desktopFontSize = '',
			tabletFontSize = '',
			mobileFontSize = '',
			desktopLineHeight = '',
			tabletLineHeight = '',
			mobileLineHeight = '',
			desktopLetterSpacing = '',
			tabletLetterSpacing = '',
			mobileLetterSpacing = '';

		if ('object' == typeof typography) {
			if (undefined !== typography['font-size']) {
				if (
					'undefined' !== typeof typography?.['font-size']?.desktop?.size &&
					'' !== typography['font-size']['desktop']['size']
				) {
					desktopFontSize =
						typography['font-size']['desktop']['size'] +
						typography['font-size']['desktop']['unit'];
				}

				if (
					'undefined' !== typeof typography?.['font-size']?.tablet?.size &&
					'' !== typography['font-size']['tablet']['size']
				) {
					tabletFontSize =
						typography['font-size']['tablet']['size'] +
						typography['font-size']['tablet']['unit'];
				}

				if (
					'undefined' !== typeof typography?.['font-size']?.mobile?.size &&
					'' !== typography['font-size']['mobile']['size']
				) {
					mobileFontSize =
						typography['font-size']['mobile']['size'] +
						typography['font-size']['mobile']['unit'];
				}
			}

			if (undefined !== typography['line-height']) {
				if (
					'undefined' !== typeof typography?.['line-height']?.desktop?.size &&
					'' !== typography['line-height']['desktop']['size']
				) {
					const desktopLineHeightUnit =
						'-' !== typography['line-height']['desktop']['unit']
							? typography['line-height']['desktop']['unit']
							: '';
					desktopLineHeight =
						typography['line-height']['desktop']['size'] +
						desktopLineHeightUnit;
				}

				if (
					'undefined' !== typeof typography?.['line-height']?.tablet?.size &&
					'' !== typography['line-height']['tablet']['size']
				) {
					const tabletLineHeightUnit =
						'-' !== typography['line-height']['tablet']['unit']
							? typography['line-height']['tablet']['unit']
							: '';
					tabletLineHeight =
						typography['line-height']['tablet']['size'] + tabletLineHeightUnit;
				}

				if (
					'undefined' !== typeof typography?.['line-height']?.mobile?.size &&
					'' !== typography['line-height']['mobile']['size']
				) {
					const mobileLineHeightUnit =
						'-' !== typography['line-height']['mobile']['unit']
							? typography['line-height']['mobile']['unit']
							: '';
					mobileLineHeight =
						typography['line-height']['mobile']['size'] + mobileLineHeightUnit;
				}
			}

			if (undefined !== typography['letter-spacing']) {
				if (
					'undefined' !==
						typeof typography?.['letter-spacing']?.desktop?.size &&
					'' !== typography['letter-spacing']['desktop']['size']
				) {
					const desktopLetterSpacingUnit =
						'-' !== typography['letter-spacing']['desktop']['unit']
							? typography['letter-spacing']['desktop']['unit']
							: '';
					desktopLetterSpacing =
						typography['letter-spacing']['desktop']['size'] +
						desktopLetterSpacingUnit;
				}

				if (
					'undefined' !== typeof typography?.['letter-spacing']?.tablet?.size &&
					'' !== typography['letter-spacing']['tablet']['size']
				) {
					const tabletLetterSpacingUnit =
						'-' !== typography['letter-spacing']['tablet']['unit']
							? typography['letter-spacing']['tablet']['unit']
							: '';
					tabletLetterSpacing =
						typography['letter-spacing']['tablet']['size'] +
						tabletLetterSpacingUnit;
				}

				if (
					'undefined' !== typeof typography?.['letter-spacing']?.mobile?.size &&
					'' !== typography['letter-spacing']['mobile']['size']
				) {
					const mobileLetterSpacingUnit =
						'-' !== typography['letter-spacing']['mobile']['unit']
							? typography['letter-spacing']['mobile']['unit']
							: '';
					mobileLetterSpacing =
						typography['letter-spacing']['mobile']['size'] +
						mobileLetterSpacingUnit;
				}
			}

			if (
				undefined !== typography['font-family'] &&
				'' !== typography['font-family']
			) {
				fontFamily = typography['font-family'].split(',')[0];
				fontFamily = fontFamily.replace(/'/g, '');

				if (
					fontFamily.includes('default') ||
					fontFamily.includes('Default') ||
					fontFamily.includes('-apple-system')
				) {
					fontFamily =
						'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", Helvetica, Arial, sans-serif';
				} else if (fontFamily.includes('Monaco')) {
					fontFamily =
						'Monaco,"Lucida Sans Typewriter","Lucida Typewriter","Courier New",Courier,monospace';
				} else {
					link = `<link id="${controlId}" href="https://fonts.googleapis.com/css?family=${fontFamily}" rel="stylesheet">`;
				}
			}

			if (
				undefined !== typography['font-weight'] &&
				'' !== typography['font-weight']
			) {
				if (colormagIsNumeric(typography['font-weight'])) {
					fontWeight = parseInt(typography['font-weight']);
				} else {
					fontWeight =
						'regular' != typography['font-weight']
							? typography['font-weight']
							: 'normal';
				}
			}

			if (
				undefined !== typography['font-style'] &&
				'' !== typography['font-style']
			) {
				fontStyle = typography['font-style'];
			}

			if (
				undefined !== typography['text-transform'] &&
				'' !== typography['text-transform']
			) {
				fontTransform = typography['text-transform'];
			}

			jQuery('link#' + controlId).remove();

			css = `${selector} {
						font-family: ${fontFamily};
						font-weight: ${fontWeight};
						font-style: ${fontStyle};
						text-transform: ${fontTransform};
						font-size: ${desktopFontSize};
						line-height: ${desktopLineHeight};
						letter-spacing: ${desktopLetterSpacing};
					}`;

			css += `@media (max-width: 768px) {
						${selector} {
							font-size: ${tabletFontSize};
							line-height: ${tabletLineHeight};
							letter-spacing: ${tabletLetterSpacing};
						}
					}`;

			css += `@media (max-width: 600px) {
						${selector}{
							font-size: ${mobileFontSize};
							line-height:${mobileLineHeight};
							letter-spacing: ${mobileLetterSpacing};
						}
					}`;

			jQuery('head').append(link);

			return css;
		}

		return css;
	}

	function colormagGenerateDimensionCSS(selector, property, value) {
		let unit = value.unit ? value.unit : 'px';

		let css = '';
		const $property =
			property === 'border-width'
				? 'border-{SIDE}-width'
				: property + '-{SIDE}';
		for (const side of ['top', 'right', 'bottom', 'left']) {
			if (value.hasOwnProperty(side) && value[side] !== '') {
				css += `${$property.replace('{SIDE}', side)}: ${value[side] + unit};`;
			}
		}

		if (css === '') {
			return '';
		}

		return `${selector}{ ${css} }`;
	}

	wp.hooks.addFilter(
		'customind.dynamic.css',
		'customind',
		function (css, value, id) {
			switch (id) {
				case 'colormag_color_palette':
					css = colormagColorPalette(css, value);
					break;
				case 'colormag_base_color':
					css = colormagGenerateCommonCSS('body', 'color', value);
					break;

				case 'colormag_headings_color':
					css = colormagGenerateCommonCSS(
						`h1, h2, h3, h4, h5, h6, .dark-skin h1, .dark-skin h2, .dark-skin h3, .dark-skin h4, .dark-skin h5, .dark-skin h6`,
						'color',
						value,
					);
					break;

				case 'colormag_h1_color':
					css = colormagGenerateCommonCSS('h1, .dark-skin h1', 'color', value);
					break;

				case 'colormag_h2_color':
					css = colormagGenerateCommonCSS('h2, .dark-skin h2', 'color', value);
					break;

				case 'colormag_h3_color':
					css = colormagGenerateCommonCSS('h3, .dark-skin h3', 'color', value);
					break;

				case 'colormag_link_color':
					css = colormagGenerateCommonCSS(
						'.cm-entry-summary a, .mzb-featured-categories .mzb-post-title a, .mzb-tab-post .mzb-post-title a, .mzb-post-list .mzb-post-title a, .mzb-featured-posts .mzb-post-title a, .mzb-featured-categories .mzb-post-title a',
						'color',
						value,
					);
					break;

				case 'colormag_link_hover_color':
					css = colormagGenerateCommonCSS(
						`.post .cm-entry-summary a:hover, .mzb-featured-categories .mzb-post-title a:hover, .mzb-tab-post .mzb-post-title a:hover, .mzb-post-list .mzb-post-title a:hover, .mzb-featured-posts .mzb-post-title a:hover, .mzb-featured-categories .mzb-post-title a:hover`,
						'color',
						value,
					);
					break;

				case 'colormag_inside_container_background':
					css = colormagGenerateBackgroundCSS('.cm-content', value);
					break;

				case 'colormag_outside_container_background':
					css = colormagGenerateBackgroundCSS('body', value);
					break;

				case 'colormag_base_typography':
					css = colormagGenerateTypographyCSS(
						id,
						`body, button, input, select, textarea, blockquote p, .entry-meta, .cm-entry-button, dl, .previous a, .next a, .nav-previous a, .nav-next a, #respond h3#reply-title #cancel-comment-reply-link, #respond form input[type="text"], #respond form textarea, .cm-secondary .widget, .cm-error-404 .widget, .cm-entry-summary p`,
						value,
					);
					break;

				case 'colormag_headings_typography':
					css = colormagGenerateTypographyCSS(
						id,
						'h1 ,h2, h3, h4, h5, h6',
						value,
					);
					break;

				case 'colormag_h1_typography':
					css = colormagGenerateTypographyCSS(id, 'h1', value);
					break;

				case 'colormag_h2_typography':
					css = colormagGenerateTypographyCSS(id, 'h2', value);
					break;

				case 'colormag_h3_typography':
					css = colormagGenerateTypographyCSS(id, 'h3', value);
					break;

				case 'colormag_h4_typography':
					css = colormagGenerateTypographyCSS(id, 'h4', value);
					break;

				case 'colormag_h5_typography':
					css = colormagGenerateTypographyCSS(id, 'h5', value);
					break;

				case 'colormag_h6_typography':
					css = colormagGenerateTypographyCSS(id, 'h6', value);
					break;

				case 'colormag_form_element_text_color':
					css = colormagGenerateCommonCSS(`input, textarea`, 'color', value);
					break;

				case 'colormag_form_element_text_focus_color':
					css = colormagGenerateCommonCSS(
						`input:focus, textarea:focus`,
						'color',
						value,
					);
					break;

				case 'colormag_form_element_background_color':
					css = colormagGenerateCommonCSS(
						`input, textarea`,
						'background-color',
						value,
					);
					break;

				case 'colormag_form_element_background_focus_color':
					css = colormagGenerateCommonCSS(
						`input:focus, textarea:focus`,
						'background-color',
						value,
					);
					break;

				case 'colormag_form_element_border_color':
					css = colormagGenerateCommonCSS(
						`input, textarea, #respond form textarea, .cm-entry-summary .wc-block-components-form .wc-block-components-text-input.is-active input[type=text], .cm-entry-summary .wc-block-components-form .wc-block-components-text-input input[type=email], .cm-entry-summary .wc-block-components-form .wc-block-components-text-input input[type=tel], .cm-entry-summary .wc-blocks-components-select .wc-blocks-components-select__select, .woocommerce-checkout textarea`,
						'border-color',
						value,
					);
					break;

				case 'colormag_button_color':
					css = colormagGenerateCommonCSS(
						`.colormag-button, input[type="reset"], input[type="button"], input[type="submit"], button, .cm-entry-button span, .wp-block-button .wp-block-button__link`,
						'color',
						value,
					);
					break;

				case 'colormag_button_hover_color':
					css = colormagGenerateCommonCSS(
						`.colormag-button:hover, input[type="reset"]:hover, input[type="button"]:hover, input[type="submit"]:hover, button:hover, .cm-entry-button span:hover, .wp-block-button .wp-block-button__link:hover`,
						'color',
						value,
					);
					break;

				case 'colormag_button_background_color':
					css = colormagGenerateCommonCSS(
						`.colormag-button, input[type="reset"], input[type="button"], input[type="submit"], button, .cm-entry-button span, .wp-block-button .wp-block-button__link`,
						'background-color',
						value,
					);
					break;

				case 'colormag_button_background_hover_color':
					css = colormagGenerateCommonCSS(
						`.colormag-button:hover, input[type="reset"]:hover, input[type="button"]:hover, input[type="submit"]:hover, button:hover, .cm-entry-button span:hover, .wp-block-button .wp-block-button__link:hover`,
						'background-color',
						value,
					);
					break;

				case 'colormag_button_dimension_padding':
					css = colormagGenerateDimensionCSS(
						`.colormag-button, input[type="reset"], input[type="button"], input[type="submit"], button, .cm-entry-button span, .wp-block-button .wp-block-button__link`,
						'padding',
						value,
					);
					break;

				case 'colormag_button_border_width':
					css = colormagGenerateSliderCSS(
						`.colormag-button, input[type="reset"], input[type="button"], input[type="submit"], button, .cm-entry-button span, .wp-block-button .wp-block-button__link`,
						'border-width',
						value,
					);
					break;

				case 'colormag_form_element_border_width':
					css = colormagGenerateSliderCSS(
						`input, textarea, #respond form textarea`,
						'border-width',
						value,
					);
					break;

				case 'colormag_button_border_radius':
					css = colormagGenerateSliderCSS(
						`.colormag-button, input[type="reset"], input[type="button"], input[type="submit"], button, .cm-entry-button span, .wp-block-button .wp-block-button__link`,
						'border-radius',
						value,
					);
					break;

				case 'colormag_button_border_color':
					css = colormagGenerateCommonCSS(
						`.colormag-button, input[type="reset"], input[type="button"], input[type="submit"], button, .cm-entry-button span, .wp-block-button .wp-block-button__link`,
						'border-color',
						value,
					);
					break;

				case 'colormag_top_bar_background_color':
					css = colormagGenerateCommonCSS(
						`.cm-top-bar`,
						'background-color',
						value,
					);
					break;

				case 'colormag_main_header_background':
					css = colormagGenerateBackgroundCSS(
						'.cm-header-1, .dark-skin .cm-header-1',
						value,
					);
					break;

				case 'colormag_primary_menu_background':
					css = colormagGenerateBackgroundCSS(
						'.cm-mobile-nav li, #cm-primary-nav, .cm-layout-2 #cm-primary-nav, .cm-header .cm-main-header .cm-primary-nav .cm-row, .cm-home-icon.front_page_on',
						value,
					);
					break;

				case 'colormag_primary_menu_logo_height':
					css = colormagGenerateSliderCSS('.menu-logo img', 'height', value);
					break;

				case 'colormag_primary_menu_logo_spacing':
					css = colormagGenerateSliderCSS(
						'.menu-logo a',
						'margin-right',
						value,
					);
					break;

				case 'colormag_primary_menu_top_border_width':
					css = colormagGenerateSliderCSS(
						'#cm-primary-nav',
						'border-top-width',
						value,
					);
					break;

				case 'colormag_primary_menu_top_border_color':
					css = colormagGenerateCommonCSS(
						'#cm-primary-nav',
						'border-top-color',
						value,
					);
					break;

				case 'colormag_primary_menu_padding':
					css = colormagGenerateDimensionCSS(
						'.cm-primary-nav',
						'padding',
						value,
					);
					break;

				case 'colormag_primary_menu_text_color':
					css = colormagGenerateCommonCSS(
						`.cm-primary-nav a, .cm-primary-nav ul li ul li a, .cm-primary-nav ul li.current-menu-item ul li a, .cm-primary-nav ul li ul li.current-menu-item a, .cm-primary-nav ul li.current_page_ancestor ul li a, .cm-primary-nav ul li.current-menu-ancestor ul li a, .cm-primary-nav ul li.current_page_item ul li a, .cm-primary-nav li.menu-item-has-children>a::after, .cm-primary-nav li.page_item_has_children>a::after, .cm-layout-2-style-1 .cm-primary-nav a, .cm-layout-2-style-1 .cm-primary-nav ul > li > a`,
						'color',
						value,
					);
					css += colormagGenerateCommonCSS(
						`.cm-layout-2 .cm-primary-nav .cm-submenu-toggle .cm-icon, .cm-primary-nav .cm-submenu-toggle .cm-icon`,
						'fill',
						value,
					);
					break;

				case 'colormag_primary_menu_selected_hovered_text_color':
					css = colormagGenerateCommonCSS(
						`.cm-primary-nav a:hover, .cm-primary-nav ul li.current-menu-item a, .cm-primary-nav ul li ul li.current-menu-item a, .cm-primary-nav ul li.current_page_ancestor a, .cm-primary-nav ul li.current-menu-ancestor a, .cm-primary-nav ul li.current_page_item a, .cm-primary-nav ul li:hover>a, .cm-primary-nav ul li ul li a:hover, .cm-primary-nav ul li ul li:hover>a, .cm-primary-nav ul li.current-menu-item ul li a:hover, .cm-primary-nav li.page_item_has_children.current-menu-item>a::after, .cm-layout-2-style-1 .cm-primary-nav ul li:hover > a`,
						'color',
						value,
					);
					css += colormagGenerateCommonCSS(
						`.cm-layout-2 .cm-primary-nav li:hover > .cm-submenu-toggle .cm-icon, .cm-primary-nav li:hover > .cm-submenu-toggle .cm-icon `,
						'fill',
						value,
					);
					break;

				case 'colormag_primary_menu_typography':
					css = colormagGenerateTypographyCSS(
						id,
						'.cm-primary-nav ul li a',
						value,
					);
					break;

				case 'colormag_form_element_typography':
					css = colormagGenerateTypographyCSS(
						id,
						`body input, body textarea, #respond form textarea`,
						value,
					);
					break;

				case 'colormag_button_typography':
					css = colormagGenerateTypographyCSS(
						id,
						`.colormag-button, input[type="reset"], input[type="button"], input[type="submit"], button, .cm-entry-button span, .wp-block-button .wp-block-button__link`,
						value,
					);
					break;

				case 'colormag_content_widget_title_typography':
					css = colormagGenerateTypographyCSS(
						id,
						`.cm-primary .cm-featured-posts .cm-widget-title`,
						value,
					);
					break;

				case 'colormag_mobile_menu_toggle_icon_color':
					css = colormagGenerateCommonCSS(
						'.cm-header .cm-menu-toggle svg, .cm-header .cm-menu-toggle svg',
						'fill',
						value,
					);
					break;

				case 'colormag_mobile_menu_text_color':
					css = colormagGenerateCommonCSS(
						`.cm-mobile-nav a, .cm-mobile-nav ul li ul li a, .cm-mobile-nav ul li.current-menu-item ul li a, .cm-mobile-nav ul li ul li.current-menu-item a, .cm-mobile-nav ul li.current_page_ancestor ul li a, .cm-mobile-nav ul li.current-menu-ancestor ul li a, .cm-mobile-nav ul li.current_page_item ul li a, .cm-mobile-nav li.menu-item-has-children>a::after, .cm-mobile-nav li.page_item_has_children>a::after, .cm-layout-2-style-1 .cm-mobile-nav a, .cm-layout-2-style-1 .cm-mobile-nav ul > li > a`,
						'color',
						value,
					);
					css += colormagGenerateCommonCSS(
						`.cm-layout-2 .cm-mobile-nav .cm-submenu-toggle .cm-icon, .cm-mobile-nav .cm-submenu-toggle .cm-icon`,
						'fill',
						value,
					);
					break;

				case 'colormag_mobile_menu_selected_hovered_text_color':
					css = colormagGenerateCommonCSS(
						`.cm-mobile-nav a:hover, .cm-mobile-nav ul li.current-menu-item a, .cm-mobile-nav ul li ul li.current-menu-item a, .cm-mobile-nav ul li.current_page_ancestor a, .cm-mobile-nav ul li.current-menu-ancestor a, .cm-mobile-nav ul li.current_page_item a, .cm-mobile-nav ul li:hover>a, .cm-mobile-nav ul li ul li a:hover, .cm-mobile-nav ul li ul li:hover>a, .cm-mobile-nav ul li.current-menu-item ul li a:hover, .cm-mobile-nav li.page_item_has_children.current-menu-item>a::after, .cm-layout-2-style-1 .cm-mobile-nav ul li:hover > a`,
						'color',
						value,
					);
					css += colormagGenerateCommonCSS(
						`.cm-layout-2 .cm-mobile-nav li:hover > .cm-submenu-toggle .cm-icon, .cm-mobile-nav li:hover > .cm-submenu-toggle .cm-icon `,
						'fill',
						value,
					);
					break;

				case 'colormag_mobile_menu_typography':
					css = colormagGenerateTypographyCSS(
						id,
						'.cm-mobile-nav ul li a',
						value,
					);
					break;

				case 'colormag_mobile_sub_menu_background':
					css = colormagGenerateBackgroundCSS(
						'.cm-mobile-nav .sub-menu,.cm-mobile-nav .sub-menu li, .cm-mobile-nav .children',
						value,
					);
					break;

				case 'colormag_mobile_sub_menu_typography':
					css = colormagGenerateTypographyCSS(
						id,
						'.cm-mobile-nav ul li ul li a',
						value,
					);
					break;

				case 'colormag_primary_sub_menu_background':
					css = colormagGenerateBackgroundCSS(
						'.cm-primary-nav .sub-menu, .cm-primary-nav .children',
						value,
					);
					break;

				case 'colormag_primary_sub_menu_typography':
					css = colormagGenerateTypographyCSS(
						id,
						'.cm-primary-nav ul li ul li a',
						value,
					);
					break;

				case 'colormag_header_action_icon_hover_color':
					css = colormagGenerateCommonCSS(
						'.fa.search-top:hover',
						'color',
						value,
					);
					css += colormagGenerateCommonCSS(
						'.cm-primary-nav .cm-random-post a:hover > svg, .cm-mobile-nav .cm-random-post a:hover > svg',
						'fill',
						value,
					);
					break;

				case 'colormag_header_action_icon_color':
					css = colormagGenerateCommonCSS('.fa.search-top', 'color', value);
					css += colormagGenerateCommonCSS(
						'.cm-primary-nav .cm-random-post a svg,.cm-mobile-nav .cm-random-post a svg',
						'fill',
						value,
					);
					break;

				case 'colormag_blog_post_title_typography':
					css = colormagGenerateTypographyCSS(id, '.cm-entry-title', value);
					break;

				case 'colormag_single_post_title_typography':
					css = colormagGenerateTypographyCSS(
						id,
						'.single .cm-entry-header .cm-entry-title',
						value,
					);
					break;

				case 'colormag_footer_copyright_background':
					css = colormagGenerateBackgroundCSS(
						'#cm-footer .cm-footer-bar',
						value,
					);
					break;

				case 'colormag_footer_background':
					css = colormagGenerateBackgroundCSS('.cm-footer-cols', value);
					break;

				case 'colormag_upper_footer_background':
					css = colormagGenerateBackgroundCSS(
						'.cm-footer .cm-upper-footer-cols .widget',
						value,
					);
					break;

				case 'colormag_footer_widget_title_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-cols .cm-row .cm-widget-title span',
						'color',
						value,
					);
					break;

				case 'colormag_footer_widget_content_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-cols .cm-row, .cm-footer-cols .cm-row p',
						'color',
						value,
					);
					break;

				case 'colormag_footer_widget_content_link_text_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-cols .cm-row a',
						'color',
						value,
					);
					break;

				case 'colormag_footer_widget_content_link_text_hover_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-cols .cm-row a:hover',
						'color',
						value,
					);
					break;

				case 'colormag_date_color':
					css = colormagGenerateCommonCSS(
						'.cm-header-builder .date-in-header',
						'color',
						value,
					);
					break;

				case 'colormag_news_ticker_color':
					css = colormagGenerateCommonCSS(
						'.cm-header-builder .breaking-news-latest',
						'color',
						value,
					);
					break;

				case 'colormag_news_ticker_link_color':
					css = colormagGenerateCommonCSS(
						'.cm-header-builder .newsticker li a',
						'color',
						value,
					);
					break;

				case 'colormag_date_typography':
					css = colormagGenerateTypographyCSS(
						id,
						'.cm-header-builder .date-in-header',
						value,
					);
					break;

				case 'colormag_news_ticker_typography':
					css = colormagGenerateTypographyCSS(
						id,
						'.cm-header-builder .breaking-news-latest',
						value,
					);
					break;

				case 'colormag_header_html_1_text_color':
					css = colormagGenerateCommonCSS(
						'.cm-header-builder .cm-html-1 *',
						'color',
						value,
					);
					break;

				case 'colormag_header_html_1_link_color':
					css = colormagGenerateCommonCSS(
						'.cm-header-builder .cm-html-1 a',
						'color',
						value,
					);
					break;

				case 'colormag_header_html_1_link_hover_color':
					css = colormagGenerateCommonCSS(
						'.cm-header-builder .cm-html-1 a:hover',
						'color',
						value,
					);
					break;

				case 'colormag_header_html_1_font_size':
					css = colormagGenerateSliderCSS(
						'.cm-header-builder .cm-html-1 *',
						'font-size',
						value,
					);
					break;

				case 'colormag_header_html_1_margin':
					css = colormagGenerateDimensionCSS(
						'.cm-header-builder .cm-html-1',
						'margin',
						value,
					);
					break;

				case 'colormag_header_primary_menu_text_color':
					css = colormagGenerateCommonCSS(
						'.cm-header-builder .cm-primary-nav ul li a',
						'color',
						value,
					);
					css += colormagGenerateCommonCSS(
						'.cm-header-builder .cm-primary-nav .cm-submenu-toggle .cm-icon',
						'fill',
						value,
					);
					break;

				case 'colormag_header_primary_menu_selected_hovered_text_color':
					css = colormagGenerateCommonCSS(
						'.cm-header-builder .cm-primary-nav ul li:hover > a',
						'color',
						value,
					);
					css += colormagGenerateCommonCSS(
						'.cm-header-builder .cm-primary-nav li:hover > .cm-submenu-toggle .cm-icon',
						'fill',
						value,
					);
					break;

				case 'colormag_header_primary_menu_active_text_color':
					css = colormagGenerateCommonCSS(
						'.cm-header-builder .cm-primary-nav ul li.current_page_item > a',
						'color',
						value,
					);
					css += colormagGenerateCommonCSS(
						'.cm-header-builder .cm-primary-nav li.current_page_item > .cm-submenu-toggle .cm-icon',
						'fill',
						value,
					);
					break;

				case 'colormag_header_primary_menu_hover_background':
					css = colormagGenerateCommonCSS(
						'.cm-header-builder .cm-primary-nav ul li:hover',
						'background',
						value,
					);
					break;

				case 'colormag_header_primary_menu_active_background':
					css = colormagGenerateCommonCSS(
						'.cm-header-builder .cm-primary-nav ul li.current-menu-item',
						'background',
						value,
					);
					break;

				case 'colormag_header_primary_sub_menu_background':
					css = colormagGenerateBackgroundCSS(
						'.cm-header-builder .cm-primary-nav .sub-menu, .cm-header-builder .cm-primary-nav .children',
						value,
					);
					break;

				case 'colormag_header_primary_menu_typography':
					css = colormagGenerateTypographyCSS(
						id,
						'.cm-header-builder .cm-primary-nav > ul > li > a',
						value,
					);
					break;

				case 'colormag_header_primary_sub_menu_typography':
					css = colormagGenerateTypographyCSS(
						id,
						'.cm-header-builder .cm-primary-nav ul li ul li a',
						value,
					);
					break;

				case 'colormag_header_secondary_menu_text_color':
					css = colormagGenerateCommonCSS(
						'.cm-header-builder .cm-secondary-nav ul li a',
						'color',
						value,
					);
					css += colormagGenerateCommonCSS(
						'.cm-header-builder .cm-secondary-nav ul li .cm-submenu-toggle .cm-icon',
						'fill',
						value,
					);
					break;

				case 'colormag_header_secondary_menu_selected_hovered_text_color':
					css = colormagGenerateCommonCSS(
						'.cm-header-builder .cm-secondary-nav ul li:hover > a',
						'color',
						value,
					);
					css += colormagGenerateCommonCSS(
						'.cm-header-builder .cm-secondary-nav ul li > .cm-submenu-toggle .cm-icon',
						'fill',
						value,
					);
					break;

				case 'colormag_header_secondary_menu_hover_background':
					css = colormagGenerateCommonCSS(
						'.cm-header-builder .cm-secondary-nav ul li:hover',
						'background-color',
						value,
					);
					break;

				case 'colormag_header_secondary_sub_menu_background':
					css = colormagGenerateBackgroundCSS(
						'.cm-header-builder .cm-secondary-nav .sub-menu, .cm-header-builder .cm-secondary-nav .children',
						value,
					);
					break;

				case 'colormag_header_secondary_menu_typography':
					css = colormagGenerateTypographyCSS(
						id,
						'.cm-header-builder .cm-secondary-nav ul li a',
						value,
					);
					break;

				case 'colormag_header_secondary_sub_menu_typography':
					css = colormagGenerateTypographyCSS(
						id,
						'.cm-header-builder .cm-secondary-nav ul li ul li a',
						value,
					);
					break;

				case 'colormag_header_mobile_menu_typography':
					css = colormagGenerateTypographyCSS(
						id,
						'.cm-header-builder .cm-mobile-nav ul li a',
						value,
					);
					break;

				case 'colormag_mobile_menu_background':
					css = colormagGenerateBackgroundCSS('.cm-mobile-nav ul li', value);
					break;

				case 'colormag_off_canvas_background':
					css = colormagGenerateBackgroundCSS(
						'.cm-header-builder .cm-header-off-canvas',
						value,
					);
					break;

				case 'colormag_off_canvas_padding':
					css = colormagGenerateDimensionCSS(
						'.cm-header-builder .cm-header-off-canvas',
						'padding',
						value,
					);
					break;

				case 'colormag_off_canvas_width':
					css = colormagGenerateSliderCSS(
						'.cm-header-builder .cm-header-off-canvas',
						'width',
						value,
					);
					break;

				case 'colormag_off_canvas_text_color':
					css = colormagGenerateCommonCSS(
						'.cm-header-builder .cm-off-canvas-toggle-text',
						'color',
						value,
					);
					break;

				case 'colormag_off_canvas_button_padding':
					css = colormagGenerateDimensionCSS(
						'.cm-header-builder .cm-off-canvas-toggle',
						'padding',
						value,
					);
					break;

				case 'colormag_off_canvas_border_width':
					css = colormagGenerateSliderCSS(
						'.cm-header-builder .cm-off-canvas-toggle',
						'border-width',
						value,
					);
					break;

				case 'colormag_off_canvas_border_radius':
					css = colormagGenerateSliderCSS(
						'.cm-header-builder .cm-off-canvas-toggle',
						'border-radius',
						value,
					);
					break;

				case 'colormag_off_canvas_border_color':
					css = colormagGenerateCommonCSS(
						'.cm-header-builder .cm-off-canvas-toggle',
						'border-color',
						value,
					);
					break;

				case 'colormag_off_canvas_button_background':
					css = colormagGenerateBackgroundCSS(
						'.cm-header-builder .cm-off-canvas-toggle',
						value,
					);
					break;

				case 'colormag_header_mobile_menu_item_color':
					css = colormagGenerateCommonCSS(
						'.cm-header-builder .cm-mobile-nav ul li a',
						'color',
						value,
					);
					break;

				case 'colormag_header_mobile_menu_item_hover_color':
					css = colormagGenerateCommonCSS(
						'.cm-header-builder .cm-mobile-nav ul li:hover a',
						'color',
						value,
					);
					break;

				case 'colormag_post_title_color':
					css = colormagGenerateCommonCSS(
						'.post .cm-entry-title, .cm-posts .post .cm-post-content .cm-entry-title a, .cm-posts .post .single-title-above .cm-entry-title a',
						'color',
						value,
					);
					break;

				case 'colormag_comment_title_typography':
					css = colormagGenerateTypographyCSS(
						id,
						'.comments-area .comments-title, .comment-reply-title, #respond h3#reply-title',
						value,
					);
					break;

				case 'colormag_post_meta_color':
					css = colormagGenerateCommonCSS('body', '--color--gray', value);
					break;

				case 'colormag_post_meta_typography':
					css = colormagGenerateTypographyCSS(
						id,
						`.cm-posts .post .cm-post-content .human-diff-time .human-diff-time-display,\n" +
						.cm-posts .post .cm-post-content .cm-below-entry-meta .cm-post-date a,
						.cm-posts .post .cm-post-content .cm-below-entry-meta .cm-author,
						.cm-posts .post .cm-post-content .cm-below-entry-meta .cm-author a,
						.cm-posts .post .cm-post-content .cm-below-entry-meta .cm-post-views a,
						.cm-posts .post .cm-post-content .cm-below-entry-meta .cm-tag-links a,
						.cm-posts .post .cm-post-content .cm-below-entry-meta .cm-comments-link a,
						.cm-posts .post .cm-post-content .cm-below-entry-meta .cm-edit-link a,
						.cm-posts .post .cm-post-content .cm-below-entry-meta .cm-edit-link i,
						.cm-posts .post .cm-post-content .cm-below-entry-meta .cm-post-views,
						.cm-posts .post .cm-post-content .cm-below-entry-meta .cm-reading-time,
						.cm-posts .post .cm-post-content .cm-below-entry-meta .cm-reading-time::before`,
						value,
					);
					break;

				case 'colormag_page_title_color':
					css = colormagGenerateCommonCSS(
						'.type-page .cm-entry-title, .type-page .cm-entry-title a',
						'color',
						value,
					);
					break;

				case 'colormag_page_title_typography':
					css = colormagGenerateTypographyCSS(
						id,
						'.type-page .cm-entry-title',
						value,
					);
					break;

				case 'colormag_upper_footer_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer .cm-upper-footer-cols .cm-entry-title a',
						'color',
						value,
					);
					break;

				case 'colormag_footer_widget_title_typography':
					css = colormagGenerateTypographyCSS(
						id,
						'.cm-footer-cols .cm-row .cm-widget-title span',
						value,
					);
					break;

				case 'colormag_footer_widget_content_typography':
					css = colormagGenerateTypographyCSS(
						id,
						'#cm-footer, #cm-footer p, #cm-footer .cm-lower-footer-cols',
						value,
					);
					break;
				//
				// 				case "colormag_footer_column_widget_link_color":
				// 					css = colormagGenerateCommonCSS(
				// 						".cm-footer .cm-footer-cols a, .cm-footer-col .widget ul a",
				// 						"color",
				// 						value,
				// 					);
				// 					break;
				//
				// 				case "colormag_footer_column_widget_link_hover_color":
				// 					css = colormagGenerateCommonCSS(
				// 						".cm-footer .cm-footer-cols a:hover, .cm-footer-col .widget ul a:hover, .cm-footer .cm-footer-cols a:focus",
				// 						"color",
				// 						value,
				// 					);
				// 					break;
				//
				// 				case "colormag_footer_widgets_title_color":
				// 					css = colormagGenerateCommonCSS(
				// 						".cm-footer .cm-footer-cols .widget-title, .cm-footer-cols h1, .cm-footer-cols h2, .cm-footer-cols h3, .cm-footer-cols h4, .cm-footer-cols h5, .cm-footer-cols h6",
				// 						"color",
				// 						value,
				// 					);
				// 					break;
				//
				// 				case "colormag_footer_widgets_item_border_bottom_width":
				// 					css = colormagGenerateSliderCSS(
				// 						".cm-footer-cols ul li, .cm-footer-builder .cm-footer-main-row ul li",
				// 						"border-bottom-width",
				// 						value,
				// 					);
				// 					break;
				//
				// 				case "colormag_footer_widgets_item_border_bottom_color":
				// 					css = colormagGenerateCommonCSS(
				// 						".cm-footer-cols ul li, .cm-footer-builder .cm-footer-main-row ul li",
				// 						"border-bottom-color",
				// 						value,
				// 					);
				// 					break;
				//
				// 				case "colormag_footer_bar_background":
				// 					css = colormagGenerateBackgroundCSS(".cm-footer-bar", value);
				// 					break;
				//
				// 				case "colormag_footer_bar_border_top_width":
				// 					css = colormagGenerateSliderCSS(
				// 						".cm-footer-bar",
				// 						"border-top-width",
				// 						value,
				// 					);
				// 					break;
				//
				// 				case "colormag_footer_bar_border_top_color":
				// 					css = colormagGenerateCommonCSS(
				// 						".cm-footer-bar",
				// 						"border-top-color",
				// 						value,
				// 					);
				// 					break;
				//
				// 				case "colormag_footer_bar_text_color":
				// 					css = colormagGenerateCommonCSS(".cm-footer-bar", "color", value);
				// 					break;
				//
				// 				case "colormag_footer_bar_link_color":
				// 					css = colormagGenerateCommonCSS(".cm-footer-bar a", "color", value);
				// 					break;
				//
				// 				case "colormag_footer_bar_link_hover_color":
				// 					css = colormagGenerateCommonCSS(
				// 						".cm-footer-bar a:hover, .cm-footer-bar a:focus",
				// 						"color",
				// 						value,
				// 					);
				// 					break;

				case 'colormag_scroll_to_top_background':
					css = colormagGenerateCommonCSS(
						'#scroll-up i.fa',
						'background-color',
						value,
					);
					break;

				case 'colormag_scroll_to_top_hover_background':
					css = colormagGenerateCommonCSS(
						'#scroll-up i.fa:hover',
						'background-color',
						value,
					);
					break;

				case 'colormag_scroll_to_top_icon_color':
					css = colormagGenerateCommonCSS(
						'a#scroll-up i:before',
						'color',
						value,
					);
					break;

				case 'colormag_scroll_to_top_icon_hover_color':
					css = colormagGenerateCommonCSS(
						'a#scroll-up:hover > i:before',
						'color',
						value,
					);
					break;

				case 'colormag_header_button_color':
					css = colormagGenerateCommonCSS(
						'.cm-header-builder .cm-header-buttons .cm-header-button .cm-button',
						'color',
						value,
					);
					break;

				case 'colormag_header_button_hover_color':
					css = colormagGenerateCommonCSS(
						'.cm-header-builder .cm-header-buttons .cm-header-button .cm-button:hover',
						'color',
						value,
					);
					break;

				case 'colormag_header_button_background_color':
					css = colormagGenerateCommonCSS(
						'.cm-header-builder .cm-header-buttons .cm-header-button .cm-button',
						'background-color',
						value,
					);
					break;

				case 'colormag_header_button_background_hover_color':
					css = colormagGenerateCommonCSS(
						'.cm-header-builder .cm-header-buttons .cm-header-button .cm-button:hover',
						'background-color',
						value,
					);
					break;

				case 'colormag_header_button_padding':
					css = colormagGenerateDimensionCSS(
						'.cm-header-builder .cm-header-buttons .cm-header-button .cm-button',
						'padding',
						value,
					);
					break;

				case 'colormag_header_button_border_radius':
					css = colormagGenerateSliderCSS(
						'.cm-header-builder .cm-header-buttons .cm-header-button .cm-button',
						'border-radius',
						value,
					);
					break;

				case 'colormag_header_button_border_width':
					css = colormagGenerateDimensionCSS(
						'.cm-header-builder .cm-header-buttons .cm-header-button .cm-button',
						'border-width',
						value,
					);
					break;

				case 'colormag_header_button_border_color':
					css = colormagGenerateCommonCSS(
						'.cm-header-builder .cm-header-buttons .cm-header-button .cm-button',
						'border-color',
						value,
					);
					break;

				case 'colormag_footer_button_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .cm-footer-buttons .cm-footer-button .cm-button',
						'color',
						value,
					);
					break;

				case 'colormag_footer_button_hover_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .cm-footer-buttons .cm-footer-button .cm-button:hover',
						'color',
						value,
					);
					break;

				case 'colormag_footer_button_background_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .cm-footer-buttons .cm-footer-button .cm-button',
						'background-color',
						value,
					);
					break;

				case 'colormag_footer_button_background_hover_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .cm-footer-buttons .cm-footer-button .cm-button:hover',
						'background-color',
						value,
					);
					break;

				case 'colormag_footer_button_padding':
					css = colormagGenerateDimensionCSS(
						'.cm-footer-builder .cm-footer-buttons .cm-footer-button .cm-button',
						'padding',
						value,
					);
					break;

				case 'colormag_footer_button_border_radius':
					css = colormagGenerateSliderCSS(
						'.cm-footer-builder .cm-footer-buttons .cm-footer-button .cm-button',
						'border-radius',
						value,
					);
					break;

				case 'colormag_footer_button_border_width':
					css = colormagGenerateDimensionCSS(
						'.cm-footer-builder .cm-footer-buttons .cm-footer-button .cm-button',
						'border-width',
						value,
					);
					break;

				case 'colormag_footer_button_border_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .cm-footer-buttons .cm-footer-button .cm-button',
						'border-color',
						value,
					);
					break;

				case 'colormag_header_top_area_height':
					css = colormagGenerateSliderCSS(
						'.cm-header-builder .cm-top-row',
						'height',
						value,
					);
					break;

				case 'colormag_header_top_area_container':
					css = colormagGenerateSliderCSS(
						'.cm-header-builder .cm-header-top-row .cm-container',
						'max-width',
						value,
					);
					break;

				case 'colormag_header_top_area_background':
					css = colormagGenerateBackgroundCSS(
						'.cm-header-builder .cm-header-top-row',
						value,
					);
					break;

				case 'colormag_header_top_area_padding':
					css = colormagGenerateDimensionCSS(
						'.cm-header-builder .cm-header-top-row',
						'padding',
						value,
					);
					break;

				case 'colormag_header_top_area_border_width':
					css = colormagGenerateDimensionCSS(
						'.cm-header-builder .cm-header-top-row',
						'border-width',
						value,
					);
					css += colormagGenerateCommonCSS(
						'.cm-header-builder .cm-header-top-row',
						'border-style',
						'solid',
					);
					break;

				case 'colormag_header_top_area_border_color':
					css = colormagGenerateCommonCSS(
						'.cm-header-builder .cm-header-top-row',
						'border-color',
						value,
					);
					break;

				case 'colormag_header_top_area_color':
					css = colormagGenerateCommonCSS(
						'.cm-header-builder .cm-header-top-row',
						'color',
						value,
					);
					break;

				case 'colormag_header_main_area_height':
					css = colormagGenerateSliderCSS(
						'.cm-header-builder .cm-main-row',
						'height',
						value,
					);
					break;

				case 'colormag_header_main_area_container':
					css = colormagGenerateSliderCSS(
						'.cm-header-builder .cm-header-main-row .cm-container',
						'max-width',
						value,
					);
					break;

				case 'colormag_header_main_area_background':
					css = colormagGenerateBackgroundCSS(
						'.cm-header-builder .cm-header-main-row',
						value,
					);
					break;

				case 'colormag_header_main_area_padding':
					css = colormagGenerateDimensionCSS(
						'.cm-header-builder .cm-header-main-row',
						'padding',
						value,
					);
					break;

				case 'colormag_header_main_area_margin':
					css = colormagGenerateDimensionCSS(
						'.cm-header-builder .cm-header-main-row',
						'margin',
						value,
					);
					break;

				case 'colormag_header_main_area_border_width':
					css = colormagGenerateDimensionCSS(
						'.cm-header-builder .cm-header-main-row',
						'border-width',
						value,
					);
					css += colormagGenerateCommonCSS(
						'.cm-header-builder .cm-header-main-row',
						'border-style',
						'solid',
					);
					break;

				case 'colormag_header_main_area_border_color':
					css = colormagGenerateCommonCSS(
						'.cm-header-builder .cm-header-main-row',
						'border-color',
						value,
					);
					break;

				case 'colormag_header_main_area_color':
					css = colormagGenerateCommonCSS(
						'.cm-header-builder .cm-header-main-row',
						'color',
						value,
					);
					break;

				case 'colormag_header_bottom_area_height':
					css = colormagGenerateSliderCSS(
						'.cm-header-builder .cm-bottom-row',
						'height',
						value,
					);
					break;

				case 'colormag_header_bottom_area_container':
					css = colormagGenerateSliderCSS(
						'.cm-header-builder .cm-header-bottom-row .cm-container',
						'max-width',
						value,
					);
					break;

				case 'colormag_header_bottom_area_background':
					css = colormagGenerateBackgroundCSS(
						'.cm-header-builder .cm-header-bottom-row',
						value,
					);
					break;

				case 'colormag_header_bottom_area_padding':
					css = colormagGenerateDimensionCSS(
						'.cm-header-builder .cm-header-bottom-row',
						'padding',
						value,
					);
					break;

				case 'colormag_header_bottom_area_margin':
					css = colormagGenerateDimensionCSS(
						'.cm-header-builder .cm-header-bottom-row',
						'margin',
						value,
					);
					break;

				case 'colormag_header_bottom_area_border_width':
					css = colormagGenerateDimensionCSS(
						'.cm-header-builder .cm-header-bottom-row, .cm-header-builder .cm-mobile-row .cm-header-bottom-row',
						'border-width',
						value,
					);
					css += colormagGenerateCommonCSS(
						'.cm-header-builder .cm-header-bottom-row, .cm-header-builder .cm-mobile-row .cm-header-bottom-row',
						'border-style',
						'solid',
					);
					break;

				case 'colormag_header_bottom_area_border_color':
					css = colormagGenerateCommonCSS(
						'.cm-header-builder .cm-header-bottom-row, .cm-header-builder .cm-mobile-row .cm-header-bottom-row',
						'border-color',
						value,
					);
					break;

				case 'colormag_header_bottom_area_color':
					css = colormagGenerateCommonCSS(
						'.cm-header-builder .cm-header-bottom-row',
						'color',
						value,
					);
					break;

				case 'colormag_header_search_icon_color':
					css = colormagGenerateCommonCSS(
						'.cm-header-builder .cm-top-search .search-top::before, .cm-header-builder .cm-search-box .search-wrap .search-icon::before',
						'color',
						value,
					);
					break;

				case 'colormag_header_search_icon_hover_color':
					css = colormagGenerateCommonCSS(
						'.cm-header-builder .cm-top-search:hover > .search-top::before, .cm-header-builder .cm-search-box .search-wrap:hover > .search-icon::before',
						'color',
						value,
					);
					break;

				case 'colormag_header_search_text_color':
					css = colormagGenerateCommonCSS(
						'.cm-header-builder .cm-top-search .search-form-top input, .cm-header-builder .cm-search-box input',
						'color',
						value,
					);
					break;

				case 'colormag_header_search_background':
					css = colormagGenerateCommonCSS(
						'.cm-header-builder .cm-top-search .search-form-top input, .cm-header-builder .cm-top-search .search-form-top',
						'background-color',
						value,
					);
					css += colormagGenerateCommonCSS(
						'.cm-header-builder .search-form-top.show::before',
						'border-bottom-color',
						value,
					);
					break;

				case 'colormag_header_search_button_background':
					css = colormagGenerateCommonCSS(
						'.cm-header-builder .fa.search-top, .cm-header-builder .search-wrap button',
						'background-color',
						value,
					);
					css += colormagGenerateCommonCSS(
						'.cm-header-builder .fa.search-top, .cm-header-builder .search-wrap button',
						'border-color',
						value,
					);
					break;

				case 'colormag_header_search_button_hover_background':
					css = colormagGenerateCommonCSS(
						'.cm-header-builder .fa.search-top:hover, .cm-header-builder .search-wrap button:hover',
						'background-color',
						value,
					);
					css += colormagGenerateCommonCSS(
						"'.cm-header-builder .fa.search-top:hover, .cm-header-builder .search-wrap button:hover'",
						'border-color',
						value,
					);
					break;

				case 'colormag_header_random_icon_color':
					css = colormagGenerateCommonCSS(
						'.cm-header-builder .cm-random-post .cm-icon--random-fill',
						'fill',
						value,
					);
					break;

				case 'colormag_breadcrumb_separator_icon_color':
					css = colormagGenerateCommonCSS('.trail-separator i', 'color', value);
					break;

				case 'colormag_breadcrumb_label_color':
					css = colormagGenerateCommonCSS('.breadcrumb-title', 'color', value);
					break;

				case 'colormag_breadcrumb_link_color':
					css = colormagGenerateCommonCSS('.trail-items a', 'color', value);
					break;

				case 'colormag_breadcrumb_active_color':
					css = colormagGenerateCommonCSS(
						'.trail-items .trail-item span span',
						'color',
						value,
					);
					break;

				case 'colormag_header_random_icon_hover_color':
					css = colormagGenerateCommonCSS(
						'.cm-header-builder .cm-random-post:hover .cm-icon--random-fill',
						'fill',
						value,
					);
					break;

				case 'colormag_header_random_icon_size':
					css = colormagGenerateSliderCSS(
						'.cm-header-builder .cm-random-post .cm-icon--random-fill',
						'font-size',
						value,
					);
					break;

				case 'colormag_header_home_icon_color':
					css = colormagGenerateCommonCSS(
						'.cm-header-builder .cm-home-icon .cm-icon--home',
						'fill',
						value,
					);
					break;

				case 'colormag_top_bar_border_bottom_color':
					css = colormagGenerateCommonCSS(
						'.cm-top-bar',
						'border-bottom-color',
						value,
					);
					break;

				case 'colormag_top_bar_text_color':
					css = colormagGenerateCommonCSS(
						'.cm-top-bar, .date-in-header',
						'color',
						value,
					);
					break;

				case 'colormag_top_bar_label_color':
					css = colormagGenerateCommonCSS(
						'.breaking-news-latest',
						'color',
						value,
					);
					break;

				case 'colormag_top_bar_link_color':
					css = colormagGenerateCommonCSS('.cm-top-bar a', 'color', value);
					break;

				case 'colormag_top_bar_link_hover_color':
					css = colormagGenerateCommonCSS(
						'.cm-top-bar a:hover',
						'color',
						value,
					);
					break;

				case 'colormag_news_ticker_label_typography':
					css = colormagGenerateTypographyCSS(
						id,
						'.breaking-news .breaking-news-latest',
						value,
					);
					break;

				case 'colormag_news_ticker_label_background':
					css = colormagGenerateCommonCSS(
						'.breaking-news-latest',
						'background-color',
						value,
					);
					break;

				case 'colormag_news_ticker_label_background':
					css = colormagGenerateCommonCSS(
						'.cm-top-bar .breaking-news',
						'background-color',
						value,
					);
					break;

				case 'colormag_news_ticker_content_typography':
					css = colormagGenerateTypographyCSS(
						id,
						'.breaking-news ul li a',
						value,
					);
					break;

				case 'colormag_news_ticker_background':
					css = colormagGenerateCommonCSS(
						'.cm-top-bar .breaking-news',
						'background-color',
						value,
					);
					break;

				case 'colormag_footer_top_area_height':
					css = colormagGenerateSliderCSS(
						'.cm-footer-builder .cm-top-row',
						'height',
						value,
					);
					break;

				case 'colormag_footer_top_area_container':
					css = colormagGenerateSliderCSS(
						'.cm-footer-builder .cm-footer-top-row .cm-container',
						'max-width',
						value,
					);
					break;

				case 'colormag_footer_top_area_background':
					css = colormagGenerateBackgroundCSS(
						'.cm-footer-builder .cm-footer-top-row',
						value,
					);
					break;

				case 'colormag_footer_top_area_padding':
					css = colormagGenerateDimensionCSS(
						'.cm-footer-builder .cm-footer-top-row',
						'padding',
						value,
					);
					break;

				case 'colormag_footer_top_area_margin':
					css = colormagGenerateDimensionCSS(
						'.cm-footer-builder .cm-footer-top-row',
						'margin',
						value,
					);
					break;

				case 'colormag_footer_top_area_border_width':
					css = colormagGenerateDimensionCSS(
						'.cm-footer-builder .cm-footer-top-row',
						'border-width',
						value,
					);
					css += colormagGenerateCommonCSS(
						'.cm-footer-builder .cm-footer-top-row',
						'border-style',
						'solid',
					);
					break;

				case 'colormag_footer_top_area_border_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .cm-footer-top-row',
						'border-color',
						value,
					);
					break;

				case 'colormag_footer_main_area_height':
					css = colormagGenerateSliderCSS(
						'.cm-footer-builder .cm-main-row',
						'height',
						value,
					);
					break;

				case 'colormag_footer_main_area_container':
					css = colormagGenerateSliderCSS(
						'.cm-footer-builder .cm-footer-main-row .cm-container',
						'max-width',
						value,
					);
					break;

				case 'colormag_footer_main_area_background':
					css = colormagGenerateBackgroundCSS(
						'.cm-footer-builder .cm-footer-main-row',
						value,
					);
					break;

				case 'colormag_footer_main_area_padding':
					css = colormagGenerateDimensionCSS(
						'.cm-footer-builder .cm-footer-main-row',
						'padding',
						value,
					);
					break;

				case 'colormag_footer_main_area_margin':
					css = colormagGenerateDimensionCSS(
						'.cm-footer-builder .cm-footer-main-row',
						'margin',
						value,
					);
					break;

				case 'colormag_footer_main_area_border_width':
					css = colormagGenerateDimensionCSS(
						'.cm-footer-builder .cm-footer-main-row',
						'border-width',
						value,
					);
					css += colormagGenerateCommonCSS(
						'.cm-footer-builder .cm-footer-main-row',
						'border-style',
						'solid',
					);
					break;

				case 'colormag_footer_main_area_border_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .cm-footer-main-row',
						'border-color',
						value,
					);
					break;

				case 'colormag_footer_bottom_area_height':
					css = colormagGenerateSliderCSS(
						'.cm-footer-builder .cm-bottom-row',
						'height',
						value,
					);
					break;

				case 'colormag_footer_bottom_area_container':
					css = colormagGenerateSliderCSS(
						'.cm-footer-builder .cm-footer-bottom-row .cm-container',
						'max-width',
						value,
					);
					break;

				case 'colormag_footer_bottom_area_background':
					css = colormagGenerateBackgroundCSS(
						'.cm-footer-builder .cm-footer-bottom-row',
						value,
					);
					break;

				case 'colormag_footer_bottom_area_padding':
					css = colormagGenerateDimensionCSS(
						'.cm-footer-builder .cm-footer-bottom-row',
						'padding',
						value,
					);
					break;

				case 'colormag_footer_bottom_area_margin':
					css = colormagGenerateDimensionCSS(
						'.cm-footer-builder .cm-footer-bottom-row',
						'margin',
						value,
					);
					break;

				case 'colormag_footer_bottom_area_border_width':
					css = colormagGenerateDimensionCSS(
						'.cm-footer-builder .cm-footer-bottom-row',
						'border-width',
						value,
					);
					css += colormagGenerateCommonCSS(
						'.cm-footer-builder .cm-footer-bottom-row',
						'border-style',
						'solid',
					);
					break;

				case 'colormag_footer_bottom_area_border_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .cm-footer-bottom-row',
						'border-color',
						value,
					);
					break;

				case 'colormag_site_title_color':
					css = colormagGenerateCommonCSS('.cm-site-title a', 'color', value);
					break;

				case 'colormag_site_title_hover_color':
					css = colormagGenerateCommonCSS(
						'.cm-site-title a:hover',
						'color',
						value,
					);
					break;

				case 'colormag_site_title_typography':
					css = colormagGenerateTypographyCSS(id, '.cm-site-title', value);
					break;

				case 'colormag_breadcrumb_typography':
					css = colormagGenerateTypographyCSS(
						id,
						'.breadcrumb-trail .breadcrumb-title, .breadcrumb-title li a, .breadcrumb-trail li span',
						value,
					);
					break;

				case 'colormag_site_tagline_color':
					css = colormagGenerateCommonCSS(
						'.cm-site-description',
						'color',
						value,
					);
					break;

				case 'colormag_site_tagline_typography':
					css = colormagGenerateTypographyCSS(
						id,
						'.cm-site-description',
						value,
					);
					break;

				case 'colormag_widget_1_title_color':
					css = colormagGenerateCommonCSS(
						'.cm-header-builder .widget.widget-colormag_header_sidebar .widget-title',
						'color',
						value,
					);
					break;

				case 'colormag_widget_1_title_typography':
					css = colormagGenerateTypographyCSS(
						id,
						'.cm-header-builder .widget.widget-colormag_header_sidebar .widget-title',
						value,
					);
					break;

				case 'colormag_widget_1_content_color':
					css = colormagGenerateCommonCSS(
						'.cm-header-builder .widget.widget-colormag_header_sidebar',
						'color',
						value,
					);
					break;

				case 'colormag_widget_1_link_color':
					css = colormagGenerateCommonCSS(
						'.cm-header-builder .widget.widget-colormag_header_sidebar a,.mzb-news-ticker .mzb-news-ticker-box ul li a',
						'color',
						value,
					);
					break;

				case 'colormag_widget_1_content_typography':
					css = colormagGenerateTypographyCSS(
						id,
						'.cm-header-builder .widget.widget-colormag_header_sidebar',
						value,
					);
					break;

				case 'colormag_widget_2_title_color':
					css = colormagGenerateCommonCSS(
						'.cm-header-builder .widget.widget-header-sidebar-2 .widget-title',
						'color',
						value,
					);
					break;

				case 'colormag_widget_2_title_typography':
					css = colormagGenerateTypographyCSS(
						id,
						'.cm-header-builder .widget.widget-header-sidebar-2 .widget-title',
						value,
					);
					break;

				case 'colormag_widget_2_content_color':
					css = colormagGenerateCommonCSS(
						'.cm-header-builder .widget.widget-header-sidebar-2',
						'color',
						value,
					);
					break;

				case 'colormag_widget_2_link_color':
					css = colormagGenerateCommonCSS(
						'.cm-header-builder .widget.widget-header-sidebar-2 a',
						'color',
						value,
					);
					break;

				case 'colormag_widget_2_content_typography':
					css = colormagGenerateTypographyCSS(
						id,
						'.cm-header-builder .widget.widget-header-sidebar-2',
						value,
					);
					break;

				case 'colormag_footer_top_area_widget_background':
					css = colormagGenerateBackgroundCSS(
						'.cm-footer-builder .cm-footer-top-row .widget',
						value,
					);
					break;

				case 'colormag_header_mobile_menu_background':
					css = colormagGenerateCommonCSS(
						'.cm-mobile-nav .cm-mobile-menu--open',
						'background-color',
						value,
					);
					break;

				case 'colormag_footer_html_1_text_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .cm-html-1 *',
						'color',
						value,
					);
					break;

				case 'colormag_footer_html_1_link_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .cm-html-1 a',
						'color',
						value,
					);
					break;

				case 'colormag_footer_html_1_link_hover_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .cm-html-1 a:hover',
						'color',
						value,
					);
					break;

				case 'colormag_footer_html_1_font_size':
					css = colormagGenerateSliderCSS(
						'.cm-footer-builder .cm-html-1 *',
						'font-size',
						value,
					);
					break;

				case 'colormag_footer_html_1_margin':
					css = colormagGenerateDimensionCSS(
						'.cm-footer-builder .cm-html-1',
						'margin',
						value,
					);
					break;

				case 'colormag_footer_widget_1_title_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .widget.widget-colormag_footer_sidebar_one_upper .widget-title',
						'color',
						value,
					);
					break;

				case 'colormag_footer_widget_1_title_typography':
					css = colormagGenerateTypographyCSS(
						id,
						'.cm-footer-builder .widget.widget-colormag_footer_sidebar_one_upper .widget-title',
						value,
					);
					break;

				case 'colormag_footer_widget_1_content_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .widget.widget-colormag_footer_sidebar_one_upper',
						'color',
						value,
					);
					break;

				case 'colormag_footer_widget_1_link_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .widget.widget-colormag_footer_sidebar_one_upper a',
						'color',
						value,
					);
					break;

				case 'colormag_footer_widget_1_link_hover_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .widget.widget-colormag_footer_sidebar_one_upper a:hover',
						'color',
						value,
					);
					break;

				case 'colormag_footer_widget_1_content_typography':
					css = colormagGenerateTypographyCSS(
						id,
						'.cm-footer-builder .widget.widget-colormag_footer_sidebar_one_upper',
						value,
					);
					break;

				case 'colormag_footer_widget_2_title_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .widget.widget-colormag_footer_sidebar_two_upper .widget-title',
						'color',
						value,
					);
					break;

				case 'colormag_footer_widget_2_title_typography':
					css = colormagGenerateTypographyCSS(
						id,
						'.cm-footer-builder .widget.widget-colormag_footer_sidebar_two_upper .widget-title',
						value,
					);
					break;

				case 'colormag_footer_widget_2_content_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .widget.widget-colormag_footer_sidebar_two_upper',
						'color',
						value,
					);
					break;

				case 'colormag_footer_widget_2_link_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .widget.widget-colormag_footer_sidebar_two_upper a',
						'color',
						value,
					);
					break;

				case 'colormag_footer_widget_2_link_hover_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .widget.widget-colormag_footer_sidebar_two_upper a:hover',
						'color',
						value,
					);
					break;

				case 'colormag_footer_widget_2_content_typography':
					css = colormagGenerateTypographyCSS(
						id,
						'.cm-footer-builder .widget.widget-colormag_footer_sidebar_two_upper',
						value,
					);
					break;

				case 'colormag_footer_widget_3_title_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .widget.widget-colormag_footer_sidebar_three_upper .widget-title',
						'color',
						value,
					);
					break;

				case 'colormag_footer_widget_3_title_typography':
					css = colormagGenerateTypographyCSS(
						id,
						'.cm-footer-builder .widget.widget-colormag_footer_sidebar_three_upper .widget-title',
						value,
					);
					break;

				case 'colormag_footer_widget_3_content_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .widget.widget-colormag_footer_sidebar_three_upper',
						'color',
						value,
					);
					break;

				case 'colormag_footer_widget_3_link_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .widget.widget-colormag_footer_sidebar_three_upper a',
						'color',
						value,
					);
					break;

				case 'colormag_footer_widget_3_link_hover_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .widget.widget-colormag_footer_sidebar_three_upper a:hover',
						'color',
						value,
					);
					break;

				case 'colormag_footer_widget_3_content_typography':
					css = colormagGenerateTypographyCSS(
						id,
						'.cm-footer-builder .widget.widget-colormag_footer_sidebar_three_upper',
						value,
					);
					break;

				case 'colormag_footer_widget_4_title_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .widget.widget-colormag_footer_sidebar_one .widget-title',
						'color',
						value,
					);
					break;

				case 'colormag_footer_widget_4_title_typography':
					css = colormagGenerateTypographyCSS(
						id,
						'.cm-footer-builder .widget.widget-colormag_footer_sidebar_one .widget-title',
						value,
					);
					break;

				case 'colormag_footer_widget_4_content_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .widget.widget-colormag_footer_sidebar_one',
						'color',
						value,
					);
					break;

				case 'colormag_footer_widget_4_link_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .widget.widget-colormag_footer_sidebar_one a',
						'color',
						value,
					);
					break;

				case 'colormag_footer_widget_4_link_hover_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .widget.widget-colormag_footer_sidebar_one a:hover',
						'color',
						value,
					);
					break;

				case 'colormag_footer_widget_4_content_typography':
					css = colormagGenerateTypographyCSS(
						id,
						'.cm-footer-builder .widget.widget-colormag_footer_sidebar_one',
						value,
					);
					break;

				case 'colormag_footer_widget_5_title_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .widget.widget-colormag_footer_sidebar_two .widget-title',
						'color',
						value,
					);
					break;

				case 'colormag_footer_widget_5_title_typography':
					css = colormagGenerateTypographyCSS(
						id,
						'.cm-footer-builder .widget.widget-colormag_footer_sidebar_two .widget-title',
						value,
					);
					break;

				case 'colormag_footer_widget_5_content_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .widget.widget-colormag_footer_sidebar_two',
						'color',
						value,
					);
					break;

				case 'colormag_footer_widget_5_link_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .widget.widget-colormag_footer_sidebar_two a',
						'color',
						value,
					);
					break;

				case 'colormag_footer_widget_5_link_hover_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .widget.widget-colormag_footer_sidebar_two a:hover',
						'color',
						value,
					);
					break;

				case 'colormag_footer_widget_5_content_typography':
					css = colormagGenerateTypographyCSS(
						id,
						'.cm-footer-builder .widget.widget-colormag_footer_sidebar_two',
						value,
					);
					break;

				case 'colormag_footer_widget_6_title_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .widget.widget-colormag_footer_sidebar_three .widget-title',
						'color',
						value,
					);
					break;

				case 'colormag_footer_widget_6_title_typography':
					css = colormagGenerateTypographyCSS(
						id,
						'.cm-footer-builder .widget.widget-colormag_footer_sidebar_three .widget-title',
						value,
					);
					break;

				case 'colormag_footer_widget_6_content_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .widget.widget-colormag_footer_sidebar_three',
						'color',
						value,
					);
					break;

				case 'colormag_footer_widget_6_link_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .widget.widget-colormag_footer_sidebar_three a',
						'color',
						value,
					);
					break;

				case 'colormag_footer_widget_6_link_hover_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .widget.widget-colormag_footer_sidebar_three a:hover',
						'color',
						value,
					);
					break;

				case 'colormag_footer_widget_6_content_typography':
					css = colormagGenerateTypographyCSS(
						id,
						'.cm-footer-builder .widget.widget-colormag_footer_sidebar_three',
						value,
					);
					break;

				case 'colormag_footer_widget_7_title_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .widget.widget-colormag_footer_sidebar_four .widget-title',
						'color',
						value,
					);
					break;

				case 'colormag_footer_widget_7_title_typography':
					css = colormagGenerateTypographyCSS(
						id,
						'.cm-footer-builder .widget.widget-colormag_footer_sidebar_four .widget-title',
						value,
					);
					break;

				case 'colormag_footer_widget_7_content_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .widget.widget-colormag_footer_sidebar_four',
						'color',
						value,
					);
					break;

				case 'colormag_footer_widget_7_link_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .widget.widget-colormag_footer_sidebar_four a',
						'color',
						value,
					);
					break;

				case 'colormag_footer_widget_7_link_hover_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .widget.widget-colormag_footer_sidebar_four a:hover',
						'color',
						value,
					);
					break;

				case 'colormag_footer_widget_7_content_typography':
					css = colormagGenerateTypographyCSS(
						id,
						'.cm-footer-builder .widget.widget-colormag_footer_sidebar_four',
						value,
					);
					break;

				case 'colormag_footer_menu_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .cm-footer-nav ul li a',
						'color',
						value,
					);
					break;

				case 'colormag_footer_menu_hover_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .cm-footer-nav ul li a:hover',
						'color',
						value,
					);
					break;

				case 'colormag_footer_menu_typography':
					css = colormagGenerateTypographyCSS(
						id,
						'.cm-footer-builder .cm-footer-nav ul li a',
						value,
					);
					break;

				case 'colormag_footer_copyright_text_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-bar-area .cm-footer-bar__2, .cm-footer-builder .cm-copyright',
						'color',
						value,
					);
					break;

				case 'colormag_footer_copyright_link_text_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-bar-area .cm-footer-bar__2 a',
						'color',
						value,
					);
					break;

				case 'colormag_footer_copyright_typography':
					css = colormagGenerateTypographyCSS(
						id,
						'.cm-footer-bar-area .cm-footer-bar__2, .cm-footer-builder .cm-copyright',
						value,
					);
					break;

				case 'colormag_container_width':
					css = colormagGenerateSliderCSS(
						'.inner-wrap, .cm-container',
						'max-width',
						value,
					);
					break;

				case 'colormag_header_site_logo_height':
					css = colormagGenerateSliderCSS(
						'.cm-header-builder .cm-site-branding img',
						'width',
						value,
					);
					break;

				case 'colormag_header_site_identity_color':
					css = colormagGenerateCommonCSS(
						'.cm-header-builder .cm-site-title a',
						'color',
						value,
					);
					break;

				case 'colormag_footer_site_identity_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .cm-footer-site-info .cm-footer-site-title a',
						'color',
						value,
					);
					break;

				case 'colormag_header_site_identity_hover_color':
					css = colormagGenerateCommonCSS(
						'.cm-header-builder .cm-site-title a:hover',
						'color',
						value,
					);
					break;

				case 'colormag_header_site_title_typography':
					css = colormagGenerateTypographyCSS(
						id,
						'.cm-header-builder .cm-site-title a',
						value,
					);
					break;

				case 'colormag_footer_site_title_typography':
					css = colormagGenerateTypographyCSS(
						id,
						'.cm-footer-builder .cm-footer-site-info .cm-footer-site-title a',
						value,
					);
					break;

				case 'colormag_header_site_tagline_color':
					css = colormagGenerateCommonCSS(
						'.cm-header-builder .cm-site-description ',
						'color',
						value,
					);
					break;

				case 'colormag_footer_site_tagline_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder p.cm-footer-tagline',
						'color',
						value,
					);
					break;

				case 'colormag_header_site_tagline_typography':
					css = colormagGenerateTypographyCSS(
						id,
						'.cm-header-builder .cm-site-description ',
						value,
					);
					break;

				case 'colormag_footer_site_tagline_typography':
					css = colormagGenerateTypographyCSS(
						id,
						'.cm-footer-builder p.cm-footer-tagline',
						value,
					);
					break;

				case 'colormag_widget_title_typography':
					css = colormagGenerateTypographyCSS(
						id,
						'.cm-secondary .cm-widget-title span, .cm-secondary .wp-block-heading, #cm-tertiary .cm-widget-title span, #cm-tertiary .wp-block-heading',
						value,
					);
					break;

				case 'colormag_footer_top_area_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .cm-footer-top-row',
						'color',
						value,
					);
					break;

				case 'colormag_footer_main_area_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .cm-footer-main-row',
						'color',
						value,
					);
					break;

				case 'colormag_footer_main_area_link_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .cm-footer-main-row a',
						'color',
						value,
					);
					break;

				case 'colormag_footer_main_area_link_hover_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .cm-footer-main-row a:hover',
						'color',
						value,
					);
					break;

				case 'colormag_footer_main_area_widget_title_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .cm-footer-main-row .widget-title, .cm-footer-builder .cm-footer-main-row h1, .cm-footer-builder .cm-footer-main-row h2, .cm-footer-builder .cm-footer-main-row h3, .cm-footer-builder .cm-footer-main-row h4, .cm-footer-builder .cm-footer-main-row h5, .cm-footer-builder .cm-footer-main-row h6',
						'color',
						value,
					);
					break;

				case 'colormag_sidebar_widget_title_color':
					css = colormagGenerateCommonCSS(
						'.cm-secondary .cm-widget-title span, .cm-secondary .wp-block-heading, #cm-tertiary .cm-widget-title span, #cm-tertiary .wp-block-heading',
						'color',
						value,
					);
					break;

				case 'colormag_top_bar_border_bottom_size':
					css = colormagGenerateSliderCSS(
						'.cm-top-bar',
						'border-bottom-width',
						value,
					);
					break;

				case 'colormag_footer_copyright_link_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .cm-copyright a',
						'color',
						value,
					);
					break;

				case 'colormag_footer_copyright_link_hover_color':
					css = colormagGenerateCommonCSS(
						'.cm-footer-builder .cm-copyright a:hover',
						'color',
						value,
					);
					break;

				case 'colormag_footer_copyright_margin':
					css = colormagGenerateDimensionCSS(
						'.cm-footer-builder .cm-copyright',
						'margin',
						value,
					);
					break;

				case 'colormag_widget_view_all_button_color':
					css = colormagGenerateCommonCSS(`.cm-view-all-link`, 'color', value);
					break;

				case 'colormag_widget_view_all_button_background':
					css = colormagGenerateCommonCSS(
						`.cm-view-all-link`,
						'background',
						value,
					);
					break;

				case 'colormag_widget_view_all_button_typography':
					css = colormagGenerateTypographyCSS(id, '.cm-view-all-link', value);
					break;

				case 'colormag_footer_bottom_inner_element_layout':
					css = colormagElementLayoutCSS(
						'.cm-footer-builder .cm-footer-bottom-row .cm-footer-col',
						'flex-direction',
						value,
					);
					break;

				case 'colormag_footer_main_inner_element_layout':
					css = colormagElementLayoutCSS(
						'.cm-footer-builder .cm-footer-main-row .cm-footer-col',
						'flex-direction',
						value,
					);
					break;

				case 'colormag_footer_top_inner_element_layout':
					css = colormagElementLayoutCSS(
						'.cm-footer-builder .cm-footer-top-row .cm-footer-col',
						'flex-direction',
						value,
					);
					break;

				case 'colormag_header_divider_1_color':
					css = colormagGenerateCommonCSS(
						`.cm-header-builder .cm-builder-divider-1`,
						'border-color',
						value,
					);
					break;

				case 'colormag_header_search_placeholder_color':
					css = colormagGenerateCommonCSS(
						'.search-wrap input::placeholder, .cm-search-icon-in-input-right .search-wrap i',
						'color',
						value,
					);
					css += colormagGenerateCommonCSS(
						'.cm-search-icon-in-input-right .search-wrap i',
						'fill',
						value,
					);
					break;

				case 'colormag_header_search_width':
					css = colormagGenerateSliderCSS(
						'.cm-search-icon-in-input-right .search-wrap, .cm-search-box .search-wrap',
						'width',
						value,
					);
					break;

				case 'colormag_header_search_border_width':
					css = colormagGenerateDimensionCSS(
						'.cm-search-icon-in-input-right .search-wrap input',
						'border-width',
						value,
					);
					break;

				case 'colormag_header_search_border_radius':
					css = colormagGenerateSliderCSS(
						'.cm-search-icon-in-input-right .search-wrap input',
						'border-radius',
						value,
					);
					break;

				case 'colormag_header_search_border_color':
					css = colormagGenerateCommonCSS(
						'.cm-search-icon-in-input-right .search-wrap input',
						'border-color',
						value,
					);
					break;

				case 'colormag_header_socials_color':
					css = colormagGenerateCommonCSS(
						'.cm-header-builder .header-social-icons a',
						'color',
						value,
					);
					break;

				case 'colormag_header_divider_1_style':
					css = colormagGenerateCommonCSS(
						`.cm-header-builder .cm-builder-divider-1`,
						'border-style',
						value,
					);
					break;

				case 'colormag_header_divider_1_margin':
					css = colormagGenerateDimensionCSS(
						`.cm-header-builder .cm-builder-divider-1`,
						'margin',
						value,
					);
					break;
			}
			return css;
		},
	);

	wp.hooks.addAction(
		'customind.change.colormag_color_palette',
		'customind',
		(...args) => {
			console.log(args);
		},
	);

	wp.hooks.addAction(
		'customind.change.colormag_container_layout',
		'customind',
		(layout) => {
			var site_layout = layout;

			if ('wide' === site_layout) {
				$('body').removeClass('boxed').addClass('wide');
			} else if ('boxed' === site_layout) {
				$('body').removeClass('wide').addClass('boxed');
			}
		},
	);

	wp.hooks.addAction(
		'customind.change.colormag_header_display_type',
		'customind',
		(layout) => {
			var display_type = layout;

			if (display_type === 'type_two') {
				$('body')
					.removeClass('header_display_type_two')
					.addClass('header_display_type_one');
			} else if (display_type === 'type_three') {
				$('body')
					.removeClass('header_display_type_one')
					.addClass('header_display_type_two');
			} else if (display_type === 'type_one') {
				$('body').removeClass(
					'header_display_type_one header_display_type_two',
				);
			}
		},
	);

	wp.hooks.addAction(
		'customind.change.colormag_footer_bar_alignment',
		'customind',
		(alignment) => {
			var alignment_type = alignment;

			if (alignment_type === 'left') {
				$('.cm-footer-bar')
					.removeClass('cm-footer-bar-style-2 cm-footer-bar-style-3')
					.addClass('cm-footer-bar-style-1');
			} else if (alignment_type === 'right') {
				$('.cm-footer-bar')
					.removeClass('cm-footer-bar-style-1 cm-footer-bar-style-3')
					.addClass('cm-footer-bar-style-2');
			} else if (alignment_type === 'center') {
				$('.cm-footer-bar')
					.removeClass('cm-footer-bar-style-1 cm-footer-bar-style-2')
					.addClass('cm-footer-bar-style-3');
			}
		},
	);

	wp.hooks.addAction(
		'customind.change.colormag_main_footer_layout',
		'customind',
		(layout) => {
			var display_type = layout;

			if (display_type === 'layout-2') {
				$('#cm-footer')
					.removeClass('colormag-footer--classic-bordered')
					.addClass('colormag-footer--classic');
			} else if (display_type === 'layout-3') {
				$('#cm-footer')
					.removeClass('colormag-footer--classic')
					.addClass('colormag-footer--classic-bordered');
			} else if (display_type === 'layout-1') {
				$('#cm-footer').removeClass(
					'colormag-footer--classic colormag-footer--classic-bordered',
				);
			}
		},
	);
})(jQuery);
