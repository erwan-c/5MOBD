describe('Add Address Screen', () => {
    beforeAll(async () => {
      await device.launchApp();
    });
  
    it('should allow adding a new address', async () => {
      await element(by.id('AddAddressTab')).tap(); // Id du bouton tab pour accéder à l'écran
  
      await element(by.id('nameInput')).typeText('Maison');
  
      await element(by.id('descriptionInput')).typeText('Une belle maison au bord de la mer.');
  
      await element(by.id('isPublicSwitch')).tap();
  
      await element(by.id('imagePickerButton')).tap();
  
      await element(by.id('submitButton')).tap();
  
      await expect(element(by.text('Succès'))).toBeVisible();
      await expect(element(by.text('Adresse ajoutée avec succès !'))).toBeVisible();
  
      await expect(element(by.id('HomeTab'))).toBeVisible();
    });
  });
  