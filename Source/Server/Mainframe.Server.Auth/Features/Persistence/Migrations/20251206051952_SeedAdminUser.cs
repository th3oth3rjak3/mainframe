using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mainframe.Server.Auth.Features.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class SeedAdminUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
@"INSERT INTO Users (FirstName, LastName, Email, Username, PasswordHash) 
Values ('Default', 'Administrator', 'noreply@localhost', 'admin', '$argon2id$v=19$m=65536,t=3,p=1$ci2DGUKtsIL6yP738g/BhQ$RHj3xQ+JpX65SOJDoCF/d27DRk5d/bcS10YzbkeqHEA')");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DELETE FROM Users WHERE Username = 'admin'");
        }
    }
}
