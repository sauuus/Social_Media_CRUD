module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("reply", {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users", // Name of the target table
          key: "id", // Name of the target column
        },
      },
      comment_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        reference: {
          model: "comment",
          key: "id",
        },
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deleted_at: {
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("reply");
  },
};
