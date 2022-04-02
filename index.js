// Um grande agradecimento ao Nato e aos demais monitores que me ensinaram a debugar com qualidade, sem isso o projeto não sairia do lugar.

const express = require('express');
const bodyParser = require('body-parser');
const productsRouter = require('./routes/productsRouter');
const salesRouter = require('./routes/salesRouter');
const errorMiddleware = require('./middlewares/errorMiddleware');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouter);
app.use('/sales', salesRouter);
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});
