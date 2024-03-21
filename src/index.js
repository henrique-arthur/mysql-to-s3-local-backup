const { uploadFileToS3, fakeUploadFileToS3 } = require('./aws.js');
const { getDumpFromMysql, deleteFileAfterUpload } = require('./mysqlconn.js');

const DATABASE_NAME = 'backup-banco-' + process.env.MYSQL_DATABASE + '.sql'

console.log('DATABASE_NAME', DATABASE_NAME)

async function main() {
  try {
    updateStatus('Iniciando backup')
    const dumpPath = await getDumpFromMysql()
    updateStatus('Enviando backup para o S3')
    await uploadFileToS3(dumpPath, DATABASE_NAME)
    // await fakeUploadFileToS3(dumpPath, DATABASE_NAME)
    updateStatus('Backup finalizado')
    deleteFileAfterUpload()
    updateStatus('Arquivo local deletado')
  }catch(e){
    console.log('Error', e)
  }
}

// TODO criar retry para envio de arquivo para o S3
// TODO testar com o banco real e depois rodar o dump

window.addEventListener('DOMContentLoaded', async () => {
  await main()
})

const updateStatus = (status) => {
  document.getElementById('report-status').innerHTML = status
}