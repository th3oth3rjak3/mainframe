using System.ComponentModel.DataAnnotations;
using Mainframe.Server.Auth.Features.Passwords;
using Mainframe.Server.Auth.Features.Sessions;

namespace Mainframe.Server.Auth.Features.Users;

public class User
{
    public int Id { get; init; }

    [StringLength(100)]
    public required string FirstName { get; set; }

    [StringLength(100)]
    public required string LastName { get; set; }

    [StringLength(100)]
    [EmailAddress]
    public required string Email { get; set; }

    [StringLength(50)]
    public required string Username { get; set; }

    public required PasswordHash PasswordHash { get; set; }

    public List<Session> Sessions { get; set; } = [];
}
