var options = {
    connectionLimit: 10,
    host: 'localhost',
    port: '3306',
    database: 'recruit',
    user: 'root',
    password: '123'
}
var mysql = require('mysql');
var pool = mysql.createPool(options);

function query(sql, values) {
    return new Promise(function(resolve, reject) {
        pool.getConnection(function(err, conn) {
            if (err) {
                reject('DB-获取数据库连接异常！');
                throw err;
            } else {
                var querys = conn.query(sql, values, function(err, rows) {

                    release(conn);
                    if (err) {
                        reject('DB-SQL语句执行错误:' + err);
                    } else {
                        resolve(rows);
                    }
                });
            }
        });
    });
}


function release(connection) {
    try {
        connection.release(function(error) {
            if (error) {
                console.log('DB-关闭数据库连接异常！');
            }
        });
    } catch (err) {}
}
module.exports.query = query;
