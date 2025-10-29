import emailjs from '@emailjs/browser';

// קריאת משתני סביבה
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

export const sendMail = async (to: string, subject: string, text: string) => {
  const templateParams = {
    to_email: to,
    subject: subject,
    message: text,
  };

  try {
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );
    
    return { message: 'המייל נשלח בהצלחה' };
  } catch (error) {
    console.error('שגיאה בשליחת מייל:', error);
    throw new Error('שגיאה בשליחת המייל. אנא נסי שוב מאוחר יותר.');
  }
};
