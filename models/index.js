const bookshelf = require('../bookshelf');

const User = bookshelf.model('User', {
  tableName: 'users',

  organisation() {
    return this.belongsTo('Organisation');
  },
});

const Organisation = bookshelf.model('Organisation', {
  tableName: 'organisations',

  users() {
    return this.hasMany('User');
  },
});

module.exports = { User, Organisation };
