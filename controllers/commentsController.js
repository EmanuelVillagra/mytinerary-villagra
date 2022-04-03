const Itineraries = require('../models/itineraries.js')

const commentsControllers = {
    addComment: async (req,res)=>{
        const {itinerary,comment} = req.body.comment
        const user = req.user._id
        try{
            const newComment = await Itineraries.findOneAndUpdate({_id:itinerary},{$push:{comments:{comment: comment, userID: user}}}, {new:true}).populate('comments.userID')
            res.json({success:true, response:{newComment}, message:'thanks for your comment'})
        }
        catch(error){
            console.log(error)
            res.json({success:false,message:"Something is wrong, try again in a few minutes"})
        }
    },
    modifyComment: async(req,res)=>{
        const {commentID,comment}=req.body.comment
        const user = req.user._id
        try{
            const newComment =await Itineraries.findOneAndUpdate({"comments._id":commentID}, {$set:{"comments.$.comment":comment}}, {new:true})
            res.json({success: true, response:{newComment},message:"your comment has been modified"})
        }
        catch(error){
            console.log(error)
            res.json({success: false, message:"Something is wrong, try again in a few minutes"})
        }
    },
    deleteComment: async (req, res) => {
        const id = req.params.id
        const user = req.user._id
        try {
            const deleteComment = await Itineraries.findOneAndUpdate({"comments._id":id}, {$pull: {comments: {_id: id}}}, {new: true})
            res.json({ success: true, response:{deleteComment}, message: "You has been deleted the comment" })

        }
        catch (error) {
            console.log(error)
            res.json({ success: false, message: "Something is wrong, try again in a few minutes" })
        }

    },

};
module.exports = commentsControllers;