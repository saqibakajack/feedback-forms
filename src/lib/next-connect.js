import nc from "next-connect";

const handler = () => {
    return nc({
        attachParams: true,
        onError: (err, req, res, next) => {
            res.status(500).json({
                message: err.message,
            });
        },
        onNoMatch: (req, res) => {
            res.status(404).json({
                message: "Not found",
            });
        },
    });
};

export default handler;
