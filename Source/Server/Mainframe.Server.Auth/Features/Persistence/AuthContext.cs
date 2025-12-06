using Mainframe.Server.Auth.Features.Sessions;
using Mainframe.Server.Auth.Features.Users;
using Microsoft.EntityFrameworkCore;

namespace Mainframe.Server.Auth.Features.Persistence;

public class AuthContext(DbContextOptions<AuthContext> options) : DbContext(options)
{
    public DbSet<Session> Sessions => Set<Session>();
    public DbSet<User> Users => Set<User>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AuthContext).Assembly);
    }
}
