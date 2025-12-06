namespace Mainframe.Server.Recipes.Features.Recipes;

public class RecipeService : IRecipeService
{
    private static readonly List<Recipe> Recipes = [];

    public Task<Recipe> CreateAsync(string name, CancellationToken ct)
    {
        var recipe = new Recipe
        {
            Id = Guid.NewGuid(),
            Name = name,
            CreatedAt = DateTime.UtcNow
        };

        Recipes.Add(recipe);
        return Task.FromResult(recipe);
    }

    public Task<List<Recipe>> GetAllAsync(CancellationToken ct) => Task.FromResult(Recipes.ToList());
}
