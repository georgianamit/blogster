import React from 'react'
import getFormattedDate from '../../utils/getFormattedDate'
import { Container, Row, Col, Button } from 'react-bootstrap'
import './post.scss'
import { IPost } from '../../types/state/post'
type Props = {
  post: IPost
  auth: boolean
  onEdit: (e: any) => void
  onDelete: (e: any) => void
}
const ViewPost = ({ post, auth, onDelete, onEdit }: Props) => {
  const postDate = getFormattedDate(post.createdAt)
  return (
    <Container className="mt-4 view-post">
      <Row>
        <Col md={8} className="post-title">
          <h1>{post.title}</h1>
        </Col>
        <Col md={{ span: 2, offset: 2 }}>
          {auth && (
            <Row>
              <Col className="text-center">
                <Button className="mr-2" variant="outline-info" onClick={onEdit}>
                  Edit
                </Button>
                <Button variant="outline-danger" onClick={onDelete}>
                  Delete
                </Button>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
      <Row className="post-details">
        <Col md={6}>Author : {post.author}</Col>
        <Col md={{ span: 3, offset: 3 }}>Posted on: {postDate}</Col>
      </Row>
      <Row className="my-4 post-body" style={{ whiteSpace: 'pre-wrap' }}>
        <Col>{post.body}</Col>
      </Row>
    </Container>
  )
}

export default ViewPost
