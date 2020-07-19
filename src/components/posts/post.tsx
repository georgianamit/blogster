import React from 'react'
import Card from 'react-bootstrap/Card'
import getFormattedDate from '../../utils/getFormattedDate'
import './post.scss'
import { IPost } from '../../types/state'

type Props = {
  post: IPost
}

const Post = ({ post }: Props) => {
  const postDate = getFormattedDate(post.createdAt)
  return (
    <Card className="deckStyle" style={{ border: 'none' }}>
      <Card.Body className="postCover">
        <Card.Title className="text-center p-5">{post.title}</Card.Title>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">Posted on: {postDate}</small>
      </Card.Footer>
    </Card>
  )
}

export default Post
