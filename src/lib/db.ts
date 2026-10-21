import mongoose from "mongoose";

const globalForMongo = globalThis as unknown as {
  mongoosePromise?: Promise<typeof mongoose> | null;
  contactStore?: ContactRecord[];
};

export type ContactRecord = {
  id: string;
  name: string;
  email: string;
  projectType: string;
  budget?: string;
  timeline?: string;
  message: string;
  createdAt: string;
  emailDelivered: boolean;
  emailError?: string;
};

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, index: true },
    projectType: { type: String, required: true },
    budget: String,
    timeline: String,
    message: { type: String, required: true },
    emailDelivered: { type: Boolean, default: false },
    emailError: String,
  },
  { timestamps: true },
);

function getContactModel() {
  return (
    mongoose.models.Contact ||
    mongoose.model("Contact", contactSchema)
  );
}

export function isMongoConfigured() {
  return Boolean(process.env.MONGODB_URI);
}

export async function connectMongo() {
  const uri = process.env.MONGODB_URI;
  if (!uri) return null;

  if (!globalForMongo.mongoosePromise) {
    globalForMongo.mongoosePromise = mongoose.connect(uri, {
      bufferCommands: false,
    });
  }

  await globalForMongo.mongoosePromise;
  return mongoose;
}

export async function saveContact(
  input: Omit<ContactRecord, "id" | "createdAt">,
): Promise<ContactRecord> {
  if (isMongoConfigured()) {
    await connectMongo();
    const Contact = getContactModel();
    const doc = await Contact.create(input);
    return {
      id: String(doc._id),
      name: doc.name,
      email: doc.email,
      projectType: doc.projectType,
      budget: doc.budget,
      timeline: doc.timeline,
      message: doc.message,
      createdAt: (doc.createdAt as Date).toISOString(),
      emailDelivered: doc.emailDelivered,
      emailError: doc.emailError,
    };
  }

  if (!globalForMongo.contactStore) globalForMongo.contactStore = [];
  const record: ContactRecord = {
    id: `local-${Date.now()}`,
    createdAt: new Date().toISOString(),
    ...input,
  };
  globalForMongo.contactStore.unshift(record);
  return record;
}
