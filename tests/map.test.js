import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import UserLocationMap from '../pages/map'; 
import * as Location from 'expo-location';
import { Text, ActivityIndicator } from 'react-native';
import MapView from 'react-native-maps';

// Mock des modules
jest.mock('expo-location', () => ({
  requestForegroundPermissionsAsync: jest.fn(),
  getCurrentPositionAsync: jest.fn(),
}));

jest.mock('react-native-maps', () => {
  const RealMapView = jest.requireActual('react-native-maps');
  return {
    __esModule: true,
    ...RealMapView,
    Marker: jest.fn(),
  };
});

describe('UserLocationMap', () => {
  it('affiche un indicateur de chargement pendant que la localisation est récupérée', () => {
    // Simule un chargement en définissant loading à true
    render(<UserLocationMap />);
    expect(screen.getByTestId('loading-indicator')).toBeTruthy();
  });

  it('affiche une alerte si la permission de localisation est refusée', async () => {
    // Simule un refus de permission
    Location.requestForegroundPermissionsAsync.mockResolvedValueOnce({
      status: 'denied',
    });

    render(<UserLocationMap />);

    // Attendre que le texte de l'alerte apparaisse
    await waitFor(() => {
      expect(screen.queryByText("Impossible d'accéder à la localisation.")).toBeTruthy();
    });
  });

  it('affiche la carte avec un marqueur lorsque la localisation est récupérée', async () => {
    // Simule l'acceptation de la permission et la récupération de la localisation
    Location.requestForegroundPermissionsAsync.mockResolvedValueOnce({
      status: 'granted',
    });

    Location.getCurrentPositionAsync.mockResolvedValueOnce({
      coords: { latitude: 37.7749, longitude: -122.4194 }, // Exemple de coordonnées
    });

    render(<UserLocationMap />);

    // Attendre que la localisation soit récupérée
    await waitFor(() => {
      expect(screen.getByTestId('map')).toBeTruthy();
      expect(screen.queryByText('Vous êtes ici')).toBeTruthy(); // Vérifie que le titre du marqueur est affiché
    });
  });

  it('affiche "Localisation non disponible" si la localisation est nulle', async () => {
    // Simule la situation où aucune localisation n'est disponible
    Location.requestForegroundPermissionsAsync.mockResolvedValueOnce({
      status: 'granted',
    });

    Location.getCurrentPositionAsync.mockResolvedValueOnce(null);

    render(<UserLocationMap />);

    // Attendre que le texte de localisation non disponible apparaisse
    await waitFor(() => {
      expect(screen.queryByText('Localisation non disponible')).toBeTruthy();
    });
  });
});
