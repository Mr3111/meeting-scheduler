import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
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
  Public = 'PUBLIC'
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

export type CreateMeetingMutationVariables = Exact<{
  title: Scalars['String'];
  id: Scalars['Int'];
  date: Scalars['String'];
  startTime: Scalars['String'];
  endTime: Scalars['String'];
  meetingRoomId: Scalars['Int'];
}>;


export type CreateMeetingMutation = { __typename?: 'Mutation', Meeting?: { __typename?: 'Meeting', id: number, title?: string | null } | null };

export type CreateRoomMutationVariables = Exact<{
  name: Scalars['String'];
  id: Scalars['Int'];
  floor: Scalars['Int'];
  buildingId: Scalars['Int'];
}>;


export type CreateRoomMutation = { __typename?: 'Mutation', MeetingRoom?: { __typename?: 'MeetingRoom', id: number, name?: string | null, building?: { __typename?: 'Building', id: number } | null } | null };

export type GetAllBuildingsRoomsMeetingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllBuildingsRoomsMeetingsQuery = { __typename?: 'Query', Buildings?: Array<{ __typename?: 'Building', id: number, name?: string | null, meetingRooms?: Array<{ __typename?: 'MeetingRoom', id: number, name?: string | null, floor: number, meetings?: Array<{ __typename?: 'Meeting', id: number, title?: string | null, date?: string | null, startTime?: string | null, endTime?: string | null } | null> | null } | null> | null } | null> | null };

export type GetAllBuildingsRoomsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllBuildingsRoomsQuery = { __typename?: 'Query', Buildings?: Array<{ __typename?: 'Building', id: number, name?: string | null, meetingRooms?: Array<{ __typename?: 'MeetingRoom', id: number, name?: string | null, floor: number } | null> | null } | null> | null };

export type GetAllMeetingRoomsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllMeetingRoomsQuery = { __typename?: 'Query', MeetingRooms?: Array<{ __typename?: 'MeetingRoom', id: number, name?: string | null, floor: number } | null> | null };

export type GetAllMeetingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllMeetingsQuery = { __typename?: 'Query', Meetings?: Array<{ __typename?: 'Meeting', id: number, title?: string | null, date?: string | null, startTime?: string | null, endTime?: string | null } | null> | null };

export type GetAllRoomsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllRoomsQuery = { __typename?: 'Query', MeetingRooms?: Array<{ __typename?: 'MeetingRoom', id: number, name?: string | null, floor: number } | null> | null };


export const CreateMeetingDocument = `
    mutation CreateMeeting($title: String!, $id: Int!, $date: String!, $startTime: String!, $endTime: String!, $meetingRoomId: Int!) {
  Meeting(
    id: $id
    title: $title
    date: $date
    startTime: $startTime
    endTime: $endTime
    meetingRoomId: $meetingRoomId
  ) {
    id
    title
  }
}
    `;
export const useCreateMeetingMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateMeetingMutation, TError, CreateMeetingMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateMeetingMutation, TError, CreateMeetingMutationVariables, TContext>(
      ['CreateMeeting'],
      (variables?: CreateMeetingMutationVariables) => fetcher<CreateMeetingMutation, CreateMeetingMutationVariables>(client, CreateMeetingDocument, variables, headers)(),
      options
    );
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
export const useCreateRoomMutation = <
      TError = unknown,
      TContext = unknown
    >(
      client: GraphQLClient,
      options?: UseMutationOptions<CreateRoomMutation, TError, CreateRoomMutationVariables, TContext>,
      headers?: RequestInit['headers']
    ) =>
    useMutation<CreateRoomMutation, TError, CreateRoomMutationVariables, TContext>(
      ['CreateRoom'],
      (variables?: CreateRoomMutationVariables) => fetcher<CreateRoomMutation, CreateRoomMutationVariables>(client, CreateRoomDocument, variables, headers)(),
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
      variables === undefined ? ['GetAllBuildingsRoomsMeetings'] : ['GetAllBuildingsRoomsMeetings', variables],
      fetcher<GetAllBuildingsRoomsMeetingsQuery, GetAllBuildingsRoomsMeetingsQueryVariables>(client, GetAllBuildingsRoomsMeetingsDocument, variables, headers),
      options
    );
export const GetAllBuildingsRoomsDocument = `
    query GetAllBuildingsRooms {
  Buildings {
    id
    name
    meetingRooms {
      id
      name
      floor
    }
  }
}
    `;
export const useGetAllBuildingsRoomsQuery = <
      TData = GetAllBuildingsRoomsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetAllBuildingsRoomsQueryVariables,
      options?: UseQueryOptions<GetAllBuildingsRoomsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetAllBuildingsRoomsQuery, TError, TData>(
      variables === undefined ? ['GetAllBuildingsRooms'] : ['GetAllBuildingsRooms', variables],
      fetcher<GetAllBuildingsRoomsQuery, GetAllBuildingsRoomsQueryVariables>(client, GetAllBuildingsRoomsDocument, variables, headers),
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
      variables === undefined ? ['GetAllMeetingRooms'] : ['GetAllMeetingRooms', variables],
      fetcher<GetAllMeetingRoomsQuery, GetAllMeetingRoomsQueryVariables>(client, GetAllMeetingRoomsDocument, variables, headers),
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
      variables === undefined ? ['GetAllMeetings'] : ['GetAllMeetings', variables],
      fetcher<GetAllMeetingsQuery, GetAllMeetingsQueryVariables>(client, GetAllMeetingsDocument, variables, headers),
      options
    );
export const GetAllRoomsDocument = `
    query GetAllRooms {
  MeetingRooms {
    id
    name
    floor
  }
}
    `;
export const useGetAllRoomsQuery = <
      TData = GetAllRoomsQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetAllRoomsQueryVariables,
      options?: UseQueryOptions<GetAllRoomsQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetAllRoomsQuery, TError, TData>(
      variables === undefined ? ['GetAllRooms'] : ['GetAllRooms', variables],
      fetcher<GetAllRoomsQuery, GetAllRoomsQueryVariables>(client, GetAllRoomsDocument, variables, headers),
      options
    );