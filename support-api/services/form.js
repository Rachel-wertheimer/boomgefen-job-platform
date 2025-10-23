import { sendDataToGoogle } from "./googleForm.js";


export const handleFormSubmission = async (formData) => {
    const postData = new URLSearchParams();

    postData.append("entry.470616472", formData.fullName || "");
    postData.append("entry.947626220", formData.phone || "");
    postData.append("entry.54062267", formData.age || "");
    postData.append("entry.2125959021", formData.portfolioLink || "");
    postData.append("entry.1561389545", formData.educationExperience || "");
    postData.append("entry.2008842688", formData.additionalSkills || "");
    postData.append("entry.1231308682", formData.expectations || "");

    if (formData.professions) {
        const professionsArray = Object.keys(formData.professions).filter(key => formData.professions[key]);
        professionsArray.forEach(prof => {
            postData.append("entry.343940199", prof);
        });
    }

    if (formData.isDetailsCorrect) postData.append("entry.2064721432", "אני מאשרת שהפרטים שמילאתי בשאלון זה נכונים ומדויקים.");
    if (formData.isCommitteeApproved) postData.append("entry.2064721432", "אני מאשרת שאני מסכימה שהוועדה של BOOM אנרגית הפקה תבחן את מועמדותי.");
    if (formData.isReceivingOffers) postData.append("entry.2064721432", "אני מאשרת לקבל הצעות ומייל מBOOM אנרגית הפקה");

    await sendDataToGoogle(postData);
};