import { GraphQLClient } from 'graphql-request';

const headers = {
    token: 'test1234',
};

const graphQLClient = new GraphQLClient(
    'http://smart-meeting.herokuapp.com/graphql',
    {
        headers,
    }
);

export default graphQLClient;
