const AccessControl = require("accesscontrol");
const ac = new AccessControl();

exports.roles = (function() {
ac.grant("employee")


ac.grant("admin")
 .extend("employee")
 .updateAny("profile")
 .deleteAny("profile")

return ac;
})();