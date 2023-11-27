module.exports = {
    async up(queryInterface, Sequelize) {
      await queryInterface.createTable("like", {
        id: {
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "users", // Name of the target table
            key: "id", // Name of the target column
          },
        },
        post_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          reference: {
            model: "post",
            key: "id",
          },
        },
        is_liked: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          default: 0,
        },
        reaction_enum: {
          type: Sequelize.ENUM("LIKE","LOVE"),
          allowNull: false,
          default: "LIKE",
        },
        created_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updated_at: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      });
    },
    async down(queryInterface, Sequelize) {
      await queryInterface.dropTable("like");
    },
  };