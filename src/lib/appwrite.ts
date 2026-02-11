import { Client, Account, Databases, ID } from 'appwrite';

// TODO: Replace with your actual Appwrite project details
const appwriteConfig = {
  endpoint: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1',
  project: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || 'your-project-id',
  database: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || 'your-database-id',
};

export const client = new Client()
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.project);

export const account = new Account(client);
export const databases = new Databases(client);

// Collections
export const COLLECTIONS = {
  USERS: 'users',
  ACCOUNTS: 'accounts',
  TRANSACTIONS: 'transactions',
  TRANSFERS: 'transfers',
  PLAID_ITEMS: 'plaid_items',
} as const;

// Helper functions
export const createDocument = async (collectionId: string, data: any, userId?: string) => {
  try {
    const documentId = ID.unique();
    const document = await databases.createDocument(
      appwriteConfig.database,
      collectionId,
      documentId,
      {
        ...data,
        userId: userId || data.userId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    );
    return document;
  } catch (error) {
    console.error('Error creating document:', error);
    throw error;
  }
};

export const listDocuments = async (collectionId: string, queries?: string[]) => {
  try {
    const documents = await databases.listDocuments(
      appwriteConfig.database,
      collectionId,
      queries
    );
    return documents;
  } catch (error) {
    console.error('Error listing documents:', error);
    throw error;
  }
};

export const updateDocument = async (collectionId: string, documentId: string, data: any) => {
  try {
    const document = await databases.updateDocument(
      appwriteConfig.database,
      collectionId,
      documentId,
      {
        ...data,
        updatedAt: new Date().toISOString(),
      }
    );
    return document;
  } catch (error) {
    console.error('Error updating document:', error);
    throw error;
  }
};

export const deleteDocument = async (collectionId: string, documentId: string) => {
  try {
    await databases.deleteDocument(
      appwriteConfig.database,
      collectionId,
      documentId
    );
    return true;
  } catch (error) {
    console.error('Error deleting document:', error);
    throw error;
  }
};
