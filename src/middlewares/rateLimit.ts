import rateLimit from 'express-rate-limit';
import { HTTP_STATUS_CODES } from '../utils/statusCodes';

const { TOO_MANY_REQUESTS } = HTTP_STATUS_CODES

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10, // límite de 10 peticiones por IP
  statusCode: TOO_MANY_REQUESTS, // Código de estado HTTP a devolver
  message: {
    status: TOO_MANY_REQUESTS,
    message: 'Demasiadas peticiones desde esta IP, por favor intenta de nuevo después de 15 minutos.'
  }
});