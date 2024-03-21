const mysqldump = require('mysqldump')
const fs = require('fs')
const DUMP_PATH = './dumps/dump.sql'

const getDumpFromMysql = async () => {
  console.log('fazendo dump')
  return await mysqldump({
    connection: {
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE
    },
    dumpToFile: DUMP_PATH,
  }).then(() => {
    return DUMP_PATH
  }).catch((err) => {
    console.log(err)
    throw err
  })
}
  
const deleteFileAfterUpload = () => {
  fs.unlink(DUMP_PATH, (err) => {
    if (err) {
      throw err
    }
  })
}

module.exports = {
  getDumpFromMysql,
  deleteFileAfterUpload
}