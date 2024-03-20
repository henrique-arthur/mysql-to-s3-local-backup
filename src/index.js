import { uploadFileToS3 } from './aws.js'
import { getDumpFromMysql, deleteFileAfterUpload } from './mysqlconn.js'

const DATABASE_NAME = process.env.MYSQL_DATABASE

async function main() {
  try {
    const dumpPath = await getDumpFromMysql()
    await uploadFileToS3(dumpPath, `backup-banco-${DATABASE_NAME}.sql`)
    deleteFileAfterUpload()
  }catch(e){
    console.log('Error', e)
  }
}

main()

// TODO criar retry para envio de arquivo para o S3
// TODO testar com o banco real e depois rodar o dump