type FieldValue = string | number;

export const fillQaField = (fieldName: string, value: FieldValue) => {
  cy.getByQa(fieldName).clear();
  cy.getByQa(fieldName).type(String(value));
};

export const selectQaField = (fieldName: string, value: FieldValue) => {
  cy.getByQa(fieldName).select(String(value));
};

export const clickQaField = (fieldName: string) => {
  cy.getByQa(fieldName).click();
};

export const assertQaFieldValue = (fieldName: string, value: FieldValue) => {
  cy.getByQa(fieldName).should('have.value', String(value));
};

export const fillQaFields = (fields: Record<string, FieldValue>) => {
  Object.entries(fields).forEach(([fieldName, value]) => fillQaField(fieldName, value));
};
