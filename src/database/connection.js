import sql from 'mssql';

const dbSettings = {
    user: 'sa',
    password: 'yourStrong(!)Password',
    server: 'localhost',
    database: 'BDColegioVentas',
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
}


export async function getConnection (){
    try {
        const pool = await sql.connect(dbSettings);
        return pool;
    } catch (err){
        console.error(err);
    }
}

export {sql}
