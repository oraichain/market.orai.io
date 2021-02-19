import styles from "./Comment.less";

function Comment(props) {
  const {
    avatar,
    content,
    author
  } = props;
  return (
    <div className={styles.CContainer}>
      <img src={avatar} className={styles.CAvatar} />
      <div className={styles.CContent}>{content}</div>
      <div className={styles.CAuthor}>- {author} -</div>
    </div>
  );
}

export default Comment;