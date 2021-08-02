module.exports =  (socket) => {
    return (req, _, next) => {
        req.socket = socket;
        next();
    }
}