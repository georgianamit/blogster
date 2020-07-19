import React from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import Input from '../form/input'
import Textarea from '../form/text-area'
import { Link } from 'react-router-dom'

interface Props {
  post: any
  loading: boolean
  onBlur: (e: any) => void
  onChange: (e: any) => void
  onSubmit: (e: any) => void
}
const PostForm = ({ post, onChange, onBlur, loading, onSubmit }: Props) => {
  const { title, body, errors } = post
  return (
    <Container>
      <Row>
        <Col className="mx-auto">
          <Form noValidate onSubmit={onSubmit} className="p-sm-3 p-xs-1">
            <Input
              name="title"
              type="text"
              placeholder="Enter Post Title"
              value={title}
              onChange={onChange}
              onBlur={onBlur}
              text={{
                module: 'post',
                label: 'Title',
                error: errors.title,
              }}
            />
            <Textarea
              name="body"
              placeholder="Write your post here..."
              value={body}
              onChange={onChange}
              onBlur={onBlur}
              text={{
                module: 'post',
                label: 'Description',
                error: errors.body,
              }}
            />
            <Button variant="outline-info" type="submit" disabled={loading} className="mt-3">
              Submit
            </Button>
            <Link className="btn btn-link ml-2 mt-3" to={`/blog/post/${post._id}`}>
              Cancel
            </Link>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default PostForm
