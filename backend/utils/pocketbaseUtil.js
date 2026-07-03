
//const Pocketbase = require('pocketbase');

//const pb = new Pocketbase(process.env.DATASORCE_URL);

let cachePBClient = null;

const getHTMLFileContent = async (collectionName, recordId) => {
    const pb = await getPocketbaseClient();
    await authenticateAdmin(pb);

    const record = await pb.collection(collectionName).getOne(recordId);

    const fileName = collectionName === 'content' ? record.html_file : record.edited_html_file;

    const htmlFileUrl = pb.files.getURL(record, fileName);
    const response = await fetch(htmlFileUrl);
    const htmlContent = await response.text();

    return { htmlContent, fileName };
}


const authenticateAdmin = async (pb) => {


    const ADMIN_EMAIL = process.env.DATASOURCE_USERNAME;
    const ADMIN_PASSWORD = process.env.DATASOURCE_PASSWORD;

    //console.log('admin email',ADMIN_EMAIL);
    // console.log('admin-pass',ADMIN_PASSWORD);

    try {

        if(pb && pb.authStore){
          pb.authStore.clear();
        }
      
        const authData = await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
        //const authData = await pb.collection('users').authWithPassword('test@example.com', '1234567890');
        console.log('✅ Admin authenticated');
        return authData;
    } catch (err) {
        // console.error("Admin authentication failed:", err.message);

        const mfaId = err.response?.mfaId;
        if (!mfaId) {
            throw err; // not mfa -> rethrow
        }

        // the user needs to authenticate again with another auth method, for example OTP
        const result = await pb.collection('users').requestOTP(process.env.USER_NAME);
        // ... show a modal for users to check their email and to enter the received code ...
        await pb.collection('users').authWithOTP(result.otpId, 'EMAIL_CODE', { 'mfaId': mfaId });

    }
};

const getPocketbaseClient = async () => {

    if (cachePBClient) {
        return cachePBClient;
    }
    const Pocketbase = (await import('pocketbase')).default;
    const client = new Pocketbase(process.env.DATASOURCE_URL);
    cachePBClient = client;
    return client;
}


const deleteArticleRecordFromPocketbase = async (record_id) => {

    if (!record_id) {
        return;
    }
    try {
        const pb = await getPocketbaseClient();
        await authenticateAdmin(pb);
        const articleRecord = await pb.collection('content').get(record_id);

        if (!articleRecord) {
            return;
        }
        // delete record
        await pb.collection('content').delete(record_id);

    } catch (err) {
        console.log("Error deleteing improvement file from pocketbase:", err);
       // return res.status(500).json({ message: 'Internal server error' });
    }
}


module.exports = {
    getHTMLFileContent,
    authenticateAdmin,
    getPocketbaseClient,
    deleteArticleRecordFromPocketbase
};