import * as Reflux from 'reflux';
import AWSAppSyncClient from 'aws-appsync';
import gql from 'graphql-tag';
import { Post } from '../constants/schema';
import awsconfig from '../appsync';

interface AppSyncStoreDefinition extends Reflux.Store {
    getAllPostsQuery(cb: (posts: Post[]) => void, limit?: number, token?: string): void;
}

const AppSyncStore = Reflux.createStore({
    init() {
        this.client = new AWSAppSyncClient({
            auth: {type: awsconfig.authenticationType, apiKey: awsconfig.apiKey},
            region: awsconfig.region,
            url: awsconfig.graphqlEndpoint
        });
    },

    getAllPostsQuery(cb: Function, limit?: number, token?: string) {
        const query = gql`
            query AllPosts {
                allPost(count: ${limit ? limit : 20}) {
                    __typename
                    id
                    title
                    content
                }
            }`;
        this.client.query({query}).then((data: {data: {allPost: Post[]; }}) => cb(data.data.allPost));
    }
}) as AppSyncStoreDefinition;

export default AppSyncStore;
