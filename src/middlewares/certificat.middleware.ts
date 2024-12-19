import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();
const keyPath = process.env.SSL_KEY_PATH as string;
const certPath = process.env.SSL_CERT_PATH as string;
export function loadCertificate() {
    let certificatOptions;
    try {
        certificatOptions = {
            key: fs.readFileSync(keyPath),
            cert: fs.readFileSync(certPath)
        };
    } catch (error) {
        console.error("Erreur lors du chargement des certificats SSL :", error);
        process.exit(1);
    }
    return certificatOptions;
}