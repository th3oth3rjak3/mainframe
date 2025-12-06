using Mainframe.Server.Auth.Features.Persistence;
using Mainframe.Server.Infrastructure.Exceptions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Mainframe.Server.Auth.Features.Sessions;

/// <inheritdoc cref="ISessionService" />
public class SessionService(AuthContext context, ILogger<SessionService> logger) : ISessionService
{
    public async Task<Result<Session, Exception>> CreateAsync(int userId) =>
        await TryAsync(async () =>
        {
            var newSession = new Session(userId);
            context.Sessions.Add(newSession);
            await context.SaveChangesAsync();

            return newSession;
        });

    public async Task<Result<Session, Exception>> RefreshAsync(Guid sessionId, TimeSpan sessionDuration = default) =>
        await TryAsync(async () =>
        {
            var session = await context
                .Sessions
                .Where(s => s.Id == sessionId)
                .SingleOrDefaultAsync();

            if (session is null)
            {
                throw new Exception($"Session with ID '{sessionId}' was not found.");
            }

            session.Slide(sessionDuration);
            await context.SaveChangesAsync();
            return session;
        });

    public async Task<Result<Session, Exception>> GetByIdAsync(Guid sessionId) =>
        await TryAsync(() =>
                context
                    .Sessions
                    .AsNoTracking()
                    .Where(s => s.Id == sessionId && s.ExpiresAt > DateTime.UtcNow)
                    .Include(s => s.User)
                    .SingleOrDefaultAsync())
            .BindAsync(session =>
            {
                if (session is not null)
                {
                    return session;
                }

                var error = new AuthenticationRequiredException($"Session with id '{sessionId}' was not found.");
                return Error<Session>(error);
            });

    public async Task<Result<Unit, Exception>> DeleteByIdAsync(Guid sessionId) =>
        await TryAsync(async () =>
        {
            await context
                .Sessions
                .Where(s => s.Id == sessionId)
                .ExecuteDeleteAsync();
        });

    public async Task<Result<int, Exception>> DeleteExpiredAsync() =>
        await TryAsync(() =>
            context
                .Sessions
                .Where(s => s.ExpiresAt < DateTime.UtcNow)
                .ExecuteDeleteAsync());
}
