import Post from "../models/postModel.mjs";

export const createPost = async (req, res) => {
  const { userId, content } = req.body;
  const newUser = new Post({
    userId,
    content,
  });
  try {
    await newUser.save();
    if (newUser.isNew) {
      res.status(400).json({ message: "failed to post message" });
    }
    res.status(200).json({ message: "message posted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getPost = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate("userId", "username fullname profilepictureurl")
      .lean();
    res.status(200).json({ messsage: posts });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const likePost = async (req, res) => {
  const { postId, userId } = req.body;
  try {
    const post = await Post.findOne({ _id: postId });
    post.likes.push(userId);
    post.likesCount++;
    await post.save();
    res.status(200).json({ message: "updated successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const unlikePost = async (req, res) => {
  const { postId, userId } = req.body;
  try {
    const post = await Post.findOne({ _id: postId });
    const userIndex = post.likes.indexOf(userId);
    if (userIndex !== -1) {
      post.likes.splice(userIndex, 1);
    }
    post.likesCount--;
    await post.save();
    res.status(200).json({ message: "updated successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
