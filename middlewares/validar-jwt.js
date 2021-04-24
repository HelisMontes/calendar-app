const jwt = require('jsonwebtoken');

const validarToken = (req, res, next) => {
  // Headers x-token
  const token = req.header('x-token');
  if(!token){
    res.status(401).json({
      ok: false,
      msg: 'No hay token en la petición'    
    });
  }
  try {
    const payload = jwt.verify(token, process.env.KEY_JWT);
    req.body.user_id = payload.uid
    req.body.name = payload.name
  } catch (error) {
    res.status(401).json({
      ok: false,
      msg: 'Token no valido'
    });
  }

  next();
}
module.exports = {
  validarToken
}