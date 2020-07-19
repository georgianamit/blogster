import React from 'react'
import { Link } from 'react-router-dom'
import Post from './post'
import './post.scss'
import { IPost } from '../../types/state'

type Props = {
  posts: IPost[]
}

const ListPost = ({ posts }: Props) => {
  return (
    <div className="grid-container mx-3">
      {posts.map((post) => (
        <Link to={`/blog/post/${post._id}`} key={post._id}>
          <Post post={post} />
        </Link>
      ))}
    </div>
  )
}

export default ListPost
