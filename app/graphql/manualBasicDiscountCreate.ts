//MANUAL DISCOUNT PER CUSTOMER


// const response = await admin.graphql(
//   `#graphql
//   mutation discountCodeBasicCreate($basicCodeDiscount: DiscountCodeBasicInput!) {
// discountCodeBasicCreate(basicCodeDiscount: $basicCodeDiscount) {
//   codeDiscountNode {
//     id
//     codeDiscount {
//         ... on DiscountCodeBasic {
//             title
//             summary
//             status               
//         }
//     }
//   }
//   userErrors {
//     field
//     message
//   }
// }
// }
// `,
//   {
//     variables: {
//       basicCodeDiscount: {
//         // recurringCycleLimit: 1,
//         startsAt: "2022-10-07T04:24:28-04:00",
//         title: "CODE1234567890",
//         usageLimit: 1,
//         appliesOncePerCustomer: true,
//         code: "CODE1234567890",
//         customerGets: {
//           // appliesOnOneTimePurchase: true,
//           // appliesOnSubscription: true,
//           items: {
//             all: true,
//             // products: {
//             //   productVariantsToAdd: [
//             //     "gid://shopify/ProductVariant/7521960231066",
//             //   ],
//             // },
//           },
//           value: {
//             discountAmount: {
//               amount: "100.00",
//               appliesOnEachItem: false,
//             },
//           },
//         },
//         customerSelection: {
//           customers: {
//             add: ["gid://shopify/Customer/7415446929562"],
//           },
//         },
//       },
//     },
//   },
// );