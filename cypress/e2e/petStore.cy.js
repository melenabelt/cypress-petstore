describe("Pet Store", () => {
  const id = 1053;
  context("API Testing", () => {
    it("POST - Add a new pet to the store", () => {
      cy.request("POST", "v2/pet", {
        id: `${id}`,
        category: {
          id: 0,
          name: "Zoe",
        },
        name: "Cat",
        photoUrls: ["string"],
        tags: [
          {
            id: 1,
            name: "cat",
          },
        ],
        status: "available",
      }).then((resp) => expect(resp.status).to.eq(200));
    });
    it("GET - Find pets by status", () => {
      cy.request("GET", "v2/pet/findByStatus?status=available", {}).then((resp) => expect(resp.status).to.eq(200));
    });
    it("PUT - Update an existing pet", () => {
      cy.request("PUT", "v2/pet",
      {
        "id": 1053,
        "category": {
            "id": 0,
            "name": "Zoe"
        },
        "name": "Kittie",
        "photoUrls": [
            "string"
        ],
        "tags": [
            {
                "id": 1,
                "name": "cat"
            }
        ]
    }).then((resp) => expect (resp.status).to.eq(200)); 
    });
    it("GET - Find pet by ID", () => {
      cy.request("GET", `v2/pet/${id}`, {}).then((resp) => expect(resp.status).to.eq(200));
    });
    it("DELETE - Delete a pet", () => {
      cy.request("DELETE", `v2/pet/${id}`).then((resp) => expect(resp.status).to.eq(200));
    });
    it("GET - Verify pet does not exist", () => {
      cy.request({ url: `v2/pet/${id}`, failOnStatusCode: false }).then((resp) => expect(resp.status).to.eq(404));
    });
  });

  context("API request + UI Assertions", () => {
    beforeEach(() => {
      cy.request("POST", "v2/pet", {
        id: `${id}`,
        category: {
          id: 0,
          name: "Zoe",
        },
        name: "Cat",
        photoUrls: ["string"],
        tags: [
          {
            id: 1,
            name: "cat",
          },
        ],
        status: "available",
      }).then((resp) => expect(resp.status).to.eq(200));
      cy.visit("/");
    });

    afterEach(() => {
      cy.request("DELETE", `v2/pet/${id}`).then((resp) => expect(resp.status).to.eq(200));
    });

    it("Verify pet exist", () => {
      cy.contains("Find pet by ID").click();
      cy.get("#operations-pet-getPetById .try-out__btn").click();
      cy.get("input[placeholder = 'petId']").type(`${id}`);
      cy.get("#operations-pet-getPetById .execute").click(); 

      cy.get(".live-responses-table .response .response-col_status").should("have.text", 200);
    });

  });
});
