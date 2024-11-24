import dotenv from 'dotenv';

// Carrega variáveis do arquivo .env
dotenv.config();

export const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || '';
