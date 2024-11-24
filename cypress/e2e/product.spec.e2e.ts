describe("Product page", () => {
  it("renders the product title", () => {
    cy.visit("/");
    cy.get("h1").should("contain", "Product Title");
  });
});
