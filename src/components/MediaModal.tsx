import React from 'react';
import { Media } from '../types/Media';
import ReviewForm from './ReviewForm';

interface MediaModalProps {
	media: Media | null;
	onClose: () => void;
	onReviewSubmitted: () => void;
}

// Component to display detailed information about a media item in a modal
const MediaModal: React.FC<MediaModalProps> = ({
	media,
	onClose,
	onReviewSubmitted,
}) => {
	if (!media) return null;

	return (
		<div className="modal-overlay">
			<div className="modal-content">
				<button className="close-button" onClick={onClose}>
					X
				</button>
				<h2>{media.title}</h2>
				<p>
					<strong>Type:</strong> {media.type}
				</p>
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
