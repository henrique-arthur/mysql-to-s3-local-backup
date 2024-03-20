import { S3Client } from '@aws-sdk/client-s3'
import { Upload } from "@aws-sdk/lib-storage"
import fs from 'fs'

const client = new S3Client({
  region: 'sa-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
})

export const uploadFileToS3 = async (filePath, fileName) => {
  try {
    const upload = new Upload({
      client,
      params: {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: fs.createReadStream(filePath)
      }
    })

    const result = await upload.done()
    console.log('Upload Success', result)

  } catch (e) {
    console.log('Error', e)
  }
}
