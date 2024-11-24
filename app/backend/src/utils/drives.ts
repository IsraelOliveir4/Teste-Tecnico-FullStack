const drivers = [
    { id: 1, name: 'Homer Simpson', minDistance: 1, car: 'Sedan', rating: 4.2, description: 'Condução tranquila' },
    { id: 2, name: 'Dominic Toretto', minDistance: 5, car: 'Dodge Charger', rating: 4.8, description: 'Alta velocidade' },
    { id: 3, name: 'James Bond', minDistance: 10, car: 'Aston Martin', rating: 5.0, description: 'Luxo e segurança' },
  ];
  
  export const getAvailableDrivers = (distance: number) => {
    return drivers
      .filter(driver => distance >= driver.minDistance)
      .map(driver => ({
        id: driver.id,
        name: driver.name,
        car: driver.car,
        rating: driver.rating,
        description: driver.description,
        totalCost: (distance * driver.minDistance).toFixed(2),
      }))
      .sort((a, b) => parseFloat(a.totalCost) - parseFloat(b.totalCost));
  };
  