import dotenv from 'dotenv'
dotenv.config()

const config = {
  'app_env': process.env.NODE_ENV,
  'app_port': process.env.APP_PORT,
  'app_host': process.env.APP_HOST,
  'secret': process.env.SECRET_KEY,
  'username': process.env.MYSQL_USER || 'manitass',
  'password': process.env.MYSQL_PASSWORD || 'manitass',
  'database': process.env.MYSQL_DATABASE || 'manitass_db',
  'host': process.env.DB_HOST || '127.0.0.1',
  'port': process.env.DB_PORT || '3306',
  "dialect": 'mysql',
  'operatorsAliases': false
}

export default config
