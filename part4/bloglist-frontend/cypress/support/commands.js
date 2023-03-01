Cypress.Commands.add('login', (email, password) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
    username: 'mary', password: 'secret'
  }).then(response => {
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.body))
    cy.visit('')
  })
})

Cypress.Commands.add('logout', (title, author, url) => {
  window.localStorage.removeItem('loggedBlogAppUser')
  cy.visit('')
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    url: `${Cypress.env('BACKEND')}/blogs`,
    method: 'POST',
    body: {
      title,
      author,
      url
    },
    headers: {
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedBlogAppUser')).token}`
    }
  })

  cy.visit('')
})