namespace Mainframe.Server.Infrastructure.Exceptions;

/// <summary>
///     Thrown when a user provides incorrect inputs to an HttpRequest.
/// </summary>
/// <param name="message">The message to log about the error when it occurs.</param>
public class BadRequestException(string message) : Exception(message);
