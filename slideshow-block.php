<?php
/**
 * Plugin Name:       Slideshow Block
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       slideshow-block
 *
 * @package           create-block
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */

$api_url = 'https://wptavern.com/wp-json/wp/v2/posts';

function slideshow_block_slideshow_block_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'slideshow_block_slideshow_block_block_init' );


add_action( 'rest_api_init', 'register_custom_endpoint' );

function register_custom_endpoint() {
	register_rest_route( 'wptavern/v1', '/get-post-data', array(
		'methods'  => 'GET',
		'callback' => 'get_post_data',
	) );
}

function get_post_data() {
	$api_url  = 'https://wptavern.com/wp-json/wp/v2/posts';
	$response = wp_remote_get( $api_url );

	// Check if the request was successful
	if ( is_wp_error( $response ) ) {
		return 'Error fetching posts';
	}

	// Decode the JSON response
	// $posts = json_decode( wp_remote_retrieve_body( $response ), true );

	return rest_ensure_response( wp_remote_retrieve_body($response) );
}

// add_action('enqueue_block_assets', 'enqueue_block_assets_scripts');
function enqueue_block_assets_scripts(){
	wp_enqueue_script(
		'wp-block-create-block-slideshow-block',
		plugins_url( 'build/index.js', __FILE__ ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-components', 'wp-data' ),
		filemtime( plugin_dir_path( __FILE__ ) . 'build/index.js' )
	);

	wp_localize_script(
		'wp-block-create-block-slideshow-block',
		'slideData',
		array(
			'adminAjaxUrl' => admin_url( 'admin-ajax.php' ),
		)
	);
}
/*
add_action( 'wp_ajax_my_ajax_action', 'my_ajax_action_callback' );
add_action( 'wp_ajax_nopriv_my_ajax_action', 'my_ajax_action_callback' ); // For non-logged-in
// Callback function to handle the AJAX request
function my_ajax_action_callback() {



	// wp_send_json( $_POST );

	// You can access data sent from the client-side using $_POST
	$some_data = isset( $_POST['someData'] ) ? sanitize_text_field( $_POST['someData'] ) : '';

	// Perform any server-side logic, such as fetching data
	$result = array(
		'message'  => 'Data fetched successfully!',
		'someData' => $some_data,
		// Include any other data you want to send back to the client
	);

	// Send the JSON-encoded response back to the client
	wp_send_json_success( $result );

	// Always exit to prevent further execution
	exit();
} */
/*
// Define the custom REST API endpoint for fetching posts
function custom_plugin_get_external_posts() {
	// Your logic to retrieve posts from the external source goes here
	$posts = array(); // Replace this with your actual data retrieval logic

	return rest_ensure_response( $posts );
}

// Register the custom endpoint
function custom_plugin_register_rest_route() {
	register_rest_route( 'custom-plugin/v1', '/external-posts/', array(
		'methods'  => 'GET',
		'callback' => 'custom_plugin_get_external_posts',
	) );
}

// Hook into WordPress to register the custom REST endpoint
add_action( 'rest_api_init', 'custom_plugin_register_rest_route' );



function localize_script_data() {
	wp_localize_script(
		'wp-block-create-block-slideshow-block',
		'slideData',
		array(
			'adminAjaxUrl' => admin_url( 'admin-ajax.php' ),
		)
	);
}
add_action( 'enqueue_block_editor_assets', 'localize_script_data' );

function custom_api_block_render_callback() {
	// $num_posts = isset( $attributes['numPosts'] ) ? intval( $attributes['numPosts'] ) : 5;

	// Make a request to the WP REST API to get the latest posts
	$api_url  = 'https://wptavern.com/wp-json/wp/v2/posts';
	$response = wp_remote_get( $api_url );

	// Check if the request was successful
	if ( is_wp_error( $response ) ) {
		return 'Error fetching posts';
	}

	// Decode the JSON response
	$posts = json_decode( wp_remote_retrieve_body( $response ), true );

	// Render the posts
	$output = '<ul>';
	foreach ( $posts as $post ) {
		$output .= '<li><a href="' . esc_url( $post['link'] ) . '">' . esc_html( $post['title']['rendered'] ) . '</a></li>';
	}
	$output .= '</ul>';

	return $output;
}
 */
