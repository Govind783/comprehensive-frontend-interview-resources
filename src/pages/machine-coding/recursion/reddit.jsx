import { useState } from "react";
import { commentsData } from "../../../../data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { v4 } from "uuid";
import { ArrowUp, Reply, Send, Trash2 } from "lucide-react";

// make better UI
// make better UI for vs-code also

const RedditComments = () => {
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(commentsData);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const newCommentAddHandler = () => {
    if (!newComment.trim()) return;

    setComments((prev) => {
      const prevState = structuredClone(prev);
      const newCommentObject = {
        id: v4(),
        title: newComment,
        children: [],
        votes: 0,
        time: Date.now(),
      };
      prevState.push(newCommentObject);
      return prevState;
    });
    setNewComment("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      newCommentAddHandler();
    }
  };

  const addNestedComment = (ID, reply) => {
    if (!reply || !reply.trim()) return;

    setComments((prev) => {
      const prevState = structuredClone(prev);
      const findItem = (nodes) => {
        return nodes.map((item) => {
          if (item.id === ID) {
            return {
              ...item,
              children: [
                ...item.children,
                {
                  id: v4(),
                  title: reply,
                  children: [],
                  votes: 0,
                  time: Date.now(),
                },
              ],
            };
          } else if (item.children.length > 0) {
            return {
              ...item,
              children: findItem(item.children),
            };
          }
          return item;
        });
      };
      return findItem(prevState);
    });
    setReplyingTo(null);
    setReplyText("");
  };

  const deleteNestedComment = (ID) => {
    setComments((prev) => {
      const prevState = structuredClone(prev);

      const findItem = (nodes) => {
        return nodes.filter((item) => {
          if (item.id === ID) {
            return false;
          }
          if (item.children.length > 0) {
            item.children = findItem(item.children);
          }
          return true;
        });
      };

      return findItem(prevState);
    });
  };

  const upvoteHandler = (ID) => {
    setComments((prev) => {
      const prevState = structuredClone(prev);
      const findItem = (nodes) => {
        return nodes.map((item) => {
          if (item.id === ID) {
            return {
              ...item,
              votes: item.votes + 1,
            };
          } else if (item.children.length > 0) {
            return {
              ...item,
              children: findItem(item.children),
            };
          }
          return item;
        });
      };
      const newState = findItem(prevState);
      console.log(newState, "newState");

      return newState;
    });
  };

  const CommentTree = ({ data, depth = 1 }) => {
    return (
      <div className="space-y-4">
        {data.map((item) => (
          <div key={item.id}
           className={depth > 1 ? "pl-6 border-l border-gray-200" : ""}>
            <div
            
              className={`p-4 rounded-md bg-white transition-all hover:bg-gray-50 ${
                depth === 1 ? "border border-gray-200" : ""
              }`}
            >
              {/* Comment header with votes count and time */}
              <div className="flex items-center mb-1 text-sm text-gray-500">
                <span className="font-medium text-gray-700 mr-2">{item.votes} points</span>
                {item.time && (
                  <span>
                    {" "}
                    {new Date(item.time).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </span>
                )}
              </div>

              {/* Comment content */}
              <p className="text-gray-800 mb-3">{item.title}</p>

              {/* Action buttons */}
              <div className="flex items-center gap-2 text-gray-500">
                <Button
                  onClick={() => upvoteHandler(item.id)}
                  variant="ghost"
                  size="sm"
                  className="text-xs h-8 px-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                >
                  <ArrowUp className="h-3.5 w-3.5 mr-1" />
                  Upvote
                </Button>

                <Button
                  onClick={() => setReplyingTo(item.id)}
                  variant="ghost"
                  size="sm"
                  className="text-xs h-8 px-2 text-gray-600 hover:text-green-600 hover:bg-green-50"
                >
                  <Reply className="h-3.5 w-3.5 mr-1" />
                  Reply
                </Button>

                <Button
                  onClick={() => deleteNestedComment(item.id)}
                  variant="ghost"
                  size="sm"
                  className="text-xs h-8 px-2 text-gray-600 hover:text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="h-3.5 w-3.5 mr-1" />
                  Delete
                </Button>
              </div>

              {/* Reply input area */}
              {replyingTo === item.id && (
                <div className="mt-3 flex flex-col space-y-2">
                  <div className="flex items-center">
                    <div className="h-6 border-l-2 border-gray-300 mr-2"></div>
                    <p className="text-xs text-gray-500">Replying to comment</p>
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write a reply..."
                      className="text-sm text-black"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          addNestedComment(item.id, replyText);
                        }
                      }}
                      autoFocus
                    />
                    <Button
                      size="sm"
                      onClick={() => addNestedComment(item.id, replyText)}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Reply
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => setReplyingTo(null)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Render children comments recursively */}
            {item.children.length > 0 && (
              <div className="mt-2">
                <CommentTree data={item.children} depth={depth + 1} />
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen bg-gray-200 p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Comments</h2>

        <div className="flex gap-2 mb-8">
          <Input
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border-gray-300 focus-visible:ring-gray-400 text-black"
          />
          <Button onClick={newCommentAddHandler} variant="default" className="bg-blue-600 hover:bg-blue-700 text-white">
            <Send className="h-4 w-4 mr-2" />
            Post
          </Button>
        </div>

        <div className="max-h-[700px] overflow-y-auto pr-2">
          <CommentTree data={comments} />
        </div>
      </div>
    </div>
  );
};

export default RedditComments;
