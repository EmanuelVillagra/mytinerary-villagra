import React from "react";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import commentsActions from "../redux/actions/commentsActions";
import '../App.css'
export const Comments = (props) => {
  const [modify, setModify] = useState();
  const [itinerary, setItinerary] = useState();
  const [inputText, setInputText] = useState();
  
  console.log(props);
  async function chargeComment(event) {
    
    const commentData = {
      itinerary: props.itinerary._id,
      comment: inputText,
    };

    await props
      .addComment(commentData)
      .then(
        (response) => setItinerary(response.data.response.newComment),
        setInputText(""),
        document.querySelector("#newComment").textContent = ""
      );
      props.setReload(!props.reload);
  }
  async function ModifyComment(event) {
    const commentData = {
      commentID: event.target.id,
      comment: modify,
    };
    // console.log(modify);
    await props.modifyComment(commentData);
    props.setReload(!props.reload);
  }
  async function DeleteComment(event) {
    await props.deleteComment(event.target.id);
    props.setReload(!props.reload);
  }
  return (
    <div>
      {props.itinerary?.comments.map((comment) => (
        <>
          {comment.userID?._id !== props.user?.id ? (
            <div key={comment._id}>
              <div className="nameComments">{comment.userID?.name} {comment.userID?.lastName}</div>
              <div>
                <p>{comment.comment}</p>
              </div>
            </div>
          ) : (
            <div>
              <div className="nameComments">{comment.userID?.name} {comment.userID?.lastName}</div>
              <div>
                <textarea
                  type="text"
                  onChange={(event) => setModify(event.target.value)}
                  defaultValue={comment.comment}
                 className="textarea"/>
                <button onClick={ModifyComment} id={comment._id} className="commmentButtons">
                  Modify
                </button>
                <button onClick={DeleteComment} id={comment._id} className="commmentButtons">
                  Delete
                </button>
              </div>
            </div>
          )}
        </>
      ))}
      {props.user ? 
        <div>
          <div className="commentSignedIn">POST YOUR COMMENT</div>
          <div>
            <div id="newComment" placeholder='Write your comment here' onInput={(event) => setInputText(event.currentTarget.textContent)} contentEditable></div>
            <button onClick={chargeComment}>Submit</button>
          </div>
        </div>
       : 
        <h1 className="commentSignedOut">Sign in and write your comment</h1>
      }
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
});

const mapDispatchToProps = {
  addComment: commentsActions.addComment,
  modifyComment: commentsActions.modifyComment,
  deleteComment: commentsActions.deleteComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
