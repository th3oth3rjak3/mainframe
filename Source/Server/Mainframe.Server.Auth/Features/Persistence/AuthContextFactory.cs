using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Mainframe.Server.Auth.Features.Persistence;

public class AuthContextFactory : IDesignTimeDbContextFactory<AuthContext>
{
    public AuthContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<AuthContext>();

        var solutionRoot = Path.Combine(Directory.GetCurrentDirectory(), "..", "..", "..");
        var dbPath = Path.Combine(solutionRoot, "Mainframe.db");
        optionsBuilder.UseSqlite($"Data Source={dbPath}");

        return new AuthContext(optionsBuilder.Options);
    }
}
