describe('Deploy Key Creation', () => {
    beforeEach(() => cy.sessionLogin())
  
    it('creates an key ', () => {
      /**
       * início
       * 1 -Acesssa a sessionLogin
       * 2 - Uso dois comandos customizados que são eles:
       *     gui_deployKeyCreationName() ,  para gerar um  nome aleatório para a key
       *     gui_deployKeyCreation() , contém a key publica  na variável "const publicKey" com valor da key gerada antes
       * 3 - verifica o número de key(s), se é igual a (1) assert, caso seja, 
       *     passa para o próximo step que é clique btn "remove"
       * 4 - Clique no BTN "remove"
       * 5 - Verifica o se número de Keys é igual (0) assert 
       * fim
       */
      cy.gui_deployKeyCreationName()
      cy.gui_deployKeyCreation()
      cy.gui_deleteKey()
    })
  })
  