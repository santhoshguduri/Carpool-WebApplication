using Microsoft.EntityFrameworkCore.Migrations;

namespace DataProvider.Migrations
{
    public partial class changeOfSeatdDatatype : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
                name: "SeatCapacity",
                table: "Cars",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "SeatCapacity",
                table: "Cars",
                type: "int",
                nullable: false,
                oldClrType: typeof(long));
        }
    }
}
