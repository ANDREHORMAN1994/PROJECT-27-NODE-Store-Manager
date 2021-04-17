const connection = require('../../config/conn');
const { ObjectId } = require('mongodb');

const NAME_COLLECTION = 'products';

const create = async (name, quantity) => {
  const product = await connection().then((db) => {
    return db
      .collection(NAME_COLLECTION)
      .insertOne({ name, quantity });
  });
  return product;
};

const read = async () => {
  const products = await connection().then((db) => {
    return db
      .collection(NAME_COLLECTION)
      .find().toArray();
  });
  return products;
};

const readById = async (id) => {
  const product = await connection().then((db) => {
    return db
      .collection(NAME_COLLECTION)
      .findOne({ _id: ObjectId(id) });
  });
  return product;
};

const update = async (id, name, quantity) => {
  const product = await connection().then((db) => {
    return db
      .collection(NAME_COLLECTION)
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
  });
  return product;
};

const exclude = async (id) => {
  const product = await connection().then((db) => {
    return db
      .collection(NAME_COLLECTION)
      .deleteOne({ _id: ObjectId(id) });
  });
  return product;
};

module.exports = {
  create,
  read,
  readById,
  update,
  exclude,
};
