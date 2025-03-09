import { useState } from 'react';

// API endpoint where media data will be sent
const API_URL = 'http://localhost:5169/media';

// Component to add a new media item (Movie or TV Show)
const AddMediaForm = ({ onMediaAdded }: { onMediaAdded: () => void }) => {
	// State to manage the input values
	const [title, setTitle] = useState(''); // Holds the title of the media
	const [type, setType] = useState<'Movie' | 'TV Show'>('Movie'); // Holds the selected type

	// Handle form submission
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault(); // Prevent page reload

		// Create new media object to send to the backend
		const newMedia = { title, type };

		try {
			// Send POST request to the backend API
			const response = await fetch(API_URL, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(newMedia), // Convert object to JSON
			});

			// If request is successful
			if (response.ok) {
				console.log('Media added:', await response.json());

				// Reset form fields after successful submission
				setTitle('');
				setType('Movie');

				// Call the parent component's function to refresh the media list
				onMediaAdded();
			} else {
				console.error('Failed to add media');
			}
		} catch (error) {
			console.error('Error:', error); // Log network errors
		}
	};

	return (
		<form onSubmit={handleSubmit} className="media-form">
			{/* Input field for the media title */}
			<input
				type="text"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder="Enter title"
				required
			/>

			{/* Dropdown for selecting Movie or TV Show */}
			<select
				value={type}
				onChange={(e) => setType(e.target.value as 'Movie' | 'TV Show')}
			>
				<option value="Movie">Movie</option>
				<option value="TV Show">TV Show</option>
			</select>

			{/* Submit button */}
			<button type="submit">Add</button>
		</form>
	);
};

export default AddMediaForm;
