//const AWS = require('aws-sdk');
const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');
const axios = require('axios');
const sharp = require('sharp');
const path = require('path');
const os = require('os');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { FormData } = require('formdata-node')
const { fileFromPath } = require('formdata-node/file-from-path')
const expressAsyncHandler = require('express-async-handler');
const { getHTMLFileContent, authenticateAdmin, getPocketbaseClient } = require('../utils/pocketbaseUtil');
const crypto = require('crypto');
const puppeteer = require("puppeteer");
const adminModel = require("../models/admin/adminModel");
const jwt = require('jsonwebtoken');
const { verifyAccessToken } = require('../services/security/tokenService');

require('dotenv').config();

const s3Client = new S3Client({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});

//const pb = new Pocketbase(process.env.DATASORCE_URL);

const allowedAudioTypes = [
    'audio/mpeg',
    'audio/wav',
    'audio/x-wav',
    'audio/ogg',
    'audio/aac',
    'audio/flac',
    'audio/mp4',
    'audio/webm',
    'audio/x-aac',
    'audio/x-midi',
    'audio/mpeg',
    'audio/mp3',
    'audio/mp4',
    'audio/x-m4a',
    'audio/aac',
    'audio/x-aac',
    'audio/ogg',
    'audio/opus',
    'audio/wav',
    'audio/x-wav',
    'audio/webm',
    'audio/flac',
    'audio/x-flac',
    'audio/amr',
    'audio/3gpp',
    'audio/3gpp2',
    'audio/basic',
    'audio/vnd.wave',
    'audio/vnd.rn-realaudio',
    'audio/vnd.dts',
    'audio/vnd.dts.hd',
    'audio/vnd.digital-winds',
    'audio/vnd.lucent.voice',
    'audio/vnd.ms-playready.media.pya',
    'audio/vnd.nuera.ecelp4800',
    'audio/vnd.nuera.ecelp7470',
    'audio/vnd.nuera.ecelp9600',
    'audio/vnd.sealedmedia.softseal.mpeg',
    'audio/x-ms-wma',
    'audio/x-ms-wax',
    'audio/x-pn-realaudio',
    'audio/x-pn-realaudio-plugin',
    'audio/x-realaudio',
    'audio/x-adpcm',
    'audio/x-aiff',
    'audio/x-au',
    'audio/x-gsm',
    'audio/x-matroska',
    'audio/x-mpegurl',
    'audio/x-scpls',
    'audio/x-sd2',
    'audio/x-vorbis+ogg'
];

// Max file size in bytes (~150 MB)
const MAX_FILE_SIZE = 150 * 1024 * 1024;
let browser;

const getBrowser = async () => {
    if (!browser) {
        browser = await puppeteer.launch({
            args: ["--no-sandbox"],
        });
    }
    return browser;
};

const getUserFromToken = (req) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new Error("Unauthorized: No token provided");
    }

    const token = authHeader.split(" ")[1];
    return verifyAccessToken(token);
};

// upload file
const uploadFile = async (req, res) => {

    const file = req.file;

    if (!file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }
    console.log("Here comessss", file.mimetype, file.size);

    try {
        // Handle Image file upload
        if (file.mimetype.startsWith('image/')) {

            // Optimize storage, create buffer and convert image in one format 
            sharp(file.path)
                .webp({ quality: 80 })
                .toBuffer(async (err, buffer) => {
                    if (err) {
                        return res.status(500).send('Error processing image: ' + err.message);
                    }



                    const fileNameWithoutExt = path.basename(file.originalname, path.extname(file.originalname));
                    const uniqueKey = `${fileNameWithoutExt}-${Date.now()}.webp`;
                    const params = {
                        Bucket: 'ultimate-health-new',
                        Key: uniqueKey,
                        Body: buffer,
                        ContentType: 'image/webp',
                    };

                    const command = new PutObjectCommand(params);
                    await s3Client.send(command);

                    /*
                    s3.putObject(params, (err, data) => {
                        // Delete the temporary file after upload
                        console.log(data);
                        fs.unlink(file.path, (err) => {
                            if (err) console.error('Unlink error', err);
                        });

                        console.log("Error", err);
                        if (err) {
                            return res.status(500).json({ message: 'Error uploading file to S3: ' + err.message });

                        }
                        res.status(200).send({ message: 'Image uploaded successfully', key: `${fileNameWithoutExt}.webp` });
                    });
                    */

                    fs.unlink(file.path, (err) => {
                        if (err) console.error('Unlink error', err);
                    });

                    res.status(200).send({ message: 'Image uploaded successfully', key: uniqueKey });
                });
        } else if (file.mimetype === 'text/html') {
            // Handle html file upload
            const params = {
                Bucket: 'ultimate-health-new',
                Key: `${file.originalname}`, // Keep original extension, unique file name needed
                Body: fs.createReadStream(file.path), // Use stream for larger files
                ContentType: 'text/html; charset=UTF-8'
            };

            const command = new PutObjectCommand(params);
            await s3Client.send(command);

            fs.unlink(file.path, (err) => {
                if (err) console.error('Unlink error', err);
            });

            /*
            s3.putObject(params, (err, data) => {
                // Delete the temporary file after upload
                fs.unlink(file.path, (err) => {
                    if (err) console.error('Unlink error', err);
                });

                if (err) {
                    return res.status(500).json({ message: 'Error uploading file to S3: ' + err.message });

                }
               
            });
            */

            res.status(200).send({ message: 'Text or HTML uploaded successfully', key: `${file.originalname}` });
        }
        else if (allowedAudioTypes.includes(file.mimetype)) {

            if (file.size > MAX_FILE_SIZE) {
                return res.status(400).json({ error: "File exceeds 150 MB limit" });
            }
            // Handle audio file upload
            const params = {
                Bucket: 'ultimate-health-new',
                Key: `${file.originalname}`, // Keep original filename and extension
                // Body: fs.createReadStream(file.path),
                ContentType: file.mimetype
            };

            const command = new PutObjectCommand(params);
            //await s3Client.send(command);

            const uploadUrl = await getSignedUrl(s3Client, command, { expiresIn: 900 });

            const buffer = fs.readFileSync(file.path);

            await axios.put(uploadUrl, buffer, {
                headers: {
                    'Content-Type': file.mimetype,
                    'Content-Length': buffer.length,
                },
                maxBodyLength: Infinity,
            });

            fs.unlink(file.path, (err) => {
                if (err) console.error('Unlink error', err);
            });
            /*
            s3.putObject(params, (err, data) => {
                fs.unlink(file.path, (err) => {
                    if (err) console.error('Unlink error', err);
                });

                if (err) {
                    return res.status(500).json({ message: 'Error uploading MP3 file to S3: ' + err.message });
                }
                res.status(200).send({ message: 'MP3 file uploaded successfully', key: `${file.originalname}` });
            });
            */

            res.status(200).send({ message: 'Audio file uploaded successfully', key: `${file.originalname}`, uploadUrl });
        } else {
            // Handle other file types (e.g., PDF, CSV, etc.), as of now not needed
            return res.status(400).json({ message: 'Unsupported file type.' });
        }
    } catch (err) {
        console.log("Upload File Error", err);
        res.status(500).json({ message: "Failed to upload your file" });
    }
}

const uploadAgreementPDF = expressAsyncHandler(
    async (req, res) => {
        try {
            const { html, fullName } = req.body;

            if (!html || !fullName) {
                return res.status(400).json({ message: "HTML and full name are required" });
            }

            const decoded = getUserFromToken(req);

            const admin = await adminModel.findOne({ email: decoded.email });
            // const admin = await adminModel.findById(userId);

            if (!admin) {
                return res.status(404).json({ message: "Admin not found" });
            }


            const normalize = (str) =>
                str.toLowerCase().replace(/\s+/g, " ").trim();

            const inputName = normalize(fullName);
            const dbName = normalize(admin.user_name);


            if (!inputName.includes(dbName) || !dbName.includes(inputName)) {
                return res.status(403).json({
                    message: "Full name does not match your account name",
                });
            }
            if (!html.includes("data:image")) {
                return res.status(400).json({ message: "Signature missing" });
            }

            // Verify checkbox is checked in the HTML
            if (!html.includes('checked') || !html.includes('agreeCheckbox')) {
                return res.status(400).json({ message: "Agreement must be accepted" });
            }

           
          
            // Add print-specific styles for proper page breaks and full content display
            const cleanedHtml = html
                .replace(/max-height:\s*500px;/g, 'max-height: none;')
                .replace(/max-height:\s*400px;/g, 'max-height: none;')
                .replace(/overflow-y:\s*auto;/g, 'overflow-y: visible;')
                .replace(/overflow:\s*hidden;/g, 'overflow: visible;')
                .replace(/<\/style>/, `
                    /* PDF-specific styles - remove all scrollable/height restrictions */
                    body {
                        background: white !important;
                        padding: 0 !important;
                        min-height: auto !important;
                        display: block !important;
                    }
                    .agreement-container {
                        max-width: 100% !important;
                        width: 100% !important;
                        box-shadow: none !important;
                        border-radius: 0 !important;
                        overflow: visible !important;
                    }
                    .content {
                        max-height: none !important;
                        height: auto !important;
                        overflow: visible !important;
                        overflow-y: visible !important;
                        page-break-inside: auto;
                        padding: 20px 40px !important;
                    }
                    .header {
                        page-break-after: avoid;
                    }
                    h2 {
                        page-break-after: avoid;
                        page-break-inside: avoid;
                        margin-top: 20px;
                    }
                    .highlight {
                        page-break-inside: avoid;
                    }
                    ul, ol {
                        page-break-inside: auto;
                    }
                    li {
                        page-break-inside: avoid;
                    }
                    .signature-section {
                        page-break-before: auto;
                        page-break-inside: avoid;
                    }
                    .footer-section {
                        page-break-inside: avoid;
                    }
                    .btn, .btn-clear {
                        display: none !important;
                    }
                    @media print {
                        body {
                            background: white !important;
                            padding: 0 !important;
                            min-height: auto !important;
                        }
                        .content {
                            max-height: none !important;
                            overflow: visible !important;
                            page-break-inside: auto;
                        }
                    }
                </style>`);

         
            const browserInstance = await getBrowser();
            const page = await browserInstance.newPage();

            let pdfBuffer;

            try {
                await page.setContent(cleanedHtml, {
                    waitUntil: "networkidle0",
                });

                // Force full content visibility by removing height restrictions
                await page.evaluate(() => {
                    // Remove all max-height and overflow constraints
                    const contentDiv = document.querySelector('.content');
                    if (contentDiv) {
                        contentDiv.style.maxHeight = 'none';
                        contentDiv.style.height = 'auto';
                        contentDiv.style.overflow = 'visible';
                        contentDiv.style.overflowY = 'visible';
                    }

                    const container = document.querySelector('.agreement-container');
                    if (container) {
                        container.style.overflow = 'visible';
                        container.style.maxWidth = '100%';
                    }

                    // Ensure body shows all content
                    document.body.style.overflow = 'visible';
                    document.body.style.height = 'auto';
                });

                // Wait for signature image to load (base64 images need time to render)
                await page.waitForSelector('img[src^="data:image"]', {
                    timeout: 5000
                }).catch(() => {
                    console.log("No signature image found or timeout");
                });

                // Give additional time for image rendering
                await page.evaluate(() => {
                    return new Promise((resolve) => {
                        const img = document.querySelector('img[src^="data:image"]');
                        if (img) {
                            if (img.complete) {
                                resolve();
                            } else {
                                img.onload = () => resolve();
                                img.onerror = () => resolve();
                            }
                        } else {
                            resolve();
                        }
                    });
                });

                pdfBuffer = await page.pdf({
                    format: "A4",
                    printBackground: true,
                    margin: {
                        top: '20mm',
                        right: '15mm',
                        bottom: '20mm',
                        left: '15mm'
                    },
                    preferCSSPageSize: false,
                    omitBackground: false,
                });

            } finally {
                await page.close();
            }

            // 🧾 Unique key
            const uniqueKey = `agreements-${admin._id}-${Date.now()}-${crypto.randomUUID()}.pdf`;

            const params = {
                Bucket: "ultimate-health-new",
                Key: uniqueKey,
                Body: pdfBuffer,
                ContentType: "application/pdf",
            };

            const command = new PutObjectCommand(params);
            await s3Client.send(command);

            admin.isVerified = true;
            admin.signature_url = uniqueKey;

            await admin.save();

            res.status(200).send({
                message: "Agreement uploaded successfully",
                key: uniqueKey,
                pdfUrl: `https://uhsocial.in/api/getFile/${uniqueKey}`,
            });

        } catch (err) {
            console.log("Upload Agreement Error", err);
            res.status(500).json({
                message: "Failed to upload agreement",
            });
        }
    }
);

// get file
const getFile = async (req, res) => {
    const params = {
        Bucket: 'ultimate-health-new',
        Key: req.params.key,
    };

    const command = new GetObjectCommand(params);

    try {
        const data = await s3Client.send(command);
        res.setHeader('Content-Type', data.ContentType);
        data.Body.pipe(res);
    } catch (err) {
        console.log("Error fetching file:", err);
        return res.status(404).send(err);
    }
}

// Delete File
// We will  not usually remove anything from bucket, we only remove it from our dataase
const deleteFile = async (req, res) => {
    const params = {
        Bucket: 'ultimate-health-new',
        Key: req.params.key,
    };

    const command = new DeleteObjectCommand(params);

    try {
        await s3Client.send(command);
        res.status(200).send({ message: 'File deleted successfully' });
    } catch (err) {
        console.log("Error deleting file:", err);
        return res.status(404).send(err);
    }
};

const deleteFileFn = async (url) => {
    const params = {
        Bucket: 'ultimate-health-new',
        Key: url,
    };
    const command = new DeleteObjectCommand(params);
    try {
        await s3Client.send(command);
    } catch (err) {
        console.log("Error deleting file:", err);
    }
};

/** Pocketbase work */

// User app
const uploadFileToPocketBase = expressAsyncHandler(

    async (req, res) => {
        try {

            const pb = await getPocketbaseClient();
            await authenticateAdmin(pb);
            const { record_id, title, htmlContent } = req.body;


            if (!title && !htmlContent) {
                return res.status(400).send({ message: 'Please provide title and htmlContent' });
            }

            // create html file
            const fileName = `${title?.replace(/\s+/g, '_') || 'file'}.html`;
            const filePath = path.join(os.tmpdir(), fileName);
            fs.writeFileSync(filePath, htmlContent, 'utf8');

            const formData = new FormData();
            formData.append('title', title || 'Untitled');
            const file = await fileFromPath(filePath);
            //const file = await filesFromPaths(filePath);
            //const [file] = await filesFromPaths([filePath])
            formData.append('html_file', file);



            let record;
            if (record_id) {
                record = await pb.collection('content').update(record_id, formData);

                if (!record) {
                    return res.status(404).json({ message: 'Record not found' });
                }
            }
            else {
                record = await pb.collection('content').create(formData);
            }

            fs.unlinkSync(filePath);
            return res.status(200).json({
                message: 'File uploaded successfully',
                recordId: record.id,
                html_file: record.html_file
            });
        } catch (err) {
            console.log("Error uploading file to pocketbase:", err);
            return res.status(500).json({
                message: 'Internal server error'
            });
        }
    }
)

const uploadHTMLToPocketBase = expressAsyncHandler(
    async (req, res) => {
        try {
            const pb = await getPocketbaseClient();
            await authenticateAdmin(pb);

            const { record_id, title } = req.body;
            const uploadedFile = req.file;

            if (!title && !uploadedFile) {
                return res.status(400).send({ message: 'Please provide title and file' });
            }


            const htmlContent = fs.readFileSync(uploadedFile.path, 'utf8');


            const fileName = `${title?.replace(/\s+/g, '_') || 'file'}.html`;
            const filePath = path.join(os.tmpdir(), fileName);
            fs.writeFileSync(filePath, htmlContent, 'utf8');


            const formData = new FormData();
            formData.append('title', title || 'Untitled');
            const file = await fileFromPath(filePath);
            formData.append('html_file', file);


            let record;
            if (record_id) {
                record = await pb.collection('content').update(record_id, formData);

                if (!record) {
                    return res.status(404).json({ message: 'Record not found' });
                }
            } else {
                record = await pb.collection('content').create(formData);
            }

            // cleanup
            fs.unlinkSync(filePath);
            if (uploadedFile.path) {
                fs.unlinkSync(uploadedFile.path);
            }
            return res.status(200).json({
                message: 'File uploaded successfully',
                recordId: record.id,
                html_file: record.html_file,
            });
        } catch (err) {
            console.log("Error uploading file to pocketbase:", err);
            return res.status(500).json({
                message: 'Internal server error'
            });
        }
    }
);

// User & Admin
const getPbFile = expressAsyncHandler(
    async (req, res) => {

        try {

            const id = req.params.id;
            const result = await getHTMLFileContent('content', id);
            //const record = await pb.collection('content').getOne(id);
            //const htmlFileUrl = pb.files.getURL(record, record.html_file);

            //const response = await fetch(htmlFileUrl);
            //const htmlContent = await response.text();

            return res.status(200).json(result);
        } catch (err) {
            console.log("Error getting file from pocketbase:", err);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
)

// User app
const uploadImprovementFileToPocketbase = expressAsyncHandler(
    async (req, res) => {

        const { record_id, user_id, article_id, title, improvement_id, htmlContent } = req.body;

        if (!user_id || !article_id || !improvement_id || !htmlContent || !title) {
            return res.status(400).json({ message: 'Missing required fields: user_id, article_id, improvement_id , htmlContent, title' });
        }

        try {

            const pb = await getPocketbaseClient();
            await authenticateAdmin(pb);
            const formData = new FormData();
            formData.append('user_id', user_id);
            formData.append('article_id', article_id);
            formData.append('improvement_id', improvement_id);

            // Create Html file
            const fileName = `${title?.replace(/\s+/g, '_') || 'file'}.html`;
            const filePath = path.join(os.tmpdir(), fileName);
            fs.writeFileSync(filePath, htmlContent, 'utf8');

            const file = await fileFromPath(filePath);
            formData.append('edited_html_file', file);

            let record;
            if (record_id) {
                record = await pb.collection('edit_requests').update(record_id, formData);

                if (!record) {
                    return res.status(404).json({ message: 'Record not found' });
                }
            }
            else {
                record = await pb.collection('edit_requests').create(formData);
            }

            fs.unlinkSync(filePath);

            return res.status(200).json({
                message: 'File uploaded successfully',
                recordId: record.id,
                html_file: record.edited_html_file
            });

        } catch (err) {
            console.log("Error uploading file to pocketbase:", err);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
)

// User & Admin
const getIMPFile = expressAsyncHandler(

    async (req, res) => {

        try {
            const { recordid, articleRecordId } = req.query;

            if (!recordid && !articleRecordId) {
                res.status(400).json({ message: 'Invalid request: missing recordid or articleRecordId' });
                return;
            }
            let result;
            console.log('recordid', recordid);
            if (!recordid || recordid === 'undefined' || recordid === 'null') {

                console.log("Enter article")
                result = await getHTMLFileContent('content', articleRecordId);

            } else {
                console.log("Enter record id")
                result = await getHTMLFileContent('edit_requests', recordid);
            }


            return res.status(200).json(result);
        } catch (err) {
            console.log("Error getting file from pocketbase:", err);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
)

// Admin app
const publishImprovementFileFromPocketbase = expressAsyncHandler(
    async (req, res) => {
        const { record_id, article_id } = req.body;

        if (!record_id || !article_id) {
            return res.status(400).json({ message: 'Missing required fields: record_id, article_id' });
        }

        const tempFileName = `improvement_${Date.now()}.html`;
        const tempFilePath = path.join(os.tmpdir(), tempFileName);

        try {
            const pb = await getPocketbaseClient();
            await authenticateAdmin(pb);

            let improvementRecord;
            try {
                improvementRecord = await pb.collection('edit_requests').getOne(record_id);
            } catch (err) {
                console.log(err);
                return res.status(200).json({ message: 'Improvement record has no HTML file to publish' });
            }

            if (!improvementRecord.edited_html_file) {
                return res.status(400).json({ message: 'Improvement record has no HTML file to publish' });
            }


            const fileUrl = pb.files.getUrl(improvementRecord, improvementRecord.edited_html_file, { download: true });
            const response = await axios.get(fileUrl, { responseType: 'stream' });

            const writer = fs.createWriteStream(tempFilePath);
            await new Promise((resolve, reject) => {
                response.data.pipe(writer);
                writer.on('finish', resolve);
                writer.on('error', reject);
            });


            const formData = new FormData();
            const file = await fileFromPath(tempFilePath);
            formData.append('html_file', file);

            const record = await pb.collection('content').update(article_id, formData);

            await pb.collection('edit_requests').delete(record_id);


            fs.unlinkSync(tempFilePath);

            return res.status(200).json({
                message: 'Improvement published successfully',
                recordId: record.id,
                html_file: record.html_file
            });

        } catch (err) {
            console.log("❌ Error publishing improvement file from pocketbase:", err);

            // 🧹 Always attempt cleanup
            if (fs.existsSync(tempFilePath)) {
                fs.unlinkSync(tempFilePath);
            }

            return res.status(500).json({ message: 'Internal server error' });
        }
    }
);


// Admin App

const deleteImprovementRecordFromPocketbase = expressAsyncHandler(
    async (req, res) => {

        const { record_id } = req.params;

        if (!record_id) {
            return res.status(400).json({ message: 'Missing required fields: record_id' });
        }
        try {

            const pb = await getPocketbaseClient();
            await authenticateAdmin(pb);
            // edit_requests
            // content

            let improvementRecord;
            try {
                improvementRecord = await pb.collection('edit_requests').getOne(record_id);
            } catch (err) {
                return res.status(404).json({ message: 'Record not found in edit_requests' });
            }
            // const improvementRecord = await pb.collection('edit_requests').getOne(record_id);

            if (!improvementRecord) {
                return res.status(404).json({ message: 'Record not found in edit_requests' });
            }

            // delete record
            await pb.collection('edit_requests').delete(record_id);

            return res.status(200).json({
                status: true,
                message: 'Improvement deleted successfully',
            });


        } catch (err) {
            console.log("Error deleteing improvement file from pocketbase:", err);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
)





const deletePocketbaseRecord = expressAsyncHandler(
    async (req, res) => {
        const { collectionName, recordId } = req.params;

        if (!collectionName || !recordId) {
            return res.status(400).json({ message: 'Missing required fields: collectionName or recordId' });
        }

        try {
            const pb = await getPocketbaseClient();
            await authenticateAdmin(pb);

            let record;
            try {
                record = await pb.collection(collectionName).getOne(recordId);
            } catch (err) {
                return res.status(404).json({ message: 'Record not found in PocketBase' });
            }

            if (!record) {
                return res.status(404).json({ message: 'Record not found' });
            }

            // delete record
            await pb.collection(collectionName).delete(recordId);

            return res.status(200).json({
                status: true,
                message: `Record ${recordId} deleted successfully from ${collectionName}`,
            });

        } catch (err) {
            console.error(`Error deleting record from pocketbase [${collectionName} - ${recordId}]:`, err);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
);

module.exports = {
    uploadFile,
    uploadAgreementPDF,
    getFile,
    deleteFile,
    uploadFileToPocketBase,
    uploadHTMLToPocketBase,
    getPbFile,
    getIMPFile,
    uploadImprovementFileToPocketbase,
    publishImprovementFileFromPocketbase,
    deleteImprovementRecordFromPocketbase,
    deletePocketbaseRecord,
    deleteFileFn
};