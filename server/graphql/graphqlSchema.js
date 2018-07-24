const { knex } = require('../../database/knex')
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLID
} = require('graphql');

const TaskType = new GraphQLObjectType({
    name : 'Task',
    description: 'This is a task object',

    fields: () => ({
        id: {type: GraphQLID},
        created_at: {type: GraphQLString},
        updated_at: {type: GraphQLString},
        sprint_id: {type: GraphQLInt},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        user_id: {type: GraphQLInt},
        status_code: {type: GraphQLInt},
        eta: {type: GraphQLString},
        priority_code: {type: GraphQLInt},
        difficulty: {type: GraphQLInt},
        blockers: {
            type: BlockerType,
            resolve(parent, args) {
                let result 
                blockers.forEach((val)=>{
                    if (parent.id === val.task_id) {
                        result = val;
                    }
                })
                return result;
            }
        }
    })
});

const BlockerType = new GraphQLObjectType({
    name: 'Blocker',
    description: 'This is a blocker object',
    
    fields: () => ({
        id: {type: GraphQLID},
        created_at: {type: GraphQLString},
        updated_at: {type: GraphQLString},
        title: {type: GraphQLString},
        description: {type: GraphQLString},
        task_id: {type: GraphQLID},
        status_code: {type: GraphQLInt}
    })
})

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'This is a user object',

    fields: () => ({
        id: {type: GraphQLID},
        created_at: {type: GraphQLString},
        updated_at: {type: GraphQLString},
        username: {type: GraphQLString},
        password: {type: GraphQLString},
        owner_id: {type: GraphQLID}
    })
})

const SprintType = new GraphQLObjectType({
    name: 'Sprint',
    description: 'This is a sprint object',

    fields: () => ({
        id: {type: GraphQLID},
        created_at: {type: GraphQLString},
        updated_at: {type: GraphQLString},
        title: {type: GraphQLString}
    })
})

//this is the root query. It is how a user enters the graph
const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        task: {
            type: TaskType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args) {
                return knex("tasks").select().where('id', args.id).then((result)=>{return result[0]});
            }
        },
        tasks: {
            type: new GraphQLList(TaskType),
            resolve(parent, args) {
                // return tasks
                return knex("tasks").select();
                
            }
        },
        users: {
            type: new GraphQLList(UserType),
            resolve(parent, args) {
                //return users
                return knex("users").select();
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addTask: {
            type: TaskType,
            args: {
                title: {type: GraphQLString},
                description: {type: GraphQLString}
            },
            resolve(parent, args) {
                //add args to database
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});