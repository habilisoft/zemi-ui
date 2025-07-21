import { gql } from '@/graphql/gql.ts';

const GET_ROLES = gql(/* GraphQL */`
    query GetRoles($first: Int, $after: String) {
        roles(first: $first, after: $after) {
            edges {
                node {
                    name
                    description
                }
                cursor
            }
            pageInfo {
                startCursor
                endCursor
                hasPreviousPage
                hasNextPage
            }
        }
    }
`);

const GET_PERMISSIONS = gql(/* GraphQL */`
    query GetPermissions {
        permissions {
            name
            description
            module
        }
    }
`);

const GET_USERS_WITH_ROLES = gql(/* GraphQL */`
    query GetUsersWithRoles($first: Int, $after: String) {
        users(first: $first, after: $after) {
            edges {
                node {
                    username
                    name
                    roles {
                        name
                        description
                    }
                }
                cursor
            }
            pageInfo {
                startCursor
                endCursor
                hasPreviousPage
                hasNextPage
            }
        }
    }
`);

const GET_USERS = gql(/* GraphQL */`
    query GetUsers($first: Int, $after: String) {
        users(first: $first, after: $after) {
            edges {
                node {
                    name
                    username
                }
                cursor
            }
            pageInfo {
                startCursor
                endCursor
                hasPreviousPage
                hasNextPage
            }
        }
    }
`);

const GET_CUSTOMERS = gql(/* GraphQL */`
    query GetCustomers($first: Int, $after: String) {
        customers(first: $first, after: $after) {
            edges {
                node {
                    id
                    name
                }
                cursor
            }
            pageInfo {
                startCursor
                endCursor
                hasPreviousPage
                hasNextPage
            }
        }
    }
`);

const GET_CUSTOMER = gql(/* GraphQL */`
    query GetCustomer($id: Int!) {
        customer(id: $id) {
            id
            name
            phoneNumbers
            emailAddress
            type,
            accountsReceivable {
                creditLimit
            }
            fiscalSettings {
                ncfType
            }
            address {
                street
                city
                zipCode
            },
            priceList {
                id name
            }
        }
    }
`);

const GET_CATEGORIES = gql(/* GraphQL */`
    query GetCategories($first: Int, $after: String) {
        categories(first: $first, after: $after) {
            edges {
                node {
                    id
                    name
                }
                cursor
            }
            pageInfo {
                startCursor
                endCursor
                hasPreviousPage
                hasNextPage
            }
        }
    }
`);

const GET_CATEGORY = gql(/* GraphQL */`
    query GetCategory($id: Int!) {
        category(id: $id) {
            id
            name
            description
        }
    }
`);

const GET_PRODUCT = gql(/* GraphQL */`
    query GetProduct($id: Int!) {
        product(id: $id) {
            id
            name
            isService
            category {
                id
                name
            }
            prices {
                price
            }
        }
    }
`);

const GET_PRODUCTS = gql(/* GraphQL */`
    query GetProducts($first: Int, $after: String, $name: String) {
        products(first: $first, after: $after, name: $name) {
            edges {
                node {
                    id
                    name
                }
                cursor
            }
            pageInfo {
                startCursor
                endCursor
                hasPreviousPage
                hasNextPage
            }
        }
    }
`);

const GET_USER = gql(/* GraphQL */`
    query GetUser($username: String!) {
        user(username: $username) {
            name
            username
            roles {
                name
                description
            }
        }
    }
`);

const GET_TAXES = gql(/* GraphQL */`
    query GetTaxes {
        taxes {
            id
            name
            rate
        }
    }
`);

const GET_PRICE_LISTS = gql(/* GraphQL */`
    query GetPriceLists {
        priceLists {
            id
            name
        }
    }
`);

const PRODUCTS_BY_NAME_OR_REFERENCE = gql(/* GraphQL */`
    query ProductsByNameOrReference($search: String!, $first: Int, $after: String) {
        productsByNameOrReference(first: $first, after: $after, search: $search) {
            edges {
                node {
                    name, id, reference
                }
            }
            pageInfo {
                startCursor
                endCursor
                hasPreviousPage
                hasNextPage
            }
        }
    }
`);

const GET_PRODUCT_PRICE = gql(/* GraphQL */`
    query GetProductPrice($productId: Int, $priceListId: Int) {
        productPrice(productId: $productId, priceListId: $priceListId) {
            price
        }
    }
`);

const GET_PRODUCT_TAXES = gql(/* GraphQL */`
    query GetProductTaxes($productId: Int) {
        productTaxes(productId: $productId) {
            id
            name
            rate
        }
    }
`);

const GET_NCF_SEQUENCES = gql(/* GraphQL */`
    query GetNcfSequences($active: Boolean = true) {
        ncfSequences(active: $active) {
            id {
                date
                ncfType
            }
            ncfSeries
            initialSequence
            finalSequence
            currentSequence
            active
        }
    }
`);

const GET_SALES = gql(/* GraphQL */`
    query GetSales($first: Int, $after: String) {
        sales(first: $first, after: $after) {
            edges {
                node {
                    id {
                        document
                        sequence
                    }
                    date
                    total
                    customer {
                        name
                    }
                }
                cursor
            }
            pageInfo {
                startCursor
                endCursor
                hasPreviousPage
                hasNextPage
            }
        }
    }
`);

export {
  GET_ROLES,
  GET_PERMISSIONS,
  GET_USERS,
  GET_USERS_WITH_ROLES,
  GET_CUSTOMERS,
  GET_CUSTOMER,
  GET_CATEGORIES,
  GET_PRODUCT,
  GET_CATEGORY,
  GET_PRODUCTS,
  GET_USER,
  GET_TAXES,
  PRODUCTS_BY_NAME_OR_REFERENCE,
  GET_PRICE_LISTS,
  GET_PRODUCT_PRICE,
  GET_PRODUCT_TAXES,
  GET_NCF_SEQUENCES,
  GET_SALES
}
