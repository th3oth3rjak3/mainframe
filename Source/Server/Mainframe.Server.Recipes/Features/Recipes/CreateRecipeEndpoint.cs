using Mainframe.Server.Infrastructure;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace Mainframe.Server.Recipes.Features.Recipes;

public class CreateRecipeEndpoint : IEndpoint
{
    private record Request(string Name);

    private record Response(Guid Id, string Name, DateTime CreatedAt);
    
    public void MapEndpoint(IEndpointRouteBuilder app)
    {
        app.MapPost("/", HandleAsync)
            .WithName("CreateRecipe")
            .WithTags("Recipes")
            .Produces<Response>();
    }
    
    private static async Task<IResult> HandleAsync(
        Request request,
        IRecipeService service,
        CancellationToken ct)
    {
        var recipe = await service.CreateAsync(request.Name, ct);
        return Results.Ok(new Response(recipe.Id, recipe.Name, recipe.CreatedAt));
    }
}