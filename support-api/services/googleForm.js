import axios from 'axios';

const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdIP5TLqI7zOnOE2ma6jtKPebyCE06q7XECpTVc8nwh8FbVOg/formResponse";

export const sendDataToGoogle = async (processedData) => {
    try {
        await axios.post(GOOGLE_FORM_URL, processedData);
        console.log("Data successfully sent to Google Form.");
    } catch (error) {
        console.error("Error submitting to Google Forms:", error.message);
        // זורקים שגיאה כדי שהשכבה שמעל תטפל בה
        throw new Error("Failed to submit data to Google Form.");
    }
};