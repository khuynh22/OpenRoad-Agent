import type { Env, Roadmap } from '../types/index.js';

// In-memory cache for MongoDB connection
let cachedClient: any = null;
let cachedDb: any = null;

async function connectToDatabase(env: Env) {
  if (cachedDb) {
    return cachedDb;
  }

  try {
    const { MongoClient } = await import('mongodb');
    
    if (!env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not configured');
    }

    cachedClient = new MongoClient(env.MONGODB_URI);
    await cachedClient.connect();
    
    // Extract database name from URI or use default
    const dbName = env.MONGODB_URI.match(/\.net\/([^?]+)/)?.[1] || 'openroad';
    cachedDb = cachedClient.db(dbName);
    
    console.log('✅ Connected to MongoDB');
    return cachedDb;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Failed to connect to MongoDB');
  }
}

async function getCollection(env: Env) {
  const db = await connectToDatabase(env);
  return db.collection('roadmaps');
}

export async function saveRoadmap(
  roadmap: Omit<Roadmap, '_id'>,
  env: Env
): Promise<Roadmap> {
  try {
    const collection = await getCollection(env);
    const result = await collection.insertOne(roadmap);

    return {
      ...roadmap,
      _id: result.insertedId.toString(),
    };
  } catch (error) {
    console.error('Save roadmap error:', error);
    throw error;
  }
}

export async function getRoadmapByUrl(
  githubUrl: string,
  env: Env
): Promise<Roadmap | null> {
  try {
    const collection = await getCollection(env);
    const roadmap = await collection.findOne(
      { githubUrl },
      { sort: { createdAt: -1 } }
    );

    return roadmap as Roadmap | null;
  } catch (error) {
    console.error('Get roadmap error:', error);
    return null;
  }
}

export async function getRecentRoadmaps(
  limit: number = 10,
  env: Env
): Promise<Roadmap[]> {
  try {
    const collection = await getCollection(env);
    const roadmaps = await collection
      .find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();

    return roadmaps as Roadmap[];
  } catch (error) {
    console.error('Get recent roadmaps error:', error);
    return [];
  }
}

export async function updateRoadmap(
  id: string,
  updates: Partial<Roadmap>,
  env: Env
): Promise<boolean> {
  try {
    const { ObjectId } = await import('mongodb');
    const collection = await getCollection(env);
    
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...updates,
          updatedAt: new Date(),
        },
      }
    );

    return result.modifiedCount > 0;
  } catch (error) {
    console.error('Update roadmap error:', error);
    return false;
  }
}

export async function deleteRoadmap(id: string, env: Env): Promise<boolean> {
  try {
    const { ObjectId } = await import('mongodb');
    const collection = await getCollection(env);
    
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  } catch (error) {
    console.error('Delete roadmap error:', error);
    return false;
  }
}

export async function getCachedRoadmap(
  githubUrl: string,
  env: Env,
  maxAgeMs: number = 3600000
): Promise<Roadmap | null> {
  const roadmap = await getRoadmapByUrl(githubUrl, env);
  
  if (!roadmap) {
    return null;
  }

  const createdAt = new Date(roadmap.createdAt).getTime();
  const now = Date.now();
  
  if (now - createdAt > maxAgeMs) {
    return null;
  }

  return roadmap;
}
