'use strict';

var dbm;
var type;
var seed;

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function (db) {
  return db.addColumn('users', 'role_id', {
    type: 'smallint',
    unsigned: 'true',
    foreignKey: {
      name: 'user_role_fk',
      table: 'roles',
      mapping: 'id',
      rules: {
        onDelete: 'restrict',
        onUpdate: 'restrict',
      },
    },
  });
};

exports.down = function (db) {
  return null;
};

exports._meta = {
  version: 1,
};
