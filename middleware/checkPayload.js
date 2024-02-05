module.exports = (req, res, next) => {
    if (Object.keys(req.body).length > 0) {
        return res.status(400).json({ error: "400 Bad Request (payloads not allowed for healthz) " });
    }
    next();
};
