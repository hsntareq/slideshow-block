/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';
import metadata from './block.json';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadata.name, {
	/**
	 * @see ./edit.js
	 */
	// Set default attributes
	attributes: {
		apiPostUrl: {
			type: 'string',
			default: 'https://wptavern.com',
		},
		apiPostData: {
			type: 'array',
			default: [],
		},
		showThumb: {
			type: 'boolean',
			default: true,
		},
		showPostTitle: {
			type: 'boolean',
			default: true,
		},
		enableResponsive: {
			type: 'boolean',
			default: true,
		},
		showPostMeta: {
			type: 'boolean',
			default: true,
		},
		showPostContent: {
			type: 'boolean',
			default: true,
		},
		enableAutoplay: {
			type: 'boolean',
			default: true,
		},
		autoLoop: {
			type: 'boolean',
			default: true,
		},
		enablePagination: {
			type: 'boolean',
			default: true,
		},
		enableNavigation: {
			type: 'boolean',
			default: true,
		},
		enableMousewheel: {
			type: 'boolean',
			default: false,
		},
		slideItems: {
			type: 'number',
			default: 3,
		},
		scrollSpeed: {
			type: 'number',
			default: 500,
		},
		autoplayDelay: {
			type: 'number',
			default: 3000,
		},
	},
	edit: Edit,

	/**
	 * @see ./save.js
	 */
	save,
});
