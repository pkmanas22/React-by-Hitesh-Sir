import { Client, Databases, Query } from 'appwrite'
import conf from '../conf/conf'

export class PostService {
    client = new Client()
    databases;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.databases = new Databases(this.client);

    }

    async createPost({ title, content, featuredImage, userId, status, slug }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            // console.log("Appwrite post service :: createPost :: error ", error)
            return {
                status: 500,
                errMsg: error.message
            };
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            // console.log("Appwrite post service :: updatePost :: error ", error)
            return error;
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            // console.log("Appwrite post service :: deletePost :: error ", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
        } catch (error) {
            // console.log("Appwrite post service :: getPost :: error ", error)
            return error
        }
    }

    async getAllPosts() {
        try {
            const queries = [Query.equal("status", "Active"), Query.orderDesc('$updatedAt')]
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            // console.log("Appwrite post service :: getAllPosts :: error ", error)
            return error
        }
    }

    async getMyPosts(userId) {
        try {
            const queries = [Query.equal('userId', userId), Query.orderDesc('$updatedAt')]
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            // console.log("Appwrite post service :: getMyPosts :: error ", error)
            return error
        }
    }

    async generateAllSlugs() {
        try {
            const allPosts = await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
            )

            const allSlugs = allPosts.documents.map((post) => post.$id)

            return allSlugs;
        } catch (error) {
            // console.log("Appwrite post service :: generateAllSlugs :: error ", error)
            return error
        }
    }
}

const postService = new PostService();
export default postService;