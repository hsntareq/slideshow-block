/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { Button, PanelBody, TextControl, ToggleControl } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';

import { A11y, Autoplay, Mousewheel, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';


// Import library functions
import {
	fetchAuthorInformation,
	fetchMediaDetails,
	formatDateString,
	isValidUrl,
} from './lib/functions';


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
// import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

export default function Edit({ attributes, setAttributes }) {
	// Define the initial state using the attributes passed from the editor
	const [inspectControlUrl, setInspectControlUrl] = useState(attributes.apiUrl);
	const [toggleValue, setToggleValue] = useState(attributes.toggleValue);
	const [checkboxValue, setCheckboxValue] = useState(attributes.checkboxValue);
	const [rangeValue, setRangeValue] = useState(attributes.rangeValue);
	const [apiUrl, setApiUrl] = useState(attributes.apiPostUrl);
	const [newApiUrl, setNewApiUrl] = useState(null);
	const [urlError, setUrlError] = useState('');
	const [postData, setPostData] = useState(attributes.apiPostData);
	const [isValidUrlMessage, setIsValidUrlMessage] = useState('');
	const [isLoading, setIsLoading] = useState(true);
	const [apiError, setApiError] = useState('');
	const [showApiError, setShowApiError] = useState(true);


	// Function to update the API URL in the InspectorControls component
	const handleInspectControlButtonClick = () => {
		setPostData([]);
		setIsLoading(true);

		if (newApiUrl && typeof newApiUrl === 'string' && newApiUrl.endsWith('/')) {
			setNewApiUrl(newApiUrl.replace(/\/$/, ''));
		}

		// if (newApiUrl.endsWith('/')) {
		// 	setNewApiUrl(newApiUrl.replace(/\/$/, ''));
		// }

		if (isValidUrl(newApiUrl || apiUrl)) {
			setAttributes({
				apiUrl: inspectControlUrl,
				toggleValue,
				checkboxValue,
				rangeValue,
				apiPostUrl: newApiUrl || apiUrl,
			});

			getExternalApiPosts(newApiUrl || apiUrl);
		} else {
			setUrlError('Invalid URL. Please enter a URL starting with http:// or https://');
		}
	};

	// Function to check if the URL is valid
	const handleApiUrlChange = (newUrl) => {

		setNewApiUrl(newUrl);

		if (isValidUrl(newUrl)) {
			setIsValidUrlMessage('Valid URL');
		} else {
			setIsValidUrlMessage('Invalid URL. Please enter a URL starting with http:// or https://');
		}
	};

	// Function to fetch post data from the API
	const getExternalApiPosts = async (url) => {
		try {
			setApiError('');
			setShowApiError(true);
			const response = await fetch(`${url}/wp-json/wp/v2/posts`);
			const result = await response.json();

			if (!response.ok) {
				setApiError('DRA: Only authenticated users can access the REST API.');
				setIsLoading(false);
				return;
			}

			if (result.code) {
				setApiError('DRA: Only authenticated users can access the REST API.');
				setIsLoading(false);
				return;
			}

			const mediaDetailsPromises = result.map(async (post) => {
				if (post.featured_media) {
					return fetchMediaDetails(url, post.featured_media);
				}
				return null;
			});

			const mediaDetails = await Promise.all(mediaDetailsPromises);
			const authorDetailsPromises = result.map(async (post) => {
				if (post._links && post._links.author) {
					return fetchAuthorInformation(post._links.author[0].href);
				}
				return null;
			});

			const authorDetails = await Promise.all(authorDetailsPromises);

			const updatedPostData = result.map((post, index) => {
				return {
					...post,
					featured_image: mediaDetails[index],
					author_data: authorDetails[index],
				};
			});

			setAttributes({ apiPostData: updatedPostData });
			setPostData(updatedPostData);
			setIsLoading(false);
		} catch (error) {
			console.error("Error:", error);
			setApiError('DRA: Only authenticated users can access the REST API.');
			setIsLoading(false);
		}
	};

	useEffect(() => {
		console.log(attributes);
		if (attributes.apiPostData.length > 0) {
			setIsLoading(false);
		}
		getExternalApiPosts(apiUrl);
	}, [apiUrl]);

	return (
		<div {...useBlockProps({
			className: 'api-post-slider',
		})}>
			<h2 className='api-post-title' style={{ 'textAlign': 'center' }}>API Posts Slider</h2>
			<InspectorControls>
				<PanelBody title="Slider Settings">
					<TextControl
						label="API URL"
						value={newApiUrl ?? apiUrl}
						onChange={handleApiUrlChange}
					/>
					<div style={{ color: isValidUrlMessage.includes('Invalid') ? 'red' : 'green' }}>
						{isValidUrlMessage}
					</div>
					{urlError && <div style={{ color: 'red' }}>{urlError}</div>}
					{apiError && showApiError && (
						<div style={{
							color: 'red',
							marginBlock: '10px',
							padding: '10px',
							backgroundColor: '#ffebee',
							borderRadius: '4px',
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center'
						}}>
							<span>{apiError}</span>
							<button
								onClick={() => setShowApiError(false)}
								style={{
									background: 'none',
									border: 'none',
									color: 'red',
									cursor: 'pointer',
									fontSize: '16px',
									padding: '0 5px'
								}}
							>
								✕
							</button>
						</div>
					)}
					<Button variant="secondary" onClick={handleInspectControlButtonClick}>Update Values</Button>
				</PanelBody>
				<PanelBody title="Show/Hide Items">
					<ToggleControl
						label="Show Thumbnail"
						checked={attributes.showThumb}
						onChange={() => setAttributes({ showThumb: !attributes.showThumb })}
					/>
					<ToggleControl
						label="Show Post Title"
						checked={attributes.showPostTitle}
						onChange={() => setAttributes({ showPostTitle: !attributes.showPostTitle })}
					/>
					<ToggleControl
						label="Show Post Meta"
						checked={attributes.showPostMeta}
						onChange={() => setAttributes({ showPostMeta: !attributes.showPostMeta })}
					/>
					<ToggleControl
						label="Show Post Content"
						checked={attributes.showPostContent}
						onChange={() => setAttributes({ showPostContent: !attributes.showPostContent })}
					/>
					{/* Add more ToggleControl components as needed */}
				</PanelBody>
				<PanelBody title="Numerical Settings">
					<TextControl
						label="Number of Slide Items"
						type="number"
						value={attributes.slideItems}
						onChange={(value) => setAttributes({ slideItems: parseInt(value) })}
					/>
					<ToggleControl
						label="Enable Responsive"
						checked={attributes.enableResponsive}
						onChange={() => setAttributes({ enableResponsive: !attributes.enableResponsive })}
					/>
					<ToggleControl
						label="Enable Infinite Loop"
						checked={attributes.autoLoop}
						onChange={() => setAttributes({ autoLoop: !attributes.autoLoop })}
					/>
					<TextControl
						label="Scroll Speed"
						type="number"
						value={attributes.scrollSpeed}
						onChange={(value) => setAttributes({ scrollSpeed: parseInt(value) })}
					/>
					<ToggleControl
						label="Enable Mousewheel"
						checked={attributes.enableMousewheel}
						onChange={() => setAttributes({ enableMousewheel: !attributes.enableMousewheel })}
					/>
					<ToggleControl
						label="Enable Navigation"
						checked={attributes.enableNavigation}
						onChange={() => setAttributes({ enableNavigation: !attributes.enableNavigation })}
					/>
					<ToggleControl
						label="Enable Pagination"
						checked={attributes.enablePagination}
						onChange={() => setAttributes({ enablePagination: !attributes.enablePagination })}
					/>
					<ToggleControl
						label="Enable Autoplay"
						checked={attributes.enableAutoplay}
						onChange={() => setAttributes({ enableAutoplay: !attributes.enableAutoplay })}
					/>
					{attributes.enableAutoplay &&
						<TextControl
							label="Autoplay Delay"
							type="number"
							value={attributes.autoplayDelay}
							onChange={(value) => setAttributes({ autoplayDelay: parseInt(value) })}
						/>
					}
					{/* Add more TextControl components as needed */}
				</PanelBody>
			</InspectorControls>

			{isLoading &&
				<div style={{ 'display': 'flex', 'justifyContent': 'center' }}>
					<div className="lds-ripple"><div></div><div></div></div>
				</div>
			}

			<Swiper
				modules={[Navigation, Pagination, Mousewheel, A11y, Autoplay]}
				spaceBetween={20}
				slidesPerView={attributes.slideItems}
				navigation={attributes.enableNavigation || false}
				autoplay={
					attributes.autoplay
						? { delay: attributes.autoplay.delay || 5000 }
						: false
				}
				mousewheel={attributes.enableMousewheel ? { forceToAxis: true } : false}
				loop={attributes.autoLoop || true}
				pagination={attributes.enablePagination ? { clickable: true } : false}
			>
				{postData.map((slide, index) => (
					<SwiperSlide key={index}>
						<div className='post-thumb'>
							{attributes.showThumb &&
								<a href={slide.link}>
									<img src={slide.featured_image.medium} alt="Medium Size" />
								</a>
							}
						</div>
						{(attributes.showPostMeta || attributes.showPostTitle || attributes.showPostContent) && (
							<div className='post-content'>
								{attributes.showPostMeta &&
									<p className='post-meta'>
										<span className='author'>
											👤 {slide.author_data.name}
										</span>
										<span className='date'>
											📅 {formatDateString(slide.date)}
										</span>
									</p>
								}
								{attributes.showPostTitle &&
									<h4><a href={slide.link} dangerouslySetInnerHTML={{ __html: slide.title.rendered }} /></h4>
								}
								{attributes.showPostContent &&
									<div dangerouslySetInnerHTML={{ __html: (slide.excerpt.rendered) }} />
								}
							</div>
						)}
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
