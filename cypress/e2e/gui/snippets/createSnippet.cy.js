describe('Create Snippet', () => {
  beforeEach(() => {
    cy.api_deleteSnippets()
    cy.sessionLogin()
  })

  it('creates a public snippet successfully', () => {
    const snippetObj = {
      title: 'JS Hello, World!',
      description: '"Hello, World" example in JavaScript',
      visibility: 'public',
      snippet: 'console.log("Hello, World!")'
    }
    const { title, description, snippet } = snippetObj

    cy.visit('snippets/new')

    cy.gui_createSnippet(snippetObj)

    cy.contains('h2', title).should('be.visible')
    cy.contains('p', description).should('be.visible')
    cy.contains('pre code span', snippet).should('be.visible')
  })
})
