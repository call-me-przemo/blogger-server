import { users, posts, comments } from "./schemas";
import { defineRelations } from "drizzle-orm";

export const relations = defineRelations(
  {
    users,
    posts,
    comments,
  },
  (r) => ({
    users: {
      posts: r.many.posts(),
    },
    posts: {
      user: r.one.users({
        from: r.posts.userId,
        to: r.users.id,
      }),
      comments: r.many.comments(),
    },
    comments: {
      post: r.one.posts({
        from: r.comments.postId,
        to: r.posts.id,
      }),
    },
  }),
);
