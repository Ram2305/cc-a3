module.exports = (req, res, next) => {
    if (Object.keys(req.query).length > 0) {
        return res.status(400).json({ error: "400 Bad Request : Query parameters not allowed for healthz" });
    }
    next();
};
