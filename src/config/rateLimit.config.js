import { rateLimit } from 'express-rate-limit'


export const queryLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 10 mins
  max: 10, // only 5 attempts allowed
  message: {
    success: false,
    message: 'Too many query attempts. Try again later.'
  },
});

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
});
