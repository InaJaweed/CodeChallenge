import { useState } from 'react';
import { Review } from '../types/Media'; // Import Review type

// Props expected by the ReviewForm component
interface ReviewFormProps {
	mediaId: number;
	existingReview?: Review; // If media already has a review
	onReviewSubmitted: () => void; // Callback to refresh UI
}

// component for submitting or updating a review
const ReviewForm = ({
	mediaId,
	existingReview,
	onReviewSubmitted,
}: ReviewFormProps) => {
	// State to store the rating (default is 1 or existing review's rating) and store the review comment (default is an empty string or existing comment)
	const [rating, setRating] = useState(existingReview?.rating || 1);
	const [comment, setComment] = useState(existingReview?.comment || '');

	// Function to handle review submission
	const handleSubmit = async (refresh: React.FormEvent) => {
		refresh.preventDefault();

		// object to send to the backend
		const newReview: Review = { rating, comment };

		try {
			// POST request to add/update the review for the media item
			const response = await fetch(
				`http://localhost:5169/media/${mediaId}/reviews`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(newReview),
				}
			);

			if (response.ok) {
				console.log('Review added/updated');
				onReviewSubmitted(); // Refresh UI
			} else {
				console.error('Failed to submit review');
			}
		} catch (error) {
			console.error('Error submitting review:', error);
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			{/* Input field for rating (1-5) */}
			<label>Rating (1-5):</label>
			<input
				type="number"
				min="1"
				max="5"
				value={rating}
				onChange={(refresh) => setRating(Number(refresh.target.value))}
				required
			/>
			{/* Input field for review comment */}
			<label>Comment:</label>
			<input
				type="text"
				value={comment}
				onChange={(refresh) => setComment(refresh.target.value)}
				required
			/>

			{/* button changes text depending on whether a review exists */}
			<button type="submit">{existingReview ? 'Update' : 'Add'} Review</button>
		</form>
	);
};

export default ReviewForm;
