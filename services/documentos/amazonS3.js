const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const fs = require("fs");

// cliente
const client = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});
// subida de archivos
const uploadFile = async (file, key) => {
  const stream = fs.createReadStream(file);
  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: key, // id de mongo
    Body: stream,
  };
  // subir archivo
  const command = new PutObjectCommand(uploadParams);

  try {
    const result = await client.send(command);
    return result;
  } catch (error) {
    console.log(error);
  }
};
// Obtener url
const getFileAndUrl = async (id) => {
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME, //required
    Key: id, //required
  });

  try {
    const result = await getSignedUrl(client, command, { expiresIn: 900 });
    return result;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  uploadFile,
  getFileAndUrl,
};
