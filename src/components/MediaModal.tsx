import React from 'react';
import { Media } from '../types/Media';
import ReviewForm from './ReviewForm';

interface MediaModalProps {
	media: Media | null; // Media item to display in the modal
	onClose: () => void; // Callback to close the modal
	onReviewSubmitted: () => void; // Callback to refresh UI after review submission
}

// Component to display detailed information about a media item in a modal
const MediaModal: React.FC<MediaModalProps> = ({
	media,
	onClose,
	onReviewSubmitted,
}) => {
	// If no media is selected, return null to render nothing
	if (!media) return null;

	return (
		<div className="modal-overlay">
			<div className="modal-content">
				{/* Button to close the modal */}
				<button className="close-button" onClick={onClose}>
					X
				</button>
				{/* Display media title */}
				<h2>{media.title}</h2>
				{/* Display media type */}
				<p>
					<strong>Type:</strong> {media.type}
				</p>
				{/* Display existing review if available */}
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
				{/* Render ReviewForm component for submitting or updating a review */}
				<ReviewForm
					mediaId={media.id}
					existingReview={media.review}
					onReviewSubmitted={onReviewSubmitted}
				/>
			</div>
		</div>
	);
};

export default MediaModal;
