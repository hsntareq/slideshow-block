/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

// Import library functions
import { formatDateString } from './lib/functions';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save({ attributes }) {

	return (
		<div {...useBlockProps.save()}>
			<div className="api-post-slider">
				<div className="swiper"
					data-slideitems={attributes.slideItems}
					data-scrollspeed={attributes.scrollSpeed}
					data-autoplaydelay={attributes.autoplayDelay}
					data-enablemousewheel={attributes.enableMousewheel}
					data-enablenavigation={attributes.enableNavigation}
					data-enablepagination={attributes.enablePagination}
					data-autoloop={attributes.autoLoop}
					data-enableautoplay={attributes.enableAutoplay}
					data-enableresponsive={attributes.enableResponsive}
					data-showpostcontent={attributes.showPostContent}
					data-showpostmeta={attributes.showPostMeta}
					data-showposttitle={attributes.showPostTitle}
					data-showthumb={attributes.showThumb}>
					<div className="swiper-wrapper">
						{attributes.apiPostData.map((slide, index) => (
							<div key={index} className='swiper-slide'>
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
							</div>
						))}

					</div>

					<div className="swiper-pagination"></div>

					<div className="swiper-button-prev"></div>
					<div className="swiper-button-next"></div>

					<div className="swiper-scrollbar"></div>
				</div>
			</div>
		</div>

	);
}
