const { S3Client } = require('@aws-sdk/client-s3')
const { Upload } = require("@aws-sdk/lib-storage")
const fs = require('fs')

const client = new S3Client({
  region: 'sa-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
})

const uploadFileToS3 = async (filePath, fileName) => {
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

const fakeUploadFileToS3 = async (filePath, fileName) => {
  setTimeout(() => {
    console.log('Upload Success', fileName)
  }, 2000)
}

module.exports = {
  uploadFileToS3,
  fakeUploadFileToS3
}