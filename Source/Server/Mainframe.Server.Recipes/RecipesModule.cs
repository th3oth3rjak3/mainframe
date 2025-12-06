using System.Reflection;
using Mainframe.Server.Infrastructure;
using Mainframe.Server.Recipes.Features.Recipes;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;

namespace Mainframe.Server.Recipes;

public static class RecipesModule
{
    public static IServiceCollection AddRecipesModule(this IServiceCollection services)
    {
        services.AddScoped<IRecipeService, RecipeService>();
        return services;
    }

    public static IEndpointRouteBuilder MapRecipesEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/recipes")
            .WithTags("Recipes");

        group.MapEndpointsFromAssembly(Assembly.GetExecutingAssembly());

        return app;
    }
}
