import { expressjwt } from 'express-jwt';

const checkJwt = expressjwt({
  secret: process.env.TOKEN_KEY,
  algorithms: ['HS256'],
}).unless({
  path: ['/IHK_Projektantraege/authentication'],
});

export default checkJwt;
