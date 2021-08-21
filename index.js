const loger = require('./src/utils/logger');

const PORT = process.env.PORT || 8010;

const app = require('./src/index');

app.listen(PORT, () => loger.info(`App started and listening on PORT ${PORT}`));

module.exports = app;
