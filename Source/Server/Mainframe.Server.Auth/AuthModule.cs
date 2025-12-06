using System.Reflection;
using Mainframe.Server.Auth.Features.Passwords;
using Mainframe.Server.Auth.Features.Persistence;
using Mainframe.Server.Auth.Features.Sessions;
using Mainframe.Server.Infrastructure;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Serilog;

namespace Mainframe.Server.Auth;

[ExcludeFromCodeCoverage]
public static class AuthModule
{
    private const string DatabasePath = "MAINFRAME_DB_PATH";

    public static IServiceCollection AddAuthModule(this IServiceCollection services)
    {
        var connectionString = GetConnectionString();
        Log.Information("Connection String: '{ConnectionString}'", connectionString);
        services.AddDbContext<AuthContext>(options => options.UseSqlite(connectionString));

        services.AddHostedService<SessionCleanupService>();
        services.AddScoped<IPasswordHasher, Argon2IdPasswordHasher>();
        services.AddScoped<ISessionService, SessionService>();
        return services;
    }

    public static IEndpointRouteBuilder MapAuthEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/auth")
            .WithTags("Auth");

        group.MapEndpointsFromAssembly(Assembly.GetExecutingAssembly());

        return app;
    }

    public static string GetConnectionString() => $"Data Source={GetDbPath()}";

    private static string GetDbPath()
    {
        // 1. Check environment first for db path.
        var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Production";
        Log.Information("ASPNETCORE_ENVIRONMENT: '{Env}'", env);
        var databasePath = Environment.GetEnvironmentVariable(DatabasePath);
        if (!string.IsNullOrEmpty(databasePath))
        {
            return databasePath;
        }

        if (env == "Production")
        {
            throw new ArgumentException($"Missing environment variable for database path: {DatabasePath}");
        }

        // 2. Fallback to platform-appropriate AppData location
        var baseDir = Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData);
        var appDir = Path.Combine(baseDir, "Mainframe", "Data");
        Directory.CreateDirectory(appDir);

        return Path.Combine(appDir, "Mainframe.db");
    }
}
