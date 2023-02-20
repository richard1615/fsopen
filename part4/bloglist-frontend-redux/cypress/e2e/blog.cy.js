describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
    cy.request('POST', 'http://localhost:3003/api/users', {
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
      cy.contains('Successfully logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#input-username').type('test')
      cy.get('#input-password').type('test')
      cy.get('#login-form').submit()
      cy.contains('invalid username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#input-username').type('mary')
      cy.get('#input-password').type('secret')
      cy.get('#login-form').submit()
    })

    it('A blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#input-title').type('test title')
      cy.get('#input-author').type('test author')
      cy.get('#input-url').type('test url')
      cy.get('#blog-form').submit()
      cy.contains('a new blog test title by test author added')
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
        cy.contains('Liked test title')
      })

      it('it can be removed', function () {
        cy.contains('remove').click()
        cy.contains('Successfully removed test title')
      })
    })
  })
  //test to see if other users can delete blogs
  describe('When logged in as another user', function () {})
})
