using Mogul.Api.Models;

var builder = WebApplication.CreateBuilder(args);

// Enable CORS so the React frontend can access the backend
builder.Services.AddCors(options =>
{
    options.AddPolicy(
        "AllowFrontend",
        builder => builder.WithOrigins("http://localhost:5173")
        .AllowAnyHeader()
        .AllowAnyMethod());
});

var app = builder.Build();
app.UseCors("AllowFrontend");

// Temporary in-memory storage
var mediaList = new List<Media>();
var nextId = 1;

// GET /media - List all movies and TV shows
app.MapGet("/media", () =>
{
    return Results.Ok(mediaList);
});

// POST /media - Add a new movie or TV show
app.MapPost("/media", (Media media) =>
{
    media.Id = nextId++;
    mediaList.Add(media);
    return Results.Created($"/media/{media.Id}", media);
});

// POST /media/{id}/reviews - Add or Update Review
app.MapPost("/media/{id}/reviews", (int id, Review review) =>
{
    var media = mediaList.FirstOrDefault(m => m.Id == id);
    if (media == null)
    {
        return Results.NotFound($"Media with ID {id} not found.");
    }

    // Validate rating (must be between 1-5)
    if (review.Rating < 1 || review.Rating > 5)
    {
        return Results.BadRequest("Rating must be between 1 and 5.");
    }

    // Set or update the review
    media.Review = review;
    
    return Results.Ok(media.Review);
});

// GET /media/{id}/reviews - Retrieve Review for a Media Item
app.MapGet("/media/{id}/reviews", (int id) =>
{
    var media = mediaList.FirstOrDefault(m => m.Id == id);
    if (media == null)
    {
        return Results.NotFound($"Media with ID {id} not found.");
    }

    return media.Review != null ? Results.Ok(media.Review) : Results.NotFound("No review found for this media.");
});

// Start the server
app.Run();
