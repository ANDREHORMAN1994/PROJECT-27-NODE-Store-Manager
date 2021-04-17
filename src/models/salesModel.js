const connection = require('../../config/conn');
const { ObjectId } = require('mongodb');

const NAME_COLLECTION = 'sales';

const create = async (productsList) => {
  const newObj = {
    itensSold: productsList,
  };
  const sale = await connection().then((db) => {
    return db.collection(NAME_COLLECTION).insertOne(newObj);
  });
  return sale;
};

const read = async () => {
  const sales = await connection().then((db) => {
    return db.collection(NAME_COLLECTION).find().toArray();
  });
  return sales;
};

const readById = async (id) => {
  const sale = await connection().then((db) => {
    return db.collection(NAME_COLLECTION).findOne({ _id: ObjectId(id) });
  });
  return sale;
};

const update = async (id, productId, quantity) => {
  const sale = await connection().then((db) => {
    return db
      .collection(NAME_COLLECTION)
      .updateOne(
        { _id: ObjectId(id) },
        { $set: { itensSold: [{ productId, quantity }] }
        });
  });
  return sale;
};

const exclude = async (id) => {
  const sale = await connection().then((db) => {
    return db.collection(NAME_COLLECTION).deleteOne({ _id: ObjectId(id) });
  });
  return sale;
};

module.exports = {
  create,
  read,
  readById,
  update,
  exclude,
};
