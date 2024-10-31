import { Client, Storage, ID } from 'appwrite'
import conf from '../conf/conf';

export class FileService {
    client = new Client();
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.bucket = new Storage(this.client);
    }

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            // console.log("Appwrite file service :: uploadFile :: error ", error)
            return error;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            // console.log("Appwrite file service :: deleteFile :: error ", error)
            return false
        }
    }

    getFilePreview(fileId) {
        try {
            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId,
            )
        } catch (error) {
            // console.log("Appwrite file service :: getFilePreview :: error ", error)
            return null;
        }
    }

    downloadFile(fileId) {
        try {
            this.bucket.getFileDownload(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            // console.log("Appwrite file service :: downloadFile :: error ", error)
            return false
        }
    }
}

const fileService = new FileService();

export default fileService;