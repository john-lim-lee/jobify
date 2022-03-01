const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err)
    res.status(500).json({ msg: "THERE WAS AN ERROR" })
}

export default errorHandlerMiddleware