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
  return db.createTable('organisations', {
    id: { type: 'int', unsigned: true, primaryKey: true, autoIncrement: true },
    org_name: { type: 'string', length: 200 },
    org_contact: { type: 'string', length: 12 },
    female_capacity: { type: 'int' },
    female_pending: { type: 'int' },
    female_available: { type: 'int' },
    male_capacity: { type: 'int' },
    male_pending: { type: 'int' },
    male_available: { type: 'int' },
    special_remarks: { type: 'string', length: 800 },
    last_updated: { type: 'date' },
  });
};

exports.down = function (db) {
  return null;
};

exports._meta = {
  version: 1,
};
