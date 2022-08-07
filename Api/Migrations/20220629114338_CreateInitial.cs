using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Api.Migrations
{
    public partial class CreateInitial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Locations",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    x = table.Column<double>(type: "float", nullable: false),
                    y = table.Column<double>(type: "float", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Locations", x => x.id);
                });

            migrationBuilder.InsertData(
                table: "Locations",
                columns: new[] { "id", "name", "x", "y" },
                values: new object[,]
                {
                    { 20L, "temp data", 12.300000000000001, 56.700000000000003 },
                    { 21L, "dummy data", 16.399999999999999, 83.099999999999994 },
                    { 22L, "void data", 65.430000000000007, 4.0 },
                    { 23L, "valid data", 134.99000000000001, 88.099999999999994 }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Locations");
        }
    }
}
