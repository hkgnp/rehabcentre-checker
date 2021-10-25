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
  return db.addColumn('users', 'org_id', {
    type: 'int',
    unsigned: 'true',
    notNull: 'false',
    foreignKey: {
      name: 'user_organisation_fk',
      table: 'organisations',
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
