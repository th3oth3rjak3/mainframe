namespace Mainframe.Server.Recipes.Features.Recipes;

public class Recipe
{
    public required Guid Id { get; set; }
    public required string Name { get; set; }
    public required DateTime CreatedAt { get; set; }
}