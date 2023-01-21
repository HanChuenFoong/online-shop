const emailjs = require("@emailjs/browser")

const SERVICE_ID = 'service_ir7ekzl'
const TEMPLATE_ID = 'template_zbotb22'
const PUBLIC_KEY = 'sNnMk9O5lHAtxYeug'

function sendEmail(email) {
  var templateParams = {
    recipient: email,
    senderName: 'arcain_test',
    senderEmail: 'no-reply@arcain.io',
  };
 
  emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
      }, function(error) {
        console.log('FAILED...', error);
      });
}

export { sendEmail }