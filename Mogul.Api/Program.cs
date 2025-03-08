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

// Start the server
app.Run();
