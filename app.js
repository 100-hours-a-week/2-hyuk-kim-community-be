const express = require('express');
const app = express();
const userRouter = require('./Route/UserRoute');
const boardRouter = require('./Route/BoardRoute');

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', userRouter);
app.use('/api', boardRouter);

// app.use(errorHandler);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);

})

module.exports = app;