import { Client } from '@googlemaps/google-maps-services-js';
import { getAvailableDrivers } from '../utils/drives';

const googleMapsClient = new Client({});

export const calculateRideEstimate = async (origin: string, destination: string) => {
  const response = await googleMapsClient.directions({
    params: {
      origin,
      destination,
      key: process.env.GOOGLE_MAPS_API_KEY as string,
    },
  });

  const route = response.data.routes[0];
  const leg = route.legs[0];

  const distance = leg.distance.value / 1000; // Em km
  const duration = leg.duration.text;

  const startLocation = leg.start_location;
  const endLocation = leg.end_location;

  const availableDrivers = getAvailableDrivers(distance);

  return {
    startLocation,
    endLocation,
    distance: `${distance.toFixed(2)} km`,
    duration,
    availableDrivers,
    googleRouteResponse: response.data,
  };
};

interface Ride {
    origin: string;
    destination: string;
    userId: string;
    driverId: string;
    distance: number;
  }
  
  export const saveRide = async (ride: Ride): Promise<void> => {
    // Simulação de persistência no banco
    console.log('Saving ride to database:', ride);
    // Aqui você implementaria a lógica para salvar no banco, como:
    // await database.insert('rides', ride);
  };

  interface Ride {
    id: string;
    origin: string;
    destination: string;
    userId: string;
    driverId: string;
    distance: number;
    date: Date;
  }
  
  const mockDatabase: Ride[] = [
    { id: '1', origin: '123 Main St', destination: '456 Elm St', userId: 'user123', driverId: '1', distance: 3, date: new Date('2024-11-20') },
    { id: '2', origin: '123 Main St', destination: '789 Pine St', userId: 'user123', driverId: '2', distance: 8, date: new Date('2024-11-21') },
    { id: '3', origin: '456 Elm St', destination: '789 Pine St', userId: 'user123', driverId: '1', distance: 12, date: new Date('2024-11-22') },
  ];
  
  export const getRidesByCustomer = async (customerId: string, driverId?: string): Promise<Ride[]> => {
    let rides = mockDatabase.filter((ride) => ride.userId === customerId);
  
    // Filtrar por motorista, se informado
    if (driverId) {
      rides = rides.filter((ride) => ride.driverId === driverId);
    }
  
    // Ordenar da mais recente para a mais antiga
    rides.sort((a, b) => b.date.getTime() - a.date.getTime());
  
    return rides;
  };
