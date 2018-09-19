const express = require('express')
const rax = require('retry-axios');
const axios = require('axios');

const app = express()
const port = 3000

app.get('/', async (req, res) => {
  try {
    const interceptorId = rax.attach();
    const response = await axios({
      url: 'https://mockbin.org/status/500',
      raxConfig: {
        noResponseRetries: 4,
        retry: 4,
      }
    });
  } catch(e) {
    console.log('Exception thrown', e.config.raxConfig);
  }

  rax.detach(interceptorId);
  res.send('Hello World!')
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
