import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

const typeGraphql = `#graphql
    #Define object query
    type Book{
        id : ID
        title : String
        author: String
    }

    #Define query
    type Query {
        books: [Book]
        book(id: ID!): Book
      }
`

const ObjBooks = [
    {
      id:0,
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      id: 1,
      title: 'City of Glass',
      author: 'Paul Auster',
    },
];

const resolvers = {
    Query  :{
        books : ()=> ObjBooks,
        book  : (parents: any, args : {id: number}) => ObjBooks.find(book => book.id == args.id)
    }
}

const server = new ApolloServer({
    typeDefs: typeGraphql,
    resolvers
});


const { url } = await startStandaloneServer(server, {
    listen : { port: 3000}
})

console.log(`🚀  Server ready at: ${url}`);