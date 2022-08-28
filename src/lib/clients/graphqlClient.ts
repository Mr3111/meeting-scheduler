import { GraphQLClient } from 'graphql-request';

import { localStorageGetItem } from '../../utils';

const headers = {
    token: localStorageGetItem('token') || 'test1234',
};

const graphQLClient = new GraphQLClient(
    'https://smart-meeting.herokuapp.com/graphql',
    {
        headers,
    }
);

export default graphQLClient;
