const db = require('../../data/db-config');

const getAll = () => {
  // select * from accounts-- Basically what the return line is saying. only because becaus of knex and how ot is linked up to the data and being imported in here
  return db('accounts');
}

const getById = id => {
  return db('accounts').where('id', id).first()
}

const create = async account => {
  //insert into accounts (name, badget) values ('foo'. 1000); --WHAT the CODE BELOW IS ESSENTIALLY SAYING
  const [id] = await db('accounts').insert(account)
  return getById(id)
}

const updateById = async (id, account) => {
  await db('accounts').where('id', id).update(account)
  return getById(id);
}

const deleteById = id => {
 return db('accounts').where('id', id).del()
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}