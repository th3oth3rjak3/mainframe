using Mainframe.Server.Auth;
using Mainframe.Server.Recipes;
using Scalar.AspNetCore;
using Serilog;
using Serilog.Events;
using Serilog.Sinks.SystemConsole.Themes;

var builder = WebApplication.CreateBuilder(args);

Log.Logger = new LoggerConfiguration()
    .Enrich.FromLogContext()
    .MinimumLevel.Is(builder.Environment.IsDevelopment() ? LogEventLevel.Debug : LogEventLevel.Information)
    .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
    .MinimumLevel.Override("Microsoft.AspNetCore", LogEventLevel.Warning)
    .WriteTo.Console(
        outputTemplate: "{Timestamp:yyyy-MM-dd HH:mm:ss} {Level:u3} {Message:lj}{NewLine}{Exception}",
        theme: AnsiConsoleTheme.Code)
    .CreateLogger();

builder.Host.UseSerilog();
builder.Services.AddOpenApi();
builder.Services.AddAuthModule();
builder.Services.AddRecipesModule();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.MapScalarApiReference();
    app.UseWebAssemblyDebugging();
}

// When we're behind the cloudflare tunnel, https redirection won't matter.
// app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseBlazorFrameworkFiles();

app.MapAuthEndpoints();
app.MapRecipesEndpoints();

app.MapFallbackToFile("index.html");

try
{
    Log.Information("Starting web host");
    app.Run();

}
catch (Exception ex)
{
    Log.Fatal(ex, "Host terminated unexpectedly");
}
finally
{
    Log.CloseAndFlush();
}
