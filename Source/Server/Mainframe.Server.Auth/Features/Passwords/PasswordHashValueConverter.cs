using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Mainframe.Server.Auth.Features.Passwords;

/// <summary>
///     Convert a PasswordHash to a string representation for db storage and vice versa.
/// </summary>
public class PasswordHashValueConverter()
    : ValueConverter<PasswordHash, string>(
    passwordHash => passwordHash.Value,
    hash => new PasswordHash(hash));
