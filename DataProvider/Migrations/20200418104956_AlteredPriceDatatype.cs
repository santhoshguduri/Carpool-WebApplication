using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DataProvider.Migrations
{
    public partial class AlteredPriceDatatype : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateOnRideRequested",
                table: "Bookings");

            migrationBuilder.AlterColumn<double>(
                name: "RideFair",
                table: "Bookings",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AddColumn<DateTime>(
                name: "RideBookingDate",
                table: "Bookings",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RideBookingDate",
                table: "Bookings");

            migrationBuilder.AlterColumn<long>(
                name: "RideFair",
                table: "Bookings",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(double));

            migrationBuilder.AddColumn<DateTime>(
                name: "DateOnRideRequested",
                table: "Bookings",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
