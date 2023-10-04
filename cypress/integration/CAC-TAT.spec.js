

/// <reference types="Cypress" />

beforeEach(() => {
  cy.visit('./src/index.html');
});

describe('Central de Atendimento ao Cliente TAT', function () {
  it('verifica o título da aplicação', function () {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
  it('preencha os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('Rafael') //nome
    cy.get('#lastName').type('Valente')//sobrenome
    cy.get('#email').type('rafael@gmail.com') // email
    cy.get('#open-text-area').type('feedback', { delay: 0 }) //como podemos te ajudar.
    cy.contains('button', 'Enviar').click();
    cy.get('.success').should('be.visible');

  });
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {

    cy.get('#firstName').type('Rafael') //nome
    cy.get('#lastName').type('Valente')//sobrenome
    cy.get('#email').type('EMAIL ERRADO') // email
    cy.get('#open-text-area').type('feedback', { delay: 0 }) //como podemos te ajudar.
    cy.contains('button', 'Enviar').click();
    cy.get('.error').should('be.visible');

  });

  it('validação numeros telefone', () => {
    cy.get('#firstName').type('Rafael') //nome
    cy.get('#lastName').type('Valente')//sobrenome
    cy.get('#email').type('rafael@gmail.com') // email
    cy.get('#phone').type('abc').should('have.value', '')
    cy.get('#open-text-area').type('feedback', { delay: 0 }) //como podemos te ajudar.
    cy.contains('button', 'Enviar').click();
    cy.get('.success').should('be.visible');

  });

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#phone-checkbox').click()
    cy.get('#firstName').type('Rafael') //nome
    cy.get('#lastName').type('Valente')//sobrenome
    cy.get('#email').type('rafael@gmail.com') // email
    cy.get('#phone').type('abc').should('have.text', '')
    cy.get('#open-text-area').type('feedback', { delay: 0 }) //como podemos te ajudar.
    cy.contains('button', 'Enviar').click();
    cy.get('.error').should('be.visible');

  });

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {

    cy.get('#phone-checkbox').click()
    cy.get('#firstName').type('Rafael').should('have.value', 'Rafael') //nome
    cy.get('#firstName').clear().should('have.value', '')

    cy.get('#lastName').type('Valente').should('have.value', 'Valente')//sobrenome
    cy.get('#lastName').clear().should('have.value', '')

    cy.get('#email').type('rafael@gmail.com').should('have.value', 'rafael@gmail.com') // email
    cy.get('#email').clear().should('have.value', '')

    cy.get('#open-text-area').type('feedback', { delay: 0 }).should('have.value', 'feedback') //como podemos te ajudar.
    cy.get('#open-text-area').clear().should('have.value', '')

    cy.contains('button', 'Enviar').click();
    cy.get('.error').should('be.visible');

  });

  it('envia o formuário com sucesso usando um comando customizado', () => {

    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible');

  });

  it('seleciona um produto (YouTube) por seu texto', () => {

    cy.get('select').select('youtube').should('have.value', 'youtube')

  });

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {

    cy.get('#product').select('mentoria').should('have.value', 'mentoria')

  });

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {

    cy.get('#product').select(1).should('have.value', 'blog')

  });

  it('marca o tipo de atendimento "Feedback"', () => {

    cy.get('input[type="radio"][value="feedback"]').check().should('have.value', 'feedback').should('be.checked')

  });

  it('marca cada tipo de atendimento', () => {

    cy.get('input[type="radio"]').should('have.length', 3)
      .each(function ($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
  });

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]').should('have.length', 2)
      .each(function ($checkbox) {
        cy.wrap($checkbox).check()
        cy.wrap($checkbox).should('be.checked')
      })
      .last().uncheck().should('not.be.checked')
  });

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#phone-checkbox').check()
    cy.get('#firstName').type('Rafael') //nome
    cy.get('#lastName').type('Valente')//sobrenome
    cy.get('#email').type('rafael@gmail.com') // email
    cy.get('#phone').type('abc').should('have.text', '')
    cy.get('#open-text-area').type('feedback', { delay: 0 }) //como podemos te ajudar.
    cy.contains('button', 'Enviar').click();
    cy.get('.error').should('be.visible');
  });

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]').should('not.have.value').selectFile('cypress/fixtures/example.json')
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })

  });

  it('seleciona um arquivo simulando um drag-and-drop', () => {

    cy.get('input[type="file"]').should('not.have.value').selectFile('cypress/fixtures/example.json', { action: "drag-drop" })
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      })
  });


  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {

    cy.fixture('example.json', { encoding: null }).as('myfixture')
    cy.get('input[type=file]').selectFile('@myfixture')
      .should(function ($input) {
        expect($input[0].files[0].name).to.equal('example.json')
      });
  });

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {

    cy.get('#privacy a').should('have.attr', 'target', '_blank')

  });

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    
    cy.get('#privacy a').invoke('removeAttr', 'target').click()
    cy.contains('Talking About Testing').should('be.visible')

  });

  

  

});

