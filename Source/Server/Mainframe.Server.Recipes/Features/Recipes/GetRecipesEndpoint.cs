using Mainframe.Server.Infrastructure;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace Mainframe.Server.Recipes.Features.Recipes;

public class GetRecipesEndpoint : IEndpoint
{

    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapGet("/", HandleAsync)
            .WithName("GetRecipes")
            .WithTags("Recipes")
            .Produces<List<Response>>();
    }

    private async Task<IResult> HandleAsync(
        IRecipeService service,
        CancellationToken ct)
    {
        var recipes = await service.GetAllAsync(ct);
        var response = recipes.Select(r => new Response(r.Id, r.Name, r.CreatedAt))
            .ToList();
        return Results.Ok(response);
    }

    public record Response(Guid Id, string Name, DateTime CreatedAt);
}
