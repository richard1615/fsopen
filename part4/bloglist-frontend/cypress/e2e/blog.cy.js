describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.visit('')
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
      name: 'mary',
      username: 'mary',
      password: 'secret',
    })
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
    cy.get('#login-form').contains('username')
    cy.get('#login-form').contains('password')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#input-username').type('mary')
      cy.get('#input-password').type('secret')
      cy.get('#login-form').submit()
      cy.contains('Logged in as mary')
    })

    it('fails with wrong credentials', function () {
      cy.get('#input-username').type('test')
      cy.get('#input-password').type('test')
      cy.get('#login-form').submit()
      cy.contains('Wrong username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({username:'mary', password: 'secret'})
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#input-title').type('test title')
      cy.get('#input-author').type('test author')
      cy.get('#input-url').type('test url')
      cy.get('#blog-form').submit()
      cy.contains('Added test title by test author')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.contains('new blog').click()
        cy.get('#input-title').type('test title')
        cy.get('#input-author').type('test author')
        cy.get('#input-url').type('test url')
        cy.get('#blog-form').submit()
      })

      it('it can be liked', function () {
        cy.contains('like').click()
        cy.contains('Liked test title by test author')
      })

      it('it can be removed', function () {
        cy.contains('remove').click()
        cy.contains('Removed test title by test author')
      })


    })
    //test to see if other users can delete blogs
    describe('as another user', function () {
      beforeEach(function () {
        cy.logout()
        cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
          name: 'anne',
          username: 'anne',
          password: 'secret',
        })
        cy.login({
          username: 'anne',
          password: 'secret'
        })
      })

      it('other users cannot delete blogs', function () {
        cy.contains('remove').should('not.exist')
      })
    })
  })

  //test to see if blogs are ordered by likes
  describe('When logged in and multiple blogs exist', function () {
    beforeEach(function () {
      cy.login({ username: 'mary', password: 'secret' })
      cy.createBlog({ title: 'The title with the second most likes', author: 'test author', url: 'test url' })
      cy.createBlog({ title: 'The title with the most likes', author: 'test author', url: 'test url' })
    })

    it('blogs are ordered by likes', function () {
      cy.contains('The title with the most likes').contains('like').click()
      cy.contains('The title with the most likes').contains('like').click()
      cy.contains('The title with the second most likes').contains('like').click()
      cy.contains('Sort by likes').click()
      cy.get('.blog').eq(0).contains('most likes')
      cy.get('.blog').eq(1).contains('second most likes')
    })
  })
})
