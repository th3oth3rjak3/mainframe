namespace Mainframe.Server.Infrastructure.Exceptions;

/// <summary>
/// For use when an item is not found.
/// </summary>
/// <param name="message">The message to be logged when the item is not found.</param>
public class NotFoundException(string message) : Exception(message);