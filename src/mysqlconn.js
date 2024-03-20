import mysqldump from 'mysqldump'
import fs from 'fs'
const DUMP_PATH = './dumps/dump.sql'

export const getDumpFromMysql = async () => {
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
    throw err
  })
}
  
export const deleteFileAfterUpload = () => {
  fs.unlink(DUMP_PATH, (err) => {
    if (err) {
      throw err
    }
  })
}