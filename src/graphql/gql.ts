/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n    query GetRole($name: String!) {\n      role(name: $name) {\n        name\n        description\n        systemRole\n        permissions {\n          name\n          description\n          module\n        }\n      }\n    }\n  ": types.GetRoleDocument,
    "\n      query GetCategory($id: Int!) {\n          category(id: $id) {\n              id\n              name\n              description\n          }\n      }\n  ": types.GetCategoryDocument,
    "\n    query GetRoles($first: Int, $after: String) {\n        roles(first: $first, after: $after) {\n            edges {\n                node {\n                    name\n                    description\n                }\n                cursor\n            }\n            pageInfo {\n                startCursor\n                endCursor\n                hasPreviousPage\n                hasNextPage\n            }\n        }\n    }\n": types.GetRolesDocument,
    "\n    query GetPermissions {\n        permissions {\n            name\n            description\n            module\n        }\n    }\n": types.GetPermissionsDocument,
    "\n    query GetUsersWithRoles($first: Int, $after: String) {\n        users(first: $first, after: $after) {\n            edges {\n                node {\n                    username\n                    name\n                    roles {\n                        name\n                        description\n                    }\n                }\n                cursor\n            }\n            pageInfo {\n                startCursor\n                endCursor\n                hasPreviousPage\n                hasNextPage\n            }\n        }\n    }\n": types.GetUsersWithRolesDocument,
    "\n    query GetUsers($first: Int, $after: String) {\n        users(first: $first, after: $after) {\n            edges {\n                node {\n                    name\n                    username\n                }\n                cursor\n            }\n            pageInfo {\n                startCursor\n                endCursor\n                hasPreviousPage\n                hasNextPage\n            }\n        }\n    }\n": types.GetUsersDocument,
    "\n    query GetCustomers($first: Int, $after: String) {\n        customers(first: $first, after: $after) {\n            edges {\n                node {\n                    id\n                    name\n                }\n                cursor\n            }\n            pageInfo {\n                startCursor\n                endCursor\n                hasPreviousPage\n                hasNextPage\n            }\n        }\n    }\n": types.GetCustomersDocument,
    "\n    query GetCustomer($id: Int!) {\n        customer(id: $id) {\n            id\n            name\n            phoneNumbers\n            emailAddress\n            type,\n            accountsReceivable {\n                creditLimit\n            }\n            fiscalSettings {\n                ncfType\n            }\n            address {\n                street\n                city\n                zipCode\n            },\n            priceList {\n                id name\n            }\n        }\n    }\n": types.GetCustomerDocument,
    "\n    query GetCategories($first: Int, $after: String) {\n        categories(first: $first, after: $after) {\n            edges {\n                node {\n                    id\n                    name\n                }\n                cursor\n            }\n            pageInfo {\n                startCursor\n                endCursor\n                hasPreviousPage\n                hasNextPage\n            }\n        }\n    }\n": types.GetCategoriesDocument,
    "\n    query GetCategory($id: Int!) {\n        category(id: $id) {\n            id\n            name\n            description\n        }\n    }\n": types.GetCategoryDocument,
    "\n    query GetProduct($id: Int!) {\n        product(id: $id) {\n            id\n            name\n            isService\n            category {\n                id\n                name\n            }\n            prices {\n                price\n            }\n        }\n    }\n": types.GetProductDocument,
    "\n    query GetProducts($first: Int, $after: String, $name: String) {\n        products(first: $first, after: $after, name: $name) {\n            edges {\n                node {\n                    id\n                    name\n                }\n                cursor\n            }\n            pageInfo {\n                startCursor\n                endCursor\n                hasPreviousPage\n                hasNextPage\n            }\n        }\n    }\n": types.GetProductsDocument,
    "\n    query GetUser($username: String!) {\n        user(username: $username) {\n            name\n            username\n            roles {\n                name\n                description\n            }\n        }\n    }\n": types.GetUserDocument,
    "\n    query GetTaxes {\n        taxes {\n            id\n            name\n            rate\n        }\n    }\n": types.GetTaxesDocument,
    "\n    query GetPriceLists {\n        priceLists {\n            id\n            name\n        }\n    }\n": types.GetPriceListsDocument,
    "\n    query ProductsByNameOrReference($search: String!, $first: Int, $after: String) {\n        productsByNameOrReference(first: $first, after: $after, search: $search) {\n            edges {\n                node {\n                    name, id, reference\n                }\n            }\n            pageInfo {\n                startCursor\n                endCursor\n                hasPreviousPage\n                hasNextPage\n            }\n        }\n    }\n": types.ProductsByNameOrReferenceDocument,
    "\n    query GetProductPrice($productId: Int, $priceListId: Int) {\n        productPrice(productId: $productId, priceListId: $priceListId) {\n            price\n        }\n    }\n": types.GetProductPriceDocument,
    "\n    query GetProductTaxes($productId: Int) {\n        productTaxes(productId: $productId) {\n            id\n            name\n            rate\n        }\n    }\n": types.GetProductTaxesDocument,
    "\n    query GetNcfSequences($active: Boolean = true) {\n        ncfSequences(active: $active) {\n            id {\n                date\n                ncfType\n            }\n            ncfSeries\n            initialSequence\n            finalSequence\n            currentSequence\n            active\n        }\n    }\n": types.GetNcfSequencesDocument,
    "\n    query GetSales($first: Int, $after: String) {\n        sales(first: $first, after: $after) {\n            edges {\n                node {\n                    id {\n                        document\n                        sequence\n                    }\n                    date\n                    total\n                    customer {\n                        name\n                    }\n                }\n                cursor\n            }\n            pageInfo {\n                startCursor\n                endCursor\n                hasPreviousPage\n                hasNextPage\n            }\n        }\n    }\n": types.GetSalesDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetRole($name: String!) {\n      role(name: $name) {\n        name\n        description\n        systemRole\n        permissions {\n          name\n          description\n          module\n        }\n      }\n    }\n  "): (typeof documents)["\n    query GetRole($name: String!) {\n      role(name: $name) {\n        name\n        description\n        systemRole\n        permissions {\n          name\n          description\n          module\n        }\n      }\n    }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n      query GetCategory($id: Int!) {\n          category(id: $id) {\n              id\n              name\n              description\n          }\n      }\n  "): (typeof documents)["\n      query GetCategory($id: Int!) {\n          category(id: $id) {\n              id\n              name\n              description\n          }\n      }\n  "];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetRoles($first: Int, $after: String) {\n        roles(first: $first, after: $after) {\n            edges {\n                node {\n                    name\n                    description\n                }\n                cursor\n            }\n            pageInfo {\n                startCursor\n                endCursor\n                hasPreviousPage\n                hasNextPage\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetRoles($first: Int, $after: String) {\n        roles(first: $first, after: $after) {\n            edges {\n                node {\n                    name\n                    description\n                }\n                cursor\n            }\n            pageInfo {\n                startCursor\n                endCursor\n                hasPreviousPage\n                hasNextPage\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetPermissions {\n        permissions {\n            name\n            description\n            module\n        }\n    }\n"): (typeof documents)["\n    query GetPermissions {\n        permissions {\n            name\n            description\n            module\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetUsersWithRoles($first: Int, $after: String) {\n        users(first: $first, after: $after) {\n            edges {\n                node {\n                    username\n                    name\n                    roles {\n                        name\n                        description\n                    }\n                }\n                cursor\n            }\n            pageInfo {\n                startCursor\n                endCursor\n                hasPreviousPage\n                hasNextPage\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetUsersWithRoles($first: Int, $after: String) {\n        users(first: $first, after: $after) {\n            edges {\n                node {\n                    username\n                    name\n                    roles {\n                        name\n                        description\n                    }\n                }\n                cursor\n            }\n            pageInfo {\n                startCursor\n                endCursor\n                hasPreviousPage\n                hasNextPage\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetUsers($first: Int, $after: String) {\n        users(first: $first, after: $after) {\n            edges {\n                node {\n                    name\n                    username\n                }\n                cursor\n            }\n            pageInfo {\n                startCursor\n                endCursor\n                hasPreviousPage\n                hasNextPage\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetUsers($first: Int, $after: String) {\n        users(first: $first, after: $after) {\n            edges {\n                node {\n                    name\n                    username\n                }\n                cursor\n            }\n            pageInfo {\n                startCursor\n                endCursor\n                hasPreviousPage\n                hasNextPage\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetCustomers($first: Int, $after: String) {\n        customers(first: $first, after: $after) {\n            edges {\n                node {\n                    id\n                    name\n                }\n                cursor\n            }\n            pageInfo {\n                startCursor\n                endCursor\n                hasPreviousPage\n                hasNextPage\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetCustomers($first: Int, $after: String) {\n        customers(first: $first, after: $after) {\n            edges {\n                node {\n                    id\n                    name\n                }\n                cursor\n            }\n            pageInfo {\n                startCursor\n                endCursor\n                hasPreviousPage\n                hasNextPage\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetCustomer($id: Int!) {\n        customer(id: $id) {\n            id\n            name\n            phoneNumbers\n            emailAddress\n            type,\n            accountsReceivable {\n                creditLimit\n            }\n            fiscalSettings {\n                ncfType\n            }\n            address {\n                street\n                city\n                zipCode\n            },\n            priceList {\n                id name\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetCustomer($id: Int!) {\n        customer(id: $id) {\n            id\n            name\n            phoneNumbers\n            emailAddress\n            type,\n            accountsReceivable {\n                creditLimit\n            }\n            fiscalSettings {\n                ncfType\n            }\n            address {\n                street\n                city\n                zipCode\n            },\n            priceList {\n                id name\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetCategories($first: Int, $after: String) {\n        categories(first: $first, after: $after) {\n            edges {\n                node {\n                    id\n                    name\n                }\n                cursor\n            }\n            pageInfo {\n                startCursor\n                endCursor\n                hasPreviousPage\n                hasNextPage\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetCategories($first: Int, $after: String) {\n        categories(first: $first, after: $after) {\n            edges {\n                node {\n                    id\n                    name\n                }\n                cursor\n            }\n            pageInfo {\n                startCursor\n                endCursor\n                hasPreviousPage\n                hasNextPage\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetCategory($id: Int!) {\n        category(id: $id) {\n            id\n            name\n            description\n        }\n    }\n"): (typeof documents)["\n    query GetCategory($id: Int!) {\n        category(id: $id) {\n            id\n            name\n            description\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetProduct($id: Int!) {\n        product(id: $id) {\n            id\n            name\n            isService\n            category {\n                id\n                name\n            }\n            prices {\n                price\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetProduct($id: Int!) {\n        product(id: $id) {\n            id\n            name\n            isService\n            category {\n                id\n                name\n            }\n            prices {\n                price\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetProducts($first: Int, $after: String, $name: String) {\n        products(first: $first, after: $after, name: $name) {\n            edges {\n                node {\n                    id\n                    name\n                }\n                cursor\n            }\n            pageInfo {\n                startCursor\n                endCursor\n                hasPreviousPage\n                hasNextPage\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetProducts($first: Int, $after: String, $name: String) {\n        products(first: $first, after: $after, name: $name) {\n            edges {\n                node {\n                    id\n                    name\n                }\n                cursor\n            }\n            pageInfo {\n                startCursor\n                endCursor\n                hasPreviousPage\n                hasNextPage\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetUser($username: String!) {\n        user(username: $username) {\n            name\n            username\n            roles {\n                name\n                description\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetUser($username: String!) {\n        user(username: $username) {\n            name\n            username\n            roles {\n                name\n                description\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetTaxes {\n        taxes {\n            id\n            name\n            rate\n        }\n    }\n"): (typeof documents)["\n    query GetTaxes {\n        taxes {\n            id\n            name\n            rate\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetPriceLists {\n        priceLists {\n            id\n            name\n        }\n    }\n"): (typeof documents)["\n    query GetPriceLists {\n        priceLists {\n            id\n            name\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query ProductsByNameOrReference($search: String!, $first: Int, $after: String) {\n        productsByNameOrReference(first: $first, after: $after, search: $search) {\n            edges {\n                node {\n                    name, id, reference\n                }\n            }\n            pageInfo {\n                startCursor\n                endCursor\n                hasPreviousPage\n                hasNextPage\n            }\n        }\n    }\n"): (typeof documents)["\n    query ProductsByNameOrReference($search: String!, $first: Int, $after: String) {\n        productsByNameOrReference(first: $first, after: $after, search: $search) {\n            edges {\n                node {\n                    name, id, reference\n                }\n            }\n            pageInfo {\n                startCursor\n                endCursor\n                hasPreviousPage\n                hasNextPage\n            }\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetProductPrice($productId: Int, $priceListId: Int) {\n        productPrice(productId: $productId, priceListId: $priceListId) {\n            price\n        }\n    }\n"): (typeof documents)["\n    query GetProductPrice($productId: Int, $priceListId: Int) {\n        productPrice(productId: $productId, priceListId: $priceListId) {\n            price\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetProductTaxes($productId: Int) {\n        productTaxes(productId: $productId) {\n            id\n            name\n            rate\n        }\n    }\n"): (typeof documents)["\n    query GetProductTaxes($productId: Int) {\n        productTaxes(productId: $productId) {\n            id\n            name\n            rate\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetNcfSequences($active: Boolean = true) {\n        ncfSequences(active: $active) {\n            id {\n                date\n                ncfType\n            }\n            ncfSeries\n            initialSequence\n            finalSequence\n            currentSequence\n            active\n        }\n    }\n"): (typeof documents)["\n    query GetNcfSequences($active: Boolean = true) {\n        ncfSequences(active: $active) {\n            id {\n                date\n                ncfType\n            }\n            ncfSeries\n            initialSequence\n            finalSequence\n            currentSequence\n            active\n        }\n    }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n    query GetSales($first: Int, $after: String) {\n        sales(first: $first, after: $after) {\n            edges {\n                node {\n                    id {\n                        document\n                        sequence\n                    }\n                    date\n                    total\n                    customer {\n                        name\n                    }\n                }\n                cursor\n            }\n            pageInfo {\n                startCursor\n                endCursor\n                hasPreviousPage\n                hasNextPage\n            }\n        }\n    }\n"): (typeof documents)["\n    query GetSales($first: Int, $after: String) {\n        sales(first: $first, after: $after) {\n            edges {\n                node {\n                    id {\n                        document\n                        sequence\n                    }\n                    date\n                    total\n                    customer {\n                        name\n                    }\n                }\n                cursor\n            }\n            pageInfo {\n                startCursor\n                endCursor\n                hasPreviousPage\n                hasNextPage\n            }\n        }\n    }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;