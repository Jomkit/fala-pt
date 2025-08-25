'use strict';

/** @type {import('sequelize-cli').Migration} */
export async function up(queryInterface, Sequelize) {
  // Add wordClass column as ENUM
  await queryInterface.addColumn('Vocabulary', 'wordClass', {
    type: Sequelize.ENUM('noun', 'verb', 'adjective', 'expression', 'other'),
    allowNull: true,
  });

  // Change category column from ENUM to STRING
  await queryInterface.changeColumn('Vocabulary', 'category', {
    type: Sequelize.STRING,
    allowNull: true,
  });
}

export async function down(queryInterface, Sequelize) {
  // Remove wordClass column
  await queryInterface.removeColumn('Vocabulary', 'wordClass');

  // Revert category column to ENUM
  await queryInterface.changeColumn('Vocabulary', 'category', {
    type: Sequelize.ENUM('noun', 'verb', 'adjective', 'expression', 'other'),
    allowNull: true,
  });
}
