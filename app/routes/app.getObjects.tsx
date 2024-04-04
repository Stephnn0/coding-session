import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Button, Layout, Page } from "@shopify/polaris";
import { apiVersion, authenticate } from "~/shopify.server";

// {
//     metaobjects(type) {
//       # MetaobjectConnection fields
//     }
// }

export const queryById = `
metaobject(id: "gid://shopify/MetaobjectDefinition/1371668634") {
    id
    displayName
    type
  }
`;

export const query = `
{
    metaobjects(type: "", first: 10) {
        edges {
          node {
            definition {
              name
              id
            }
          }
        }
      }

}
`;

export async function loader(args: LoaderFunctionArgs) {
  console.log("-----hit--------");
  const { session } = await authenticate.admin(args.request);
  const { shop, accessToken } = session;

  try {
    const response = await fetch(
      `https://${shop}/admin/api/${apiVersion}/graphql.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/graphql",
          "X-Shopify-Access-Token": accessToken!,
        },
        body: queryById,
      },
    );

    if (response.ok) {
      console.log("-----hit--------");

      const data = await response.json();
      console.log(data, "data");
      console.log(data.locations, "data");

      const {
        data: {
          data: { edges },
        },
      } = data;
      return edges;
    }
  } catch (Err) {
    console.log(Err, "error objects");
  }

  return null;
}

const GetObjects = () => {
  const collections: any = useLoaderData();
  console.log(collections, "collections");

  return (
    <Page>
      <Layout>
        <Button>query data</Button>
      </Layout>
    </Page>
  );
};

export default GetObjects;
