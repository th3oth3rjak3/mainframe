using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace Mainframe.Server.Auth.Features.Persistence;

public class AuthContextFactory : IDesignTimeDbContextFactory<AuthContext>
{
    public AuthContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<AuthContext>();
        var connectionString = AuthModule.GetConnectionString();
        Console.WriteLine($"Connection String: '{connectionString}'");
        optionsBuilder.UseSqlite(connectionString);

        return new AuthContext(optionsBuilder.Options);
    }
}
