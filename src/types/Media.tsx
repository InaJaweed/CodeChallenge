// Defines the structure of a media item (Movie or TV Show)
export interface Media {
	id: number; // Unique identifier
	title: string; // Title of the movie or TV show
	type: 'Movie' | 'TV Show'; // Restrict to only Movie or TV Show
	review?: Review; // Optional review field (only 1 review per media)
}

// Defines the structure of a review for a media item
export interface Review {
	rating: number; // Rating between 1-5
	comment: string; // User's review comment
}
