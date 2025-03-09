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
	const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);

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

	// Function to delete a media item
	const deleteMedia = async (id: number) => {
		try {
			const response = await fetch(`${API_URL}/${id}`, {
				method: 'DELETE',
			});
			if (response.ok) {
				console.log(`Media with ID ${id} deleted successfully.`);
				fetchMedia(); // Refresh the media list after deletion
			} else {
				console.error(
					`Failed to delete media with ID ${id}. Response status: ${response.status}`
				);
			}
		} catch (error) {
			console.error('Error deleting media:', error);
		}
	};

	// useEffect to fetch media when the component mounts
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
									<strong>Rating:</strong> {media.review.rating}/5
									<br />
									<strong>Comment:</strong> {media.review.comment}
								</div>
							) : (
								<span>No review</span>
							)}
						</p>
						<div className="card-actions">
							<button onClick={() => setSelectedMedia(media)}>View</button>
							<button onClick={() => deleteMedia(media.id)}>Delete</button>
						</div>
					</div>
				))}
			</div>
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
