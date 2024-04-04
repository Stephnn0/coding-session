import { ActionFunctionArgs, json } from "@remix-run/node";
import { Form, useActionData, useSubmit } from "@remix-run/react";
import { Button, Layout, Page } from "@shopify/polaris";
import React from "react";
import { authenticate } from "~/shopify.server";

export async function action(args: ActionFunctionArgs) {
  const { admin } = await authenticate.admin(args.request);

  try {
    const response = await admin.graphql(
      `#graphql
      mutation discountCodeAppCreate($codeAppDiscount: DiscountCodeAppInput!) {
         discountCodeAppCreate(codeAppDiscount: $codeAppDiscount) {
    codeAppDiscount {
      # DiscountCodeApp fields
      ... on DiscountCodeApp {
                title
                status               
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
          codeAppDiscount: {
            code: "sshhshshjsjs",
            appliesOncePerCustomer: true,
            combinesWith: {
              orderDiscounts: true,
              productDiscounts: true,
              shippingDiscounts: true,
            },
            endsAt: "2019-09-07T15:50:00Z",
            functionId: "<your-functionId>",
            startsAt: "2019-09-07T15:50:00Z",
            title: "<your-title>",
            usageLimit: 1,
          },
        },
      },
    );

    if (response) {
      console.log("hit");
      const data = await response.json();
      console.log(data, "resssss");
      console.log(data);

      return json({
        data: data.data,
      });
    }
  } catch (err) {
    console.log(err as Error, "errr");
    console.log((err as Error).message, "errr");
  }
  return null;
}

const ShippingCode = () => {
  const submit = useSubmit();
  const generateShiipingCode = () =>
    submit({}, { replace: true, method: "POST" });

  const actionData = useActionData<typeof action>();
  console.log(actionData, "actionData");

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Form method="post" onSubmit={generateShiipingCode}>
            <Button submit>Submit</Button>
          </Form>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default ShippingCode;
