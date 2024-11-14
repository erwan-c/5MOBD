import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import HomeScreen from '../pages/home'; 
import { auth, db, storage } from '../firebase/firebaseConfig';
import * as ImagePicker from 'expo-image-picker';
import { ActionSheetIOS } from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';

// Mock des modules
jest.mock('firebase/firestore', () => ({
  doc: jest.fn(),
  getDoc: jest.fn(),
}));

jest.mock('firebase/storage', () => ({
  ref: jest.fn(),
  getDownloadURL: jest.fn(),
}));

jest.mock('expo-image-picker', () => ({
  requestMediaLibraryPermissionsAsync: jest.fn(),
  launchImageLibraryAsync: jest.fn(),
}));

jest.mock('react-native', () => {
  const actualReactNative = jest.requireActual('react-native');
  return {
    ...actualReactNative,
    ActionSheetIOS: {
      showActionSheetWithOptions: jest.fn(),
    },
    Alert: {
      alert: jest.fn(),
    },
  };
});

describe('HomeScreen', () => {
  beforeEach(() => {
    // Initialiser les mocks
    doc.mockReturnValue({ id: 'user-id' });
    getDoc.mockResolvedValue({ exists: () => true, data: () => ({ username: 'Test User' }) });
    getDownloadURL.mockResolvedValue('https://example.com/image.jpg');
    ImagePicker.requestMediaLibraryPermissionsAsync.mockResolvedValue({ status: 'granted' });
    ImagePicker.launchImageLibraryAsync.mockResolvedValue({
      cancelled: false,
      assets: [{ uri: 'https://example.com/image.jpg' }],
    });
  });

  it('affiche le nom de l\'utilisateur après avoir récupéré les données Firebase', async () => {
    render(<HomeScreen />);

    await waitFor(() => {
      expect(screen.getByText('Bienvenue, Test User')).toBeTruthy();
    });
  });

  it('affiche une image de profil par défaut si aucune image n\'est définie', async () => {
    render(<HomeScreen />);

    await waitFor(() => {
      expect(screen.getByRole('image')).toHaveProp('source', require('../assets/defaultProfil.png'));
    });
  });

  it('met à jour la photo de profil après sélection d\'une nouvelle image', async () => {
    render(<HomeScreen />);

    // Simuler l'appel de l'action sheet
    fireEvent.press(screen.getByRole('button'));

    await waitFor(() => {
      expect(ActionSheetIOS.showActionSheetWithOptions).toHaveBeenCalled();
    });

    // Simuler le choix "Changer la photo de profil"
    const actionSheetCallback = ActionSheetIOS.showActionSheetWithOptions.mock.calls[0][1];
    actionSheetCallback(1); // Choisir l'option "Changer la photo de profil"

    await waitFor(() => {
      expect(getDownloadURL).toHaveBeenCalled();
      expect(screen.getByRole('image')).toHaveProp('source', { uri: 'https://example.com/image.jpg' });
    });
  });

  it('affiche un modal avec l\'image de profil en plein écran', async () => {
    render(<HomeScreen />);

    fireEvent.press(screen.getByRole('button'));

    const actionSheetCallback = ActionSheetIOS.showActionSheetWithOptions.mock.calls[0][1];
    actionSheetCallback(0); // Choisir l'option "Afficher l'image en plein écran"

    await waitFor(() => {
      expect(screen.getByText('Fermer')).toBeTruthy(); // Vérifie si le bouton "Fermer" du modal est affiché
    });
  });

  it('déconnecte l\'utilisateur lorsque l\'option "Se déconnecter" est sélectionnée', async () => {
    const mockSignOut = jest.fn();
    auth.signOut = mockSignOut;

    render(<HomeScreen />);

    fireEvent.press(screen.getByRole('button'));

    const actionSheetCallback = ActionSheetIOS.showActionSheetWithOptions.mock.calls[0][1];
    actionSheetCallback(2); // Choisir l'option "Se déconnecter"

    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalled();
      expect(auth.signOut).toHaveBeenCalled();
    });
  });

  it('affiche un message d\'erreur si la récupération des données utilisateur échoue', async () => {
    getDoc.mockRejectedValueOnce(new Error('Erreur lors de la récupération des données utilisateur'));

    render(<HomeScreen />);

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith(
        'Erreur lors de la récupération des données utilisateur :',
        expect.any(Error)
      );
    });
  });
});
