describe('First test', () => {

    beforeEach(() => {
        cy.server()
        cy.route('GET','**/tags','fixture:tags.json')
        cy.loginToApp()
    });
    
    it('first step', () => {

      cy.server()
      cy.route('POST','**/articles').as('postArticles')


      cy.get('a[href="/editor"').click()
      cy.get('[formcontrolname="title"]').type("Article title")
      cy.get('[formcontrolname="description"]').type("Article description")
      cy.get('[formcontrolname="body"]').type("Article body")
      cy.get('[type="button"]').click()

      cy.wait('@postArticles')
      cy.get('@postArticles').then(xhr =>{
          cy.log(xhr)
          expect(xhr.status).to.equal(200)
          expect(xhr.request.body.article.body).to.equal('Article body')
          expect(xhr.response.body.article.description).to.equal('Article description')
      })
    });

    it('should gave tags with routing objects', () => {
        cy.get('.tag-list')
         .should('contain','aaa')
         .and('contain','bbb')
         .and('contain','ccc')
    });

 
});