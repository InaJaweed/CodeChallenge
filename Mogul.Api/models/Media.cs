namespace Mogul.Api.Models;

// Represents a Media entity, which can be a Movie or a TV Show
public class Media
{
    // Unique identifier for the media item
    public int Id { get; set; }

    // Title of the movie or TV show
    public string Title { get; set; } = string.Empty;

    // Type of media (e.g., "Movie" or "TV Show")
    public string Type { get; set; } = string.Empty;

    public Review? Review { get; set; } // Only one review per media
}

public class Review
{
    public int Rating { get; set; } // Rating between 1 and 5
    public string Comment { get; set; } = string.Empty; // Review text
}
