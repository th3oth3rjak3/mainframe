using Mainframe.Server.Auth.Features.Passwords;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Mainframe.Server.Auth.Features.Users;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.ToTable("Users");
        builder.HasKey(u => u.Id);
        builder.Property(u => u.PasswordHash)
            .HasConversion<PasswordHashValueConverter>()
            .HasMaxLength(500);
    }
}
