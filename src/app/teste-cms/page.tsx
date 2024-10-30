import { client } from '../../../tina/__generated__/client'
interface Post {
    title: string;
    body: {
        type: string;
        children: Array<{
            type: string;
            text?: string;
            children?: Array<{ type: string; text?: string }>;
        }>;
    };
}
const TesteCmsPage = async() => {
    const response = await client.queries.post({ relativePath: 'hello-world.md' });
    const myPost = response.data.post as unknown as Post;

    console.log(myPost.body)
    return (
        <div>
        <h1>Teste CMS</h1>
        <h2>{myPost.title}</h2>
        {}
        </div>
    );
}

export default TesteCmsPage;