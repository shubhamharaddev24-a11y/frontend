// API Test Utility - Run this in browser console to test API connection
import { api, authService, leadService, serviceService, bookingService } from '../services';

export const testAPIConnection = async () => {
  console.log('🧪 Testing API Connection...');
  
  try {
    // Test basic API health check
    console.log('1. Testing API health...');
    const healthResponse = await api.get('/health');
    console.log('✅ Health check:', healthResponse.data);
    
    // Test services endpoint
    console.log('2. Testing services endpoint...');
    const servicesResponse = await serviceService.getAllServices();
    console.log('✅ Services:', servicesResponse.data);
    
    // Test lead creation
    console.log('3. Testing lead creation...');
    const testLead = {
      name: 'Test User',
      phone: '1234567890',
      service: 'Photography',
      message: 'Test lead from frontend',
      source: 'website',
      status: 'new'
    };
    const leadResponse = await leadService.createLead(testLead);
    console.log('✅ Lead created:', leadResponse.data);
    
    console.log('🎉 All API tests passed!');
    return true;
  } catch (error) {
    console.error('❌ API Test Failed:', error);
    return false;
  }
};

// Export for manual testing in browser console
if (typeof window !== 'undefined') {
  window.testAPI = testAPIConnection;
}
