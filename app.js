const express = require('express')
const rax = require('retry-axios');
const axios = require('axios');

const app = express()
const port = 3000

const myAxiosInstance = axios.create();
myAxiosInstance.defaults = {
  raxConfig: {
    instance: myAxiosInstance,
    onRetryAttempt: (err) => {
      const cfg = rax.getConfig(err);
      console.log(`Retry attempt #${cfg.currentRetryAttempt}`);
    },
  }
}
const interceptorId = rax.attach(myAxiosInstance);

app.get('/', async (req, res) => {
  try {
    const response = await myAxiosInstance.get('https://mockbin.org/status/500');
  } catch(e) {
    console.log('Exception thrown', e);
  }

  res.send('Hello World!')
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
