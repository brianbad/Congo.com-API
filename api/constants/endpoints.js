module.exports = {
    LOGIN: "/login",
    GET_USER_FROM_TOKEN: "/getUserFromToken",

    GET_USERS: "/users",
    GET_USER_BY_USERNAME: "/users/:username",
    CREATE_USER: "/users/create",
    UPDATE_USER_BY_USERNAME: "/users/update/:username",
    DELETE_USER_BY_USERNAME: "/users/delete/:username",

    GET_ITEMS: "/items",
    GET_ITEM_BY_ID: "/item/:itemId",
    SEARCH_ITEMS: "/items/search",
    CREATE_ITEM: "/items/create",
    UPDATE_ITEM_BY_ID: "/items/update/:itemId",
    DELETE_ITEM_BY_ID: "/items/delete/:itemId"
}