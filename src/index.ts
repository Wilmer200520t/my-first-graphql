import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

/**
 * Definition Server tools
 */
let port: number = parseInt(process.env.PORT || '3000');

/**
 * Definition Server
 */
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

    #Define Mutation
    type Mutation {
        createBook(id: ID!, title: String, author: String) : Book
        updateBook(id: ID!, title: String, author: String) : Book
        deleteBook(id: ID) : Book
    }
`
/**
 * Data Base
 */
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

/**
 * Resolver from Query and Mutation
 */
const resolvers = {
    Query  :{
        books : ()=> ObjBooks,
        book  : (parents: any, args : {id: number}) => ObjBooks.find(book => book.id == args.id)
    },
    Mutation :{
        createBook : (parents: any, args: any) =>{
            ObjBooks.push({...args})
            return args
        },
        updateBook : (parents: any, args: any) =>{
            ObjBooks.map(book =>{
                if(book.id == args.id) Object.assign(book, args)
            })
            return ObjBooks.find(book => book.id == args.id)
        },
        deleteBook : (parents: any, args: any) =>{
            ObjBooks.map((book, index) =>{
                if(book.id == args.id) ObjBooks.splice(index, 1)
            })
            return args
        }

    }
}

/**
 * Start Server
 */
const server = new ApolloServer({
    typeDefs: typeGraphql,
    resolvers,
    nodeEnv: 'development',
});


const { url } = await startStandaloneServer(server, {
    listen : { port }
})

console.log(`🚀  Server ready at: ${url}`);