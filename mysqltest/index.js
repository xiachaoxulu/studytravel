var mysql = require('./mysqlHelper')
var ss = [1]
var tt = [
    [7, 8, 9, 10, 11, 12]
];

var sDao = require('./activityStateDao')
// // mysql.query("select * from ACTIVITY where `id` > ?", [ss]).then((data) => {
// //     console.log(data)
// // });

// mysql.query("delete from ACTIVITY_STATE  where id in ?", [tt]).then((data) => {
//     console.log(data)
// });

// sDao.selectAll();

async function abc() {
    let result = await sDao.changeOrder([{
        id: 3,
        stateOrder: 9
    }], {
        id: 4,
        stateOrder: 10
    });
    if (result.success) {
        console.log(3333);
    } else {
        console.log(4444444)
    }
}

abc();