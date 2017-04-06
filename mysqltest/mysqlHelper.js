var options = {
    connectionLimit: 10,
    host: '192.168.215.80',
    port: '3306',
    database: 'dispatch_db',
    user: 'mtime',
    password: '1234',
    debug: false
}
var mysql = require('mysql');
var pool = mysql.createPool(options);

function query(sql, values) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, conn) {
            if (err) {
                reject('DB-获取数据库连接异常！');
                throw err;
            } else {
                var querys = conn.query(sql, values, function (err, rows, fields) {

                    release(conn);
                    if (err) {
                        reject('DB-SQL语句执行错误:' + err);
                    } else {
                        resolve(rows);
                    }
                });

                conn.on("error", function (err) {
                    console.log(err.code);
                })
            }
        });
    });
}


function release(connection) {
    try {
        connection.release(function (error) {
            if (error) {
                console.log('DB-关闭数据库连接异常！');
            }
        });
    } catch (err) {}
}

/**
 * 
 * @param {* conn 是fn的连接参数} fn 
 */
function execTransaction(fn) {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, conn) {
            if (err) {
                reject('DB-获取数据库连接异常！');
                throw err;
            } else {
                conn.beginTransaction(function (err) {
                    if (err) {
                        throw err;
                    }
                    fn(conn);
                });
                conn.commit(function (err, state) {
                    if (err) {
                        conn.rollback(function () {
                            release(conn);
                            reject(err);
                        });
                    } else {
                        release(conn);
                        resolve(state);
                    }
                });
            }
        });
    });
}


module.exports.query = query;
module.exports.execTransaction = execTransaction;