// Test script for email functionality
const EmailService = require('./services/emailService.ts');

async function testEmailService() {
  console.log('🧪 Testing HOLY-MARKET Email Service...');
  
  const emailService = EmailService.getInstance();
  
  const testData = {
    businessName: 'Test Christian Business',
    ownerName: 'Test Owner',
    email: 'test@example.com',
    phone: '27123456789',
    whatsappNumber: '27123456789',
    city: 'Johannesburg',
    category: 'Consulting',
    website: 'https://testbusiness.com',
    description: 'A test Christian business for development purposes.',
    churchName: 'Test Church',
    christianDuration: '5-10 years',
    churchInvolvement: 'Member and volunteer',
    location: 'Johannesburg, South Africa',
    country: 'South Africa',
  };
  
  console.log('📤 Sending test email...');
  const result = await emailService.sendApprovalRequest(testData);
  
  if (result) {
    console.log('✅ Test email sent successfully!');
    console.log('📧 Check your email at: evolutionmediasa@gmail.com');
  } else {
    console.log('❌ Test email failed');
    console.log('🔍 Check console logs for error details');
  }
}

// Run the test
testEmailService().catch(console.error);
