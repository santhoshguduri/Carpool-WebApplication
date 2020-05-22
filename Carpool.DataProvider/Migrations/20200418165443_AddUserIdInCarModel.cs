using Microsoft.EntityFrameworkCore.Migrations;

namespace DataProvider.Migrations
{
    public partial class AddUserIdInCarModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "CarOwnerId",
                table: "Cars",
                nullable: false,
                defaultValue: 0L);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CarOwnerId",
                table: "Cars");
        }
    }
}
