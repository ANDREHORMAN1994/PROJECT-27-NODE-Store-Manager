const express = require('express');
const { productsRouter, salesRouter } = require('./src/routes');

const app = express();

const PORT = 3000;
const SUCESS = 200;

app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(SUCESS).send({
    message: 'PROJETO STORE MANAGER',
  });
});

app.use(salesRouter);
app.use(productsRouter);

app.use((err, _req, res, _next) => {
  const { status, message, code } = err;
  res.status(status).json({
    err: {
      code,
      message,
    },
  });
});

app.listen(PORT, () => console.log('App rodando na porta ' + PORT));
