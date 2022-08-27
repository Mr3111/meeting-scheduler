import type {
    UseMutationOptions,
    UseQueryOptions,
} from '@tanstack/react-query';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { GraphQLClient } from 'graphql-request';
import type { RequestInit } from 'graphql-request/dist/types.dom';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};

function fetcher<TData, TVariables>(
    client: GraphQLClient,
    query: string,
    variables?: TVariables,
    headers?: RequestInit['headers']
) {
    return async (): Promise<TData> =>
        client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    Upload: any;
};

export type Building = {
    __typename?: 'Building';
    id: Scalars['Int'];
    meetingRooms?: Maybe<Array<Maybe<MeetingRoom>>>;
    name?: Maybe<Scalars['String']>;
};

export enum CacheControlScope {
    Private = 'PRIVATE',
    Public = 'PUBLIC',
}

export type Meeting = {
    __typename?: 'Meeting';
    date?: Maybe<Scalars['String']>;
    endTime?: Maybe<Scalars['String']>;
    id: Scalars['Int'];
    meetingRoom?: Maybe<MeetingRoom>;
    startTime?: Maybe<Scalars['String']>;
    title?: Maybe<Scalars['String']>;
};

export type MeetingRoom = {
    __typename?: 'MeetingRoom';
    building?: Maybe<Building>;
    floor: Scalars['Int'];
    id: Scalars['Int'];
    meetings?: Maybe<Array<Maybe<Meeting>>>;
    name?: Maybe<Scalars['String']>;
};

export type Mutation = {
    __typename?: 'Mutation';
    Building?: Maybe<Building>;
    Meeting?: Maybe<Meeting>;
    MeetingRoom?: Maybe<MeetingRoom>;
};

export type MutationBuildingArgs = {
    id: Scalars['Int'];
    name: Scalars['String'];
};

export type MutationMeetingArgs = {
    date: Scalars['String'];
    endTime: Scalars['String'];
    id: Scalars['Int'];
    meetingRoomId: Scalars['Int'];
    startTime: Scalars['String'];
    title: Scalars['String'];
};

export type MutationMeetingRoomArgs = {
    buildingId: Scalars['Int'];
    floor: Scalars['Int'];
    id: Scalars['Int'];
    name: Scalars['String'];
};

export type Query = {
    __typename?: 'Query';
    Building?: Maybe<Building>;
    Buildings?: Maybe<Array<Maybe<Building>>>;
    Meeting?: Maybe<Meeting>;
    MeetingRoom?: Maybe<MeetingRoom>;
    MeetingRooms?: Maybe<Array<Maybe<MeetingRoom>>>;
    Meetings?: Maybe<Array<Maybe<Meeting>>>;
};

export type QueryBuildingArgs = {
    id: Scalars['Int'];
};

export type QueryMeetingArgs = {
    id: Scalars['Int'];
};

export type QueryMeetingRoomArgs = {
    id: Scalars['Int'];
};

export type CreateRoomMutationVariables = Exact<{
    name: Scalars['String'];
    id: Scalars['Int'];
    floor: Scalars['Int'];
    buildingId: Scalars['Int'];
}>;

export type CreateRoomMutation = {
    __typename?: 'Mutation';
    MeetingRoom?: {
        __typename?: 'MeetingRoom';
        id: number;
        name?: string | null;
        building?: { __typename?: 'Building'; id: number } | null;
    } | null;
};

export type GetAllBuildingsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllBuildingsQuery = {
    __typename?: 'Query';
    Buildings?: Array<{
        __typename?: 'Building';
        name?: string | null;
        id: number;
    } | null> | null;
};

export type GetAllBuildingsRoomsMeetingsQueryVariables = Exact<{
    [key: string]: never;
}>;

export type GetAllBuildingsRoomsMeetingsQuery = {
    __typename?: 'Query';
    Buildings?: Array<{
        __typename?: 'Building';
        id: number;
        name?: string | null;
        meetingRooms?: Array<{
            __typename?: 'MeetingRoom';
            id: number;
            name?: string | null;
            floor: number;
            meetings?: Array<{
                __typename?: 'Meeting';
                id: number;
                title?: string | null;
                date?: string | null;
                startTime?: string | null;
                endTime?: string | null;
            } | null> | null;
        } | null> | null;
    } | null> | null;
};

export type GetAllMeetingRoomsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllMeetingRoomsQuery = {
    __typename?: 'Query';
    MeetingRooms?: Array<{
        __typename?: 'MeetingRoom';
        id: number;
        name?: string | null;
        floor: number;
    } | null> | null;
};

export type GetAllMeetingsQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllMeetingsQuery = {
    __typename?: 'Query';
    Meetings?: Array<{
        __typename?: 'Meeting';
        id: number;
        title?: string | null;
        date?: string | null;
        startTime?: string | null;
        endTime?: string | null;
    } | null> | null;
};

export const CreateRoomDocument = `
    mutation CreateRoom($name: String!, $id: Int!, $floor: Int!, $buildingId: Int!) {
  MeetingRoom(name: $name, id: $id, floor: $floor, buildingId: $buildingId) {
    id
    building {
      id
    }
    name
  }
}
    `;
export const useCreateRoomMutation = <TError = unknown, TContext = unknown>(
    client: GraphQLClient,
    options?: UseMutationOptions<
        CreateRoomMutation,
        TError,
        CreateRoomMutationVariables,
        TContext
    >,
    headers?: RequestInit['headers']
) =>
    useMutation<
        CreateRoomMutation,
        TError,
        CreateRoomMutationVariables,
        TContext
    >(
        ['CreateRoom'],
        (variables?: CreateRoomMutationVariables) =>
            fetcher<CreateRoomMutation, CreateRoomMutationVariables>(
                client,
                CreateRoomDocument,
                variables,
                headers
            )(),
        options
    );
export const GetAllBuildingsDocument = `
    query GetAllBuildings {
  Buildings {
    name
    id
  }
}
    `;
export const useGetAllBuildingsQuery = <
    TData = GetAllBuildingsQuery,
    TError = unknown
>(
    client: GraphQLClient,
    variables?: GetAllBuildingsQueryVariables,
    options?: UseQueryOptions<GetAllBuildingsQuery, TError, TData>,
    headers?: RequestInit['headers']
) =>
    useQuery<GetAllBuildingsQuery, TError, TData>(
        variables === undefined
            ? ['GetAllBuildings']
            : ['GetAllBuildings', variables],
        fetcher<GetAllBuildingsQuery, GetAllBuildingsQueryVariables>(
            client,
            GetAllBuildingsDocument,
            variables,
            headers
        ),
        options
    );
export const GetAllBuildingsRoomsMeetingsDocument = `
    query GetAllBuildingsRoomsMeetings {
  Buildings {
    id
    name
    meetingRooms {
      id
      name
      floor
      meetings {
        id
        title
        date
        startTime
        endTime
      }
    }
  }
}
    `;
export const useGetAllBuildingsRoomsMeetingsQuery = <
    TData = GetAllBuildingsRoomsMeetingsQuery,
    TError = unknown
>(
    client: GraphQLClient,
    variables?: GetAllBuildingsRoomsMeetingsQueryVariables,
    options?: UseQueryOptions<GetAllBuildingsRoomsMeetingsQuery, TError, TData>,
    headers?: RequestInit['headers']
) =>
    useQuery<GetAllBuildingsRoomsMeetingsQuery, TError, TData>(
        variables === undefined
            ? ['GetAllBuildingsRoomsMeetings']
            : ['GetAllBuildingsRoomsMeetings', variables],
        fetcher<
            GetAllBuildingsRoomsMeetingsQuery,
            GetAllBuildingsRoomsMeetingsQueryVariables
        >(client, GetAllBuildingsRoomsMeetingsDocument, variables, headers),
        options
    );
export const GetAllMeetingRoomsDocument = `
    query GetAllMeetingRooms {
  MeetingRooms {
    id
    name
    floor
  }
}
    `;
export const useGetAllMeetingRoomsQuery = <
    TData = GetAllMeetingRoomsQuery,
    TError = unknown
>(
    client: GraphQLClient,
    variables?: GetAllMeetingRoomsQueryVariables,
    options?: UseQueryOptions<GetAllMeetingRoomsQuery, TError, TData>,
    headers?: RequestInit['headers']
) =>
    useQuery<GetAllMeetingRoomsQuery, TError, TData>(
        variables === undefined
            ? ['GetAllMeetingRooms']
            : ['GetAllMeetingRooms', variables],
        fetcher<GetAllMeetingRoomsQuery, GetAllMeetingRoomsQueryVariables>(
            client,
            GetAllMeetingRoomsDocument,
            variables,
            headers
        ),
        options
    );
export const GetAllMeetingsDocument = `
    query GetAllMeetings {
  Meetings {
    id
    title
    date
    startTime
    endTime
  }
}
    `;
export const useGetAllMeetingsQuery = <
    TData = GetAllMeetingsQuery,
    TError = unknown
>(
    client: GraphQLClient,
    variables?: GetAllMeetingsQueryVariables,
    options?: UseQueryOptions<GetAllMeetingsQuery, TError, TData>,
    headers?: RequestInit['headers']
) =>
    useQuery<GetAllMeetingsQuery, TError, TData>(
        variables === undefined
            ? ['GetAllMeetings']
            : ['GetAllMeetings', variables],
        fetcher<GetAllMeetingsQuery, GetAllMeetingsQueryVariables>(
            client,
            GetAllMeetingsDocument,
            variables,
            headers
        ),
        options
    );
