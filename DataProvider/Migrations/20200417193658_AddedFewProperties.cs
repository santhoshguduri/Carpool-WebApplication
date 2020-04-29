using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DataProvider.Migrations
{
    public partial class AddedFewProperties : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_OfferedRides",
                table: "OfferedRides");

            migrationBuilder.RenameTable(
                name: "OfferedRides",
                newName: "RidesOffered");

            migrationBuilder.AddColumn<DateTime>(
                name: "DateOnRideRequested",
                table: "Bookings",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Time",
                table: "Bookings",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "RideOfferedDate",
                table: "RidesOffered",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddPrimaryKey(
                name: "PK_RidesOffered",
                table: "RidesOffered",
                column: "RideOfferId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_RidesOffered",
                table: "RidesOffered");

            migrationBuilder.DropColumn(
                name: "DateOnRideRequested",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "Time",
                table: "Bookings");

            migrationBuilder.DropColumn(
                name: "RideOfferedDate",
                table: "RidesOffered");

            migrationBuilder.RenameTable(
                name: "RidesOffered",
                newName: "OfferedRides");

            migrationBuilder.AddPrimaryKey(
                name: "PK_OfferedRides",
                table: "OfferedRides",
                column: "RideOfferId");
        }
    }
}
