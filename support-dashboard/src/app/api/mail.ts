import emailjs from '@emailjs/browser';
export const sendMail = async (to: string, subject: string, text: string) => {
  const templateParams = {
    to_email: to,
    subject: subject,
    message: text,
  };

  await emailjs.send(
    'YOUR_SERVICE_ID',
    'YOUR_TEMPLATE_ID',
    templateParams,
    'YOUR_PUBLIC_KEY'
  );
  
  return { message: 'המייל נשלח בהצלחה' };
};
