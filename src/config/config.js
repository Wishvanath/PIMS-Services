const env = process.env.NODE_ENV || 'development' ;

module.exports = async () => {
    const connectionString = {
        [env] : {
            dialect: 'mysql',
            host: '127.0.0.1',
            username: 'root',
            password: 'admin',
            database: 'pims',
            migrationStorageTableName: 'dbMigrations',
            pool: {
                max: 5,
                min: 0,
                idle: 10000,
            }
        }
    };
    return connectionString
}