const express = require('express')
const rax = require('retry-axios');
const axios = require('axios');

const app = express()
const port = 3000

// Create the Axios client and add retry-axios as an Interceptor
axios.defaults.raxConfig = {
  noResponseRetries: 4,
  retry: 4,
};
const interceptorId = rax.attach();

app.get('/', async (req, res) => {
  try {
    const response = await axios({
      url: 'https://www.mockbin.org/status/500',
      method: 'get',
    });
  } catch(e) {
    console.log('Exception thrown', e);
  }

  res.send('Hello World!')
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
