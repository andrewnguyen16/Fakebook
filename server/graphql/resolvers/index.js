const { mergeResolvers } = require("@graphql-tools/merge");

const userResolvers = require("./user");
const postResolvers = require("./post");

const resolvers = [userResolvers, postResolvers];

module.exports = mergeResolvers(resolvers);
