namespace Mainframe.Server.Recipes.Features.Recipes;

public interface IRecipeService
{
    Task<Recipe> CreateAsync(string name, CancellationToken token);
    Task<List<Recipe>> GetAllAsync(CancellationToken token);
}
