import bcrypt from "bcryptjs";

export async function up(queryInterface) {
  const adminPassword = await bcrypt.hash("Admin@123", 10);
  const userPassword = await bcrypt.hash("User@123", 10);

  await queryInterface.bulkInsert("users", [
    {
      name: "Admin User",
      email: "admin@example.com",
      password: adminPassword,
      role: "admin",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: "Regular User",
      email: "user@example.com",
      password: userPassword,
      role: "user",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
}

export async function down(queryInterface) {
  await queryInterface.bulkDelete("users", {
    email: ["admin@example.com", "user@example.com"],
  });
}
