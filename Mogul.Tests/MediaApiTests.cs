using System.Net;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Mvc.Testing;
using Mogul.Api.Models;

public class MediaApiTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    // Constructor to initialize the HttpClient
    public MediaApiTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    // Class to represent the response containing media ID
    public class MediaResponse
    {
        public int Id { get; set; }
    }

    // Test to verify that adding a new media item returns Created status
    [Fact]
    public async Task AddMedia_ShouldReturnCreated()
    {
        var media = new Media { Title = "Spider-Man", Type = "Movie" };
        var response = await _client.PostAsJsonAsync("/media", media);

        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
    }

    // Test to verify that adding a duplicate media item returns BadRequest status
    [Fact]
    public async Task AddDuplicateMedia_ShouldReturnBadRequest()
    {
        var media = new Media { Title = "Inception", Type = "Movie" };
        // First request
        await _client.PostAsJsonAsync("/media", media);
        // Duplicate request
        var response = await _client.PostAsJsonAsync("/media", media);

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    // Test to verify that getting the list of media items returns OK status
    [Fact]
    public async Task GetMedia_ShouldReturnOk()
    {
        var response = await _client.GetAsync("/media");
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
    }

    // Test to verify that deleting an existing media item returns NoContent status
    [Fact]
    public async Task DeleteMedia_ShouldReturnNoContent()
    {
        var media = new Media { Title = "Iron Man", Type = "Movie" };
        var postResponse = await _client.PostAsJsonAsync("/media", media);

        // Deserialize the response to get the mediaId
        var mediaResponse = await postResponse.Content.ReadFromJsonAsync<MediaResponse>();
        var mediaId = mediaResponse?.Id;

        var deleteResponse = await _client.DeleteAsync($"/media/{mediaId}");
        Assert.Equal(HttpStatusCode.NoContent, deleteResponse.StatusCode);
    }

    // Test to verify that deleting a non-existing media item returns NotFound status
    [Fact]
    public async Task DeleteNonExistingMedia_ShouldReturnNotFound()
    {
        var response = await _client.DeleteAsync("/media/999");
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }
}
