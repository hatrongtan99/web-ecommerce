const Comments = require("../models/comments.model");
const catchSyncErr = require("../utils/catchSyncErr");
const ThrowError = require("../utils/throwError");

class CommentsController {
    //@desc: get all comment
    //@route: [GET]/v2/api/comment/:id
    //@access: public
    getCommentProduct = catchSyncErr(async (req, res, next) => {
        const { id } = req.params;

        const { page = 1, pageSize = 1 } = req.query;
        const totals = await Comments.find({
            product: { $regex: `^${id}_` },
        }).countDocuments();

        const listCmt = await Comments.find({ product: { $regex: `^${id}_` } })
            .limit(pageSize)
            .skip((page - 1) * pageSize);

        return res.json({
            success: true,
            comments: listCmt[0]?.comments,
            meta: {
                count: listCmt[0]?.count,
                totals,
                page: +page,
            },
        });
    });

    //@desc: new comment
    //@route: [POST]/v2/api/comment/:id
    //@access: public
    newComment = catchSyncErr(async (req, res, next) => {
        const { id } = req.params;
        const { user, email, content } = req.body;
        if (!user || !email || !content) {
            return next(new ThrowError("invalid comment!", 400));
        }

        await Comments.findOneAndUpdate(
            {
                product: { $regex: `^${id}_` },
                count: { $lt: 10 },
            },
            {
                $push: {
                    comments: { user, email, content },
                },
                $inc: { count: 1 },
                $setOnInsert: {
                    product: `${id}_${new Date().getTime()}`,
                },
            },
            {
                upsert: true,
            }
        );
        return res.json({
            success: true,
            message: "Comment succesfully!",
        });
    });
}

module.exports = new CommentsController();
