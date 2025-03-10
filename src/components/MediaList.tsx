import { useEffect, useState } from 'react';
import { Media } from '../types/Media';
import MediaModal from './MediaModal';

import '../App.css';

// API endpoint where media data will be fetched from
const API_URL = 'http://localhost:5169/media';

// Component to display a list of media items
const MediaList = ({ refresh }: { refresh: boolean }) => {
	// State to store the list of media items
	const [mediaList, setMediaList] = useState<Media[]>([]);
	// State to store the selected media item for the modal
	const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);

	// Function to fetch media data from the backend API
	const fetchMedia = async () => {
		try {
			// Send a GET request to the API
			const response = await fetch(API_URL);
			// Convert response to JSON
			const data = await response.json();
			// Update the state with the fetched data
			setMediaList(data);
		} catch (error) {
			// Log errors if the request fails
			console.error('Error fetching media:', error);
		}
	};

	// Function to delete a media item
	const deleteMedia = async (id: number) => {
		try {
			// Send a DELETE request to the API
			const response = await fetch(`${API_URL}/${id}`, {
				method: 'DELETE',
			});
			if (response.ok) {
				// Log success message
				console.log(`Media with ID ${id} deleted successfully.`);
				// Refresh the media list after deletion
				fetchMedia();
			} else {
				// Log error message with response status
				console.error(
					`Failed to delete media with ID ${id}. Response status: ${response.status}`
				);
			}
		} catch (error) {
			// Log errors if the request fails
			console.error('Error deleting media:', error);
		}
	};

	// useEffect to fetch media
	useEffect(() => {
		fetchMedia();
	}, [refresh]);

	return (
		<div>
			<h3>Media List</h3>
			{/* Grid to display media items */}
			<div className="media-grid">
				{mediaList.map((media) => (
					<div key={media.id} className="card">
						<h4>{media.title}</h4>
						<p>
							<strong>Type:</strong> {media.type}
						</p>
						<p>
							{media.review ? (
								<div>
									<p>
										<strong>Rating:</strong> {media.review.rating}/5
									</p>
									<p>
										<strong>Comment:</strong> {media.review.comment}
									</p>
								</div>
							) : (
								<p>No review</p>
							)}
						</p>
						<div className="card-actions">
							<button onClick={() => setSelectedMedia(media)}>View</button>
							<button onClick={() => deleteMedia(media.id)}>Delete</button>
						</div>
					</div>
				))}
			</div>
			{/* Modal to display detailed information about the selected media item */}
			{selectedMedia && (
				<MediaModal
					media={selectedMedia}
					onClose={() => setSelectedMedia(null)}
					onReviewSubmitted={fetchMedia}
				/>
			)}
		</div>
	);
};

export default MediaList;
