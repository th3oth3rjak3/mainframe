namespace Mainframe.Server.Infrastructure.Exceptions;

/// <summary>
///     Thrown when a user does not have authorization to access a protected resource.
/// </summary>
/// <param name="message">The message to log when the error occurs.</param>
public class UnauthorizedUserException(string message) : Exception(message);
