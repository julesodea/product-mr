describe("Product page: Classic Tee", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Renders the product title", () => {
    cy.get("h1").should("contain", "Classic Tee");
  });

  it("Renders the product price", () => {
    cy.get(".price").should("contain", "$75.00");
  });

  it("Renders the product description", () => {
    cy.get(".description").should("be.visible");
  });

  it("Renders the size options", () => {
    cy.get(".flex.flex-wrap.gap-2").should("be.visible");
  });

  it("Renders the add to cart button", () => {
    cy.get("button[type='submit']").should("contain", "ADD TO CART");
  });

  it("Displays an error message when no size is selected", () => {
    cy.get("button[type='submit']").click();
    cy.get(".text-red-600").should("contain", "Please select a size");
  });
});
