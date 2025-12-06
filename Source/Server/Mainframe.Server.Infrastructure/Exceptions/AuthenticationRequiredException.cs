namespace Mainframe.Server.Infrastructure.Exceptions;

/// <summary>
///     Thrown when some action requires an authenticated user, but the user has not logged in.
/// </summary>
/// <param name="message">The message to log when the error happens.</param>
public class AuthenticationRequiredException(string message) : Exception(message);
