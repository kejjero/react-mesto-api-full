const allowedCors = [
    'https://api.kejero.nomoredomains.xyz',
    'http://api.kejero.nomoredomains.xyz',
    'https://localhost:3000',
    'https://localhost:3001',
    'http://localhost:3000',
    'http://localhost:3001',
    'https://kejero.nomoredomains.xyz',
    'http://kejero.nomoredomains.xyz',
  ];
  
  module.exports = ((req, res, next) => {
    const { origin } = req.headers;
    const { method } = req;
  
    const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
    const requestHeaders = req.headers['access-control-request-headers'];
  
    if (allowedCors.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin);
      res.header('Access-Control-Allow-Credentials', true);
    }
    if (method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
      res.header('Access-Control-Allow-Headers', requestHeaders);
      res.status(200).send();
      return;
    }
    next();
  });