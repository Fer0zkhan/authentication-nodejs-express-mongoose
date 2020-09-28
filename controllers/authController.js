const login = (req, res, next) => {
    res.json({ message: "Successfully you have been login" });
}
const logout = (req, res, next) => {
    req.logout();
    res.json({ message: "Successfully you have been logout" });
}
module.exports = { login, logout };