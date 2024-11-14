describe('UserLocationMap Tests', () => {
    beforeAll(async () => {
      await device.launchApp();
    });
  
    it('should display the loading indicator initially', async () => {
      await expect(element(by.id('loadingIndicator'))).toBeVisible();
    });
  
    it('should display the map and user marker after loading', async () => {
      await waitFor(element(by.id('loadingIndicator'))).toBeNotVisible();
  
      await expect(element(by.id('mapView'))).toBeVisible();
  
      await expect(element(by.id('userMarker'))).toBeVisible();
    });
  
    it('should show error message if location is unavailable', async () => {
      await expect(element(by.id('noLocationText'))).toBeVisible();
    });
  });
  