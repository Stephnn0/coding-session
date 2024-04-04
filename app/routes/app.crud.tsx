import { ActionFunctionArgs } from "@remix-run/node";
import { Form, useRouteError, useSubmit } from "@remix-run/react";
import { Button, Card, Grid, Layout, Page, TextField } from "@shopify/polaris";
import React, { useState } from "react";
import { createDiscount } from "~/api/discounts";

// export async function loader() {
//   if (1 === 1) {
//     throw new Error("Oh no! Something went wrong!");
//   }
// }

export async function action(args: ActionFunctionArgs) {
  const formData = await args.request.formData();
  const code: string = formData.get("dis") as string; // Type assertion;
  console.log(code, "code");
  try {
    const response = await createDiscount(code as any);

    if (response) {
      console.log(response);
    }
  } catch (err) {
    console.log(err);
  }
  return null;
}

const Crud = () => {
  const error = useRouteError();
  const [dis, setDis] = useState("");
  const formData = new FormData();
  const submit = useSubmit();
  const createDiscount = () =>
    submit(formData, { replace: true, method: "POST" });

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Grid columns={{ xs: 2, sm: 2, md: 2, lg: 2, xl: 2 }}>
            <Grid.Cell>
              <Card>
                <Form onSubmit={createDiscount} method="post">
                  <TextField
                    id="dis"
                    name="dis"
                    value={dis}
                    onChange={(value) => setDis(value)}
                    label="code"
                    autoComplete="off"
                  />
                  <Button submit variant="primary">
                    Create Code
                  </Button>
                </Form>
              </Card>
            </Grid.Cell>
            <Grid.Cell>
              <Card></Card>
            </Grid.Cell>
          </Grid>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Crud;
