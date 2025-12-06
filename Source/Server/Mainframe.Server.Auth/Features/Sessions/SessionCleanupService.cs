using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace Mainframe.Server.Auth.Features.Sessions;

public class SessionCleanupService(IServiceProvider provider, ILogger<SessionCleanupService> logger) : BackgroundService
{
    private readonly TimeSpan _cleanupInterval = TimeSpan.FromMinutes(5);

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        logger.LogInformation("Session cleanup service started.");

        using var scope = provider.CreateScope();
        var sessionService = scope.ServiceProvider.GetRequiredService<ISessionService>();

        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                var nextCleanup = DateTime.Now.Add(_cleanupInterval).ToString("yyyy-MM-dd HH:mm:ss");

                await sessionService
                    .DeleteExpiredAsync()
                    .EffectAsync(
                        rowsAffected =>
                        {
                            logger.LogInformation(
                                "{Count} expired session(s) cleaned up successfully, next run at {NextCleanup}",
                                rowsAffected,
                                nextCleanup);
                        },
                        err => logger.LogError(err, "Error cleaning up expired sessions."));
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Unexpected exception during session cleanup.");
            }

            await Task.Delay(_cleanupInterval, stoppingToken);
        }

        logger.LogInformation("Session cleanup service stopped.");
    }
}
