const corsSettings = {
  origin: [
    'https://api.leonov.nomoredomains.sbs',
    'http://api.leonov.nomoredomains.sbs',
    'http:/localhost:3000',
    'https://leonov.nomoredomains.sbs',
    'http://leonov.nomoredomains.sbs',
    'https://api.leonov.nomoredomains.sbs/signup',
    'https://api.leonov.nomoredomains.sbs/signin',
  ],
  methods: ['GET', 'PUT', 'POST', 'PATCH', 'DELETE', 'HEAD'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Origin', 'Autorization', 'Accept'],
};
module.exports = corsSettings;