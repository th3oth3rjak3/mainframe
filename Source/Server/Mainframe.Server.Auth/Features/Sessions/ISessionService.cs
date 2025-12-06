namespace Mainframe.Server.Auth.Features.Sessions;

/// <summary>
///     Manage authentication sessions for application users.
/// </summary>
public interface ISessionService
{
    /// <summary>
    ///     Create a new session for the user with the given id.
    /// </summary>
    /// <param name="userId">The id of the user to create the session for.</param>
    /// <returns>The session id or an error.</returns>
    Task<Result<Session, Exception>> CreateAsync(int userId);

    /// <summary>
    ///     Update the expiration for a given session.
    /// </summary>
    /// <param name="sessionId">The id of the session.</param>
    /// <param name="sessionDuration">The duration for the expiration from now.</param>
    Task<Result<Session, Exception>> RefreshAsync(Guid sessionId, TimeSpan sessionDuration = default);

    /// <summary>
    ///     Get a session by its id.
    /// </summary>
    /// <param name="sessionId">The id of the session.</param>
    /// <returns>A session or an error.</returns>
    Task<Result<Session, Exception>> GetByIdAsync(Guid sessionId);

    /// <summary>
    ///     Delete a session by its id.
    /// </summary>
    /// <param name="sessionId">The id of the session to delete.</param>
    Task<Result<Unit, Exception>> DeleteByIdAsync(Guid sessionId);

    /// <summary>
    ///     Delete all expired sessions in the database.
    /// </summary>
    Task<Result<int, Exception>> DeleteExpiredAsync();
}
