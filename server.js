require('babel-register')({
  presets: ['env', 'react', 'stage-2', 'es2015', 'stage-0'],
});

const STATIC_VERSION = (new Date()).getTime();

const xss = require('xss');
const path = require('path');
const ejs = require('ejs');
const express = require('express');
const renderStatic = require('./src/renderStatic').default;
const routes = require('./src/routes').default;
const { createStore } = require('./src/store');

const app = express();

app.disable('x-powered-by');
app.use(express.static('public'));

routes.forEach((route) => {
  app.get(route.path, async (req, res) => {
    const store = createStore();
    let contentMetaTags;

    if (typeof route.getData === 'function') {
      try {
        const data = await route.getData(store, req.params);

        if (data && data.contentMetaTags) {
          contentMetaTags = xss(data.contentMetaTags);
        }
      } catch (e) {
        console.error(e);
      }
    }

    const templateData = {
      contentMetaTags,
      state: store.getState(),
      content: renderStatic(store, req.url),
      staticVersion: STATIC_VERSION,
    };

    try {
      const html = await ejs.renderFile(path.resolve(__dirname, 'src/index.ejs'), templateData);
      res.send(html);
    } catch (e) {
      res.status(500).send(e);
    }
  });
});

app.listen(process.env.PORT || 3000);
