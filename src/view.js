/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

import Swiper from 'swiper';
import { A11y, Autoplay, Mousewheel, Navigation, Pagination } from 'swiper/modules';

document.querySelectorAll('.swiper').forEach(function (el) {

	let slideItems = parseInt(el.dataset.slideitems, 10);
	let scrollSpeed = parseInt(el.dataset.scrollspeed);
	let autoplayDelay = parseInt(el.dataset.autoplaydelay, 10);
	let enableMousewheel = el.dataset.enablemousewheel === 'true';
	let enableNavigation = el.dataset.enablenavigation === 'true';
	let enablePagination = el.dataset.enablepagination === 'true';
	let enableResponsive = el.dataset.enableresponsive === 'true';
	let autoLoop = el.dataset.autoloop === 'true';
	let enableAutoplay = el.dataset.enableautoplay === 'true';
	let showPostContent = el.dataset.showpostcontent === 'true';
	let showPostMeta = el.dataset.showpostmeta === 'true';
	let showPostTitle = el.dataset.showposttitle === 'true';
	let showThumb = el.dataset.showthumb === 'true';


	console.log(slideItems, scrollSpeed, autoplayDelay, enableMousewheel, enableNavigation, enablePagination, autoLoop, enableAutoplay, showPostContent, showPostMeta, showPostTitle, showThumb);


	let swiperConfig = {};
	swiperConfig = {
		modules: [Navigation, Pagination, Mousewheel, A11y, Autoplay],
		spaceBetween: 20,
		slidesPerView: slideItems,
		navigation: {
			enabled: false,
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},

	};

	if (enableNavigation) {
		swiperConfig.navigation = {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		};
	}

	if (enablePagination) {
		swiperConfig.pagination = { clickable: true };
	}

	if (enableAutoplay) {
		swiperConfig.loop = autoLoop || true;
	}

	if (autoplayDelay) {
		swiperConfig.autoplay = { delay: autoplayDelay };
	}

	if (enableMousewheel) {
		swiperConfig.mousewheel = { forceToAxis: true };
	}

	if (enableResponsive) {
		swiperConfig.breakpoints = {
			320: {
				slidesPerView: 1,
				spaceBetween: 0
			},
			767: {
				slidesPerView: 2,
				spaceBetween: 40
			},
			1024: {
				slidesPerView: 3,
				spaceBetween: 40
			}
		};
	}

	new Swiper(el, swiperConfig);

});
