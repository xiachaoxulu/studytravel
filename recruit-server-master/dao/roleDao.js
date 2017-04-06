var query = require('./mysqlHelper');

function Role(role) {
  if (!(this instanceof Role)) {
    return new Role(role);
  };

  var roledefault = {
    id: '',
    roleName: '',
    roleCode: '',
    des: ''
  };
  Object.assign(roledefault, role);
  this = roledefault;
}

Role.prototype.add = async() => {

  this.createTime=new Date();
  var sql = "insert into role (roleName,roleCode,des,createTime) values (:roleName,:roleCode,:des,:createTime)";
  var count = await query(sql, this);
  return count;
}
Role.prototype.delete = function() {

}

Role.prototype.getOneDetail = function() {

}

Role.getRoleList = function() {

}

exports.role = Role;
