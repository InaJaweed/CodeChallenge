import { useEffect, useState } from 'react';

// Define the Media interface with properties for each media item
interface Media {
	id: number; // Unique identifier for the media item
	title: string; // Title of the movie or TV show
	type: 'Movie' | 'TV Show'; // Restrict type to either "Movie" or "TV Show"
}

// API endpoint where media data will be fetched from
const API_URL = 'http://localhost:5169/media';

// Component to display a list of media items
const MediaList = () => {
	// State to store the list of media items
	const [mediaList, setMediaList] = useState<Media[]>([]);

	// Function to fetch media data from the backend API
	const fetchMedia = async () => {
		try {
			const response = await fetch(API_URL); // Send a GET request to the API
			const data = await response.json(); // Convert response to JSON
			setMediaList(data); // Update the state with the fetched data
		} catch (error) {
			console.error('Error fetching media:', error); // Log errors if the request fails
		}
	};

	// useEffect to fetch media when the component mounts
	useEffect(() => {
		fetchMedia();
	}, []); // Empty dependency array ensures this runs only once

	return (
		<div>
			<h3>Media List</h3>
			{/* Table to display media items */}
			<table
				style={{
					border: '1px solid black',
					borderCollapse: 'collapse',
					width: '100%',
				}}
			>
				{/* Table header with column names */}
				<thead>
					<tr>
						<th style={{ border: '1px solid black', padding: '8px' }}>ID</th>
						<th style={{ border: '1px solid black', padding: '8px' }}>Title</th>
						<th style={{ border: '1px solid black', padding: '8px' }}>Type</th>
					</tr>
				</thead>

				{/* Table body displaying the media list */}
				<tbody>
					{mediaList.map((media) => (
						<tr key={media.id}>
							<td style={{ border: '1px solid black', padding: '8px' }}>
								{media.id}
							</td>
							<td style={{ border: '1px solid black', padding: '8px' }}>
								{media.title}
							</td>
							<td style={{ border: '1px solid black', padding: '8px' }}>
								{media.type}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default MediaList;
