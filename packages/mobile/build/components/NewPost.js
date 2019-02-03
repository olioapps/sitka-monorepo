import * as React from 'react';
import { TextInput } from 'react-native';
import graphqlTag from 'graphql-tag';
import { Mutation } from 'react-apollo';
class MyTextInput extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            text: '',
        };
        this.onSubmit = () => {
            const { onSubmit } = this.props;
            const { text } = this.state;
            onSubmit(text);
            this.setState({ text: '' });
        };
        this.onChange = (text) => {
            this.setState({ text });
        };
    }
    render() {
        const { text } = this.state;
        return (<TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} placeholder="Enter text..." onSubmitEditing={this.onSubmit} onChangeText={this.onChange} value={text}/>);
    }
}
const ADD_POST = graphqlTag `
mutation addPost($text: String!) {
  addPost(text: $text)
}
`;
const NewPost = () => (<Mutation mutation={ADD_POST} refetchQueries={['queryPosts']}>
    {(addPost) => {
    const add = (text) => {
        addPost({ variables: { text } });
    };
    return (<MyTextInput onSubmit={add}/>);
}}
  </Mutation>);
export default NewPost;
