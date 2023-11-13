import { useParams } from "react-router-dom";

function Messages() {
  const { username } = useParams();

  return (
    <div>
      {username} has messages???
    </div>
  )

}

export default Messages;