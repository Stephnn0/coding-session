// Import necessary types from '@shopify/admin-api-client'
import type { AdminOperations } from '@shopify/admin-api-client';


interface AutomaticDiscountResponseType {
    discountAutomaticBasicCreate: {
      automaticDiscountNode: {
        id: string;
        automaticDiscount: {
          startsAt: string;
          endsAt: string;
          minimumRequirement: {
            greaterThanOrEqualToSubtotal: {
              amount: number;
              currencyCode: string;
            };
          };
          customerGets: {
            value: {
              amount: {
                amount: number;
                currencyCode: string;
              };
              appliesOnEachItem: boolean;
            };
            items: {
              allItems: boolean;
            };
          };
        };
      };
      userErrors: {
        field: string;
        code: string;
        message: string;
      }[];
    };
  }
  



type GraphQLResponse<QueryType, AdminOperations> = {
    data: QueryType;
    operations: AdminOperations;
}

// Modify createAutomaticDiscount function to return the correct response type
export async function createAutomaticDiscount(admin: any, title: string, startsAt: string, endsAt: string, minimumRequirementSubtotal: number, discountAmount: number): Promise<GraphQLResponse<AutomaticDiscountResponseType, AdminOperations >> {
  try {
    const response = await admin.graphql(
      `#graphql
      mutation discountAutomaticBasicCreate($automaticBasicDiscount: DiscountAutomaticBasicInput!) {
        discountAutomaticBasicCreate(automaticBasicDiscount: $automaticBasicDiscount) {
          automaticDiscountNode {
            id
            automaticDiscount {
              ... on DiscountAutomaticBasic {
                startsAt
                endsAt
                minimumRequirement {
                  ... on DiscountMinimumSubtotal {
                    greaterThanOrEqualToSubtotal {
                      amount
                      currencyCode
                    }
                  }
                }
                customerGets {
                  value {
                    ... on DiscountAmount {
                      amount {
                        amount
                        currencyCode
                      }
                      appliesOnEachItem
                    }
                  }
                  items {
                    ... on AllDiscountItems {
                      allItems
                    }
                  }
                  }
                }
              }
            }
            userErrors {
            field
            code
            message
          }
        }
      }`,
      {
        variables: {
          automaticBasicDiscount: {
            title,
            startsAt,
            endsAt,
            minimumRequirement: {
              subtotal: {
                greaterThanOrEqualToSubtotal: minimumRequirementSubtotal,
              },
            },
            customerGets: {
              value: {
                discountAmount: {
                  amount: discountAmount,
                  appliesOnEachItem: false,
                },
              },
              items: {
                all: true,
              },
            },
          },
        },
      },
    );

    return response as GraphQLResponse<AutomaticDiscountResponseType, AdminOperations>; 
  } catch (error) {
    console.error('Error creating automatic discount:', error);
    throw error; // Rethrow the error to handle it in the caller
  }
}


