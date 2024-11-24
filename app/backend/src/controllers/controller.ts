import { Request, Response } from 'express';
import { calculateRideEstimate, getRidesByCustomer, saveRide } from '../services/service';
import { validateRideConfirmation, validateRideQuery } from '../validators/validator';
import { Ride } from '../models/models';
import { generateUniqueId } from '../utils/generationUniqueId';


export const estimateRide = async (req: Request, res: Response) => {
try {
    const { origin, destination, userId } = req.body;

    if (!origin || !destination || !userId) {
       res.status(400).json({ error: 'Origin, destination, and userId are required.' });
    }

    if (origin === destination) {
       res.status(400).json({ error: 'Origin and destination cannot be the same.' });
    }

    const result = await calculateRideEstimate(origin, destination);
     res.status(200).json(result);
} catch (error) {
    console.error(error);
     res.status(500).json({ error: 'An error occurred while estimating the ride.' });
}
}

export const confirmRide = async (req: Request, res: Response): Promise<void> => {
    try {
      const { origin, destination, userId, driverId, distance } = req.body;
  
      // Validações
      const validationError = validateRideConfirmation({ origin, destination, userId, driverId, distance });
      if (validationError) {
        res.status(400).json({ error: validationError });
        return;
      }

      

      const newRide: Ride = {
        id: generateUniqueId(), // Função para gerar IDs únicos
        origin,
        destination,
        userId,
        driverId,
        distance,
        date: new Date(), // Data atual
      };
  
      // Salvar no banco de dados
      await saveRide(newRide);
  
      res.status(200).json({ message: 'Ride confirmed and saved successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while confirming the ride.' });
    }
  };

  export const listRides = async (req: Request, res: Response): Promise<void> => {
    try {
      const { customer_id } = req.params;
      const { driver_id } = req.query;
  
      // Validações
      const validationError = validateRideQuery(customer_id, driver_id as string | undefined);
      if (validationError) {
        res.status(400).json({ error: validationError });
        return;
      }
  
      // Buscar as viagens realizadas pelo usuário
      const rides = await getRidesByCustomer(customer_id, driver_id as string | undefined);
  
      res.status(200).json(rides);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching rides.' });
    }
  };