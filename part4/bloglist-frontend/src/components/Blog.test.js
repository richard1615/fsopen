import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { Blog, BlogForm } from './Blog'
import userEvent from '@testing-library/user-event'

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

test('clicking on the like button twice', async () => {
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

  const mockHandler = jest.fn()

  render(<Blog blog={blog} user={user} handleLikes={mockHandler}/>)

  const userManager = userEvent.setup()
  const button = screen.getByText('like')
  await userManager.click(button)
  await userManager.click(button)
  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = jest.fn()
  const user = userEvent.setup()
  render(<BlogForm createBlog={createBlog}/>)
  const inputTitle = screen.getByPlaceholderText('title')
  const inputAuthor = screen.getByPlaceholderText('author')
  const inputUrl = screen.getByPlaceholderText('url')
  const sendButton = await screen.findByText('add blog')

  await user.type(inputTitle, 'title')
  await user.type(inputAuthor, 'author')
  await user.type(inputUrl, 'url')

  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('title')
  expect(createBlog.mock.calls[0][0].author).toBe('author')
  expect(createBlog.mock.calls[0][0].url).toBe('url')
})