import { ActionFunctionArgs, json } from "@remix-run/node";
import {
  Form,
  useActionData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { Button, Card, Layout, Page, TextField } from "@shopify/polaris";
import { useState } from "react";
import CustomCenterWrapper from "~/components/CenterWrapper";
import { authenticate } from "~/shopify.server";

export async function action(args: ActionFunctionArgs) {
  const { admin } = await authenticate.admin(args.request);
  const formData = await args.request.formData();
  const title = formData.get("title");
  const customer = formData.get("customer");

  //rule if customer is sent all is false and we pass customer id else all is true
  const all = customer ? false : true;

  console.log("title", title);

  try {
    const response = await admin.graphql(
      `#graphql
      mutation discountCodeBasicCreate($basicCodeDiscount: DiscountCodeBasicInput!) {
    discountCodeBasicCreate(basicCodeDiscount: $basicCodeDiscount) {
      codeDiscountNode {
        id
        codeDiscount {
            ... on DiscountCodeBasic {
                title
                summary
                status               
            }
            # ... on DiscountCodeFreeShipping {
            #   title
            #   summary

            # }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`,
      {
        variables: {
          // shippingFreeCodeDiscount: {},
          basicCodeDiscount: {
            // recurringCycleLimit: 1,
            startsAt: "2022-10-07T04:24:28-04:00",
            title: title,
            usageLimit: 1,
            appliesOncePerCustomer: true,
            // code: "CODE1234567890",
            code: title,
            customerGets: {
              // appliesOnOneTimePurchase: true,
              // appliesOnSubscription: true,
              items: {
                all: true,
                // products: {
                //   productVariantsToAdd: [
                //     "gid://shopify/ProductVariant/7521960231066",
                //   ],
                // },
              },
              value: {
                discountAmount: {
                  amount: "100.00",
                  appliesOnEachItem: false,
                },
              },
            },
            customerSelection: {
              all: all,
              customers: customer
                ? { add: [`gid://shopify/Customer/${customer}`] }
                : null,
            },
            // discountClass: "SHIPPING",
          },
        },
      },
    );

    if (response.ok) {
      console.log("hit");
      const data = await response.json();
      console.log(data);

      return json({
        data: data.data,
      });
    }
  } catch (err) {
    console.log(err, "error");
  }
  return null;
}

const ManualDiscount = () => {
  const nav = useNavigation();

  const isLoading =
    ["loading", "submitting"].includes(nav.state) && nav.formMethod === "POST";

  const [title, setTitle] = useState("");
  const [customer, setCustomer] = useState("7415446929562");

  //see graphql query response
  const actionData = useActionData<typeof action>();
  console.log(actionData, "actionData");

  const formData = new FormData();

  const submit = useSubmit();
  const generateManualDiscount = () =>
    submit(formData, { replace: true, method: "POST" });

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Form onSubmit={generateManualDiscount} method="post">
            <CustomCenterWrapper>
              <Card>
                <TextField
                  id="title"
                  name="title"
                  value={title}
                  onChange={(value) => setTitle(value)}
                  label="Discount Title"
                  autoComplete="off"
                />
                <TextField
                  id="customer"
                  name="customer"
                  value={customer}
                  onChange={(value) => setCustomer(value)}
                  label="Customer"
                  autoComplete="off"
                />
                <Button loading={isLoading} submit>
                  Submit
                </Button>
              </Card>
            </CustomCenterWrapper>
          </Form>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default ManualDiscount;
