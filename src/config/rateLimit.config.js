import { rateLimit } from 'express-rate-limit'


export const queryLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 mins
  max: 100, // only 100 attempts allowed
  message: {
    success: false,
    message: 'Too many query attempts. Try again later.'
  },
});

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
});
