export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("tasks", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },

    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    description: {
      type: Sequelize.TEXT,
      allowNull: true,
    },

    status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "Pending",
    },

    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },

    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  });
}

export async function down(queryInterface) {
  await queryInterface.dropTable("tasks");
}
