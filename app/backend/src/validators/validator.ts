interface RideConfirmation {
    origin: string;
    destination: string;
    userId: string;
    driverId: string;
    distance: number;
  }
  
  export const validateRideConfirmation = ({
    origin,
    destination,
    userId,
    driverId,
    distance,
  }: RideConfirmation): string | null => {
    if (!origin || !destination) return 'Origin and destination cannot be empty.';
    if (!userId) return 'User ID cannot be empty.';
    if (origin === destination) return 'Origin and destination cannot be the same.';
    if (!driverId) return 'Driver must be selected.';
    if (distance <= 0) return 'Invalid distance.';
  
    // Validação do motorista e quilometragem
    const drivers = [
      { id: '1', name: 'Homer Simpson', minDistance: 1 },
      { id: '2', name: 'Dominic Toretto', minDistance: 5 },
      { id: '3', name: 'James Bond', minDistance: 10 },
    ];
  
    const driver = drivers.find((d) => d.id === driverId);
    if (!driver) return 'Invalid driver selected.';
    if (distance < driver.minDistance) return `Distance is too short for the selected driver. Minimum: ${driver.minDistance}km.`;
  
    return null;
  };

  export const validateRideQuery = (customerId: string, driverId?: string): string | null => {
    if (!customerId) return 'Customer ID cannot be empty.';
  
    // Validar ID do motorista, se informado
    const validDrivers = ['1', '2', '3']; // IDs válidos para motoristas no sistema
    if (driverId && !validDrivers.includes(driverId)) {
      return 'Invalid driver ID.';
    }
  
    return null;
  };
  