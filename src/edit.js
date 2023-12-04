/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { TextControl, Button, ToggleControl, CheckboxControl, PanelBody, RangeControl } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 * ${url}/wp-json/wp/v2/posts
 * @return {Element} Element to render.
 */

export default function Edit({ attributes, setAttributes }) {
	// Initialize URL from attributes
	const [inspectControlUrl, setInspectControlUrl] = useState(attributes.apiUrl);

	// Additional state for switch, checkbox, and range
	const [toggleValue, setToggleValue] = useState(attributes.toggleValue);
	const [checkboxValue, setCheckboxValue] = useState(attributes.checkboxValue);
	const [rangeValue, setRangeValue] = useState(attributes.rangeValue);

	// Additional state for API URL, new API URL, URL error, and post data
	const [apiUrl, setApiUrl] = useState(attributes.apiPostUrl);
	const [newApiUrl, setNewApiUrl] = useState(null);
	const [urlError, setUrlError] = useState('');
	const [postData, setPostData] = useState([]);
	const [isValidUrlMessage, setIsValidUrlMessage] = useState('');

	// Function to update inspectControlUrl
	const handleInspectControlUrlChange = (newUrl) => {
		setInspectControlUrl(newUrl);
	};

	// Functions to update switch, checkbox, and range
	const handleToggleChange = (value) => {
		setToggleValue(value);
	};

	const handleCheckboxChange = (value) => {
		setCheckboxValue(value);
	};

	const handleRangeChange = (value) => {
		setRangeValue(value);
	};

	// Function to update API URL and check validity
	const handleApiUrlChange = (newUrl) => {
		setNewApiUrl(newUrl);

		if (isValidUrl(newUrl)) {
			setIsValidUrlMessage('Valid URL');
		} else {
			setIsValidUrlMessage('Invalid URL. Please enter a URL starting with http:// or https://');
		}
	};

	// Function to handle button click
	const handleInspectControlButtonClick = () => {
		// Check if the URL is valid before updating attributes
		if (isValidUrl(newApiUrl || apiUrl)) {
			// Update the attributes with the new values
			setAttributes({
				apiUrl: inspectControlUrl,
				toggleValue,
				checkboxValue,
				rangeValue,
				apiPostUrl: newApiUrl || apiUrl, // Update the API URL if a new one is provided
			});
			// Fetch and update post data based on the updated API URL
			uploadMultiple(newApiUrl || apiUrl);
		} else {
			// Display an error message if the URL is not valid
			setUrlError('Invalid URL. Please enter a URL starting with http:// or https://');
		}
	};

	// Function to check if the URL is valid
	const isValidUrl = (url) => {
		const pattern = /^(https?:\/\/)/;
		return pattern.test(url);
	};

	// Function to fetch post data
	const uploadMultiple = async (url) => {
		try {
			const response = await fetch(`${url}/wp-json/wp/v2/posts`);
			const result = await response.json();
			setPostData(result);
			console.log("Success:", result);
		} catch (error) {
			console.error("Error:", error);
		}
	};

	const fetchMediaDetails = async (mediaId) => {
		try {
			const mediaResponse = await fetch(`${url}/wp-json/wp/v2/media/${mediaId}`);
			const mediaResult = await mediaResponse.json();
			setPostData(result);
			return mediaResult;
		} catch (error) {
			console.error('Error fetching media details from API', error);
			throw error;
		}
	};

	useEffect(() => {
		// Fetch post data on initial render
		uploadMultiple(apiUrl);
	}, [apiUrl]);

	const blockProps = useBlockProps({
		className: 'api-post-slider',
	});

	return (
		<div {...blockProps}>
			<h4 style={{ 'textAlign': 'center' }}>API Posts Slider</h4>
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
					<Button variant="secondary" onClick={handleInspectControlButtonClick}>Update Values</Button>
				</PanelBody>
			</InspectorControls>

			<Swiper
				modules={[Navigation, Pagination, Scrollbar, A11y]}
				spaceBetween={50}
				slidesPerView={3}
				navigation
				loop={true}
				pagination={{ clickable: true }}
				scrollbar={{ draggable: true }}
				onSwiper={(swiper) => console.log(swiper)}
				onSlideChange={() => console.log('slide change')}
			>
				{postData.map((slide, index) => (
					<SwiperSlide key={index}>
						<h4 style={{ 'fontSize': '20px' }}>
							<div dangerouslySetInnerHTML={{ __html: slide.title.rendered }} /></h4>
						<div dangerouslySetInnerHTML={{ __html: slide.excerpt.rendered }} />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}
