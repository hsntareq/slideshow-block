export function formatDateStringDetail(dateString) {
	const date = new Date(dateString);

	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
		timeZoneName: 'short',
	};

	return date.toLocaleDateString('en-US', options);
}

export function formatDateString(dateString) {
	const date = new Date(dateString);

	const options = {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
		timeZoneName: 'short',
	};

	const formattedDate = date.toLocaleDateString('en-US', options);
	const [month, day, year] = formattedDate.replace(/,/g, '').split(' ');

	return `${day} ${month}, ${year}`;

}

export function formatDaysAgo(dateString) {
	const currentDate = new Date();
	const inputDate = new Date(dateString);

	// Calculate the difference in milliseconds
	const timeDifference = currentDate - inputDate;

	// Convert milliseconds to days
	const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

	// Create the "days ago" string
	const daysAgoString = daysDifference === 1 ? '1 day ago' : `${daysDifference} days ago`;

	return daysAgoString;
}

export const fetchMediaDetails = async (url, mediaId) => {
	try {
		const mediaResponse = await fetch(`${url}/wp-json/wp/v2/media/${mediaId}`);
		const mediaResult = await mediaResponse.json();

		if (mediaResult.media_details && mediaResult.media_details.sizes) {
			const sizes = mediaResult.media_details.sizes;
			return {
				full: sizes.full ? sizes.full.source_url : '',
				medium: sizes.medium ? sizes.medium.source_url : '',
				thumb: sizes.thumbnail ? sizes.thumbnail.source_url : '',
			};
		} else {
			return {
				full: '',
				medium: '',
				thumb: '',
			};
		}
	} catch (error) {
		console.error('Error fetching media details from API', error);
		throw error;
	}
};

// Function to check if the URL is valid
export const isValidUrl = (url) => {
	const pattern = /^(https?:\/\/)/;
	return pattern.test(url);
};

export function stripTags(html) {
	return html.replace(/<\/?[^>]+(>|$)/g, "");
}


export const fetchAuthorInformation = async (userRestUrl) => {
	try {
		const authorResponse = await fetch(userRestUrl);
		const authorResult = await authorResponse.json();

		if (authorResult.id) {
			return {
				id: authorResult.id,
				name: authorResult.name,
				username: authorResult.username,
				email: authorResult.email,
			};
		} else {
			return {
				id: '',
				name: '',
				username: '',
				email: '',
			};
		}
	} catch (error) {
		console.error('Error fetching author details from API', error);
		throw error;
	}
};


