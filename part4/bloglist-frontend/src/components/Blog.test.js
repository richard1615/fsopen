import React from "react"
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from "@testing-library/react";
import { Blog } from './Blog'

test('renders only required components', () => {
  const blog = {
    title: 'someBlog',
    author: 'someAuthor',
    url: 'someUrl',
    likes: 10,
    user: {
      username: 'anne',
      name: 'Anne Marie'
    }
  }

  const user = {
    name: 'Anne Marie',
    username: 'anne'
  }

  const { container } = render(<Blog blog={blog} user={user}/>)

  const element = container.querySelector('.blog')
  expect(element).toHaveTextContent('someBlog someAuthor')
  expect(element).not.toHaveTextContent('someUrl')
  expect(element).not.toHaveTextContent('10')
})


