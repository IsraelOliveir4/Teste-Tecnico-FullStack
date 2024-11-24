export interface Ride {
    id: string;          // ID único da viagem
    origin: string;      // Endereço de origem
    destination: string; // Endereço de destino
    userId: string;      // ID do usuário
    driverId: string;    // ID do motorista
    distance: number;    // Distância da viagem
    date: Date;          // Data da viagem
  }