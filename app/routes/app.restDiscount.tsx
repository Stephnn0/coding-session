import { ActionFunctionArgs } from "@remix-run/node";
import { Form, useActionData, useSubmit } from "@remix-run/react";
import { Button, Layout, Page } from "@shopify/polaris";
import React from "react";
import { authenticate } from "~/shopify.server";
//price_rules

type Props = {};

export async function action(args: ActionFunctionArgs) {
  const { admin, session } = await authenticate.admin(args.request);

  const price_rule = new admin.rest.resources.PriceRule({ session: session });

  price_rule.title = "Buy2iPodsGetiPodTouchForFree";
  price_rule.value_type = "percentage";
  price_rule.value = "-100.0";
  price_rule.customer_selection = "all";
  //   price_rule.target_type = "line_item";
  price_rule.target_type = "shipping_line";
  price_rule.target_selection = "all";
  price_rule.allocation_method = "each";
  price_rule.starts_at = "2018-03-22T00:00:00-00:00";
  price_rule.prerequisite_collection_ids = [841564295];
  price_rule.entitled_product_ids = [921728736];
  price_rule.prerequisite_to_entitlement_quantity_ratio = {
    prerequisite_quantity: 2,
    entitled_quantity: 1,
  };
  price_rule.allocation_limit = 3;
  await price_rule.save({
    update: true,
  });
}

const RestDiscount = (props: Props) => {
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

export default RestDiscount;
