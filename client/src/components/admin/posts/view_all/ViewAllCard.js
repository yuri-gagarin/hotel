// @flow
import * as React from "react";
import { Button, Card } from "semantic-ui-react";
// additional components //
// types //
import type { NewsPostData } from "../../../../redux/reducers/news_posts/flowTypes";
// helpers //
import { removeHTMLTagsFromString, trimStringToSpecificLength } from "../../../helpers/displayHelpers";

type Props = {
  newsPostData: NewsPostData;
  goToPost: (postId: string, postTitle: string) => void;
};

export const ViewAllCard = ({ newsPostData, goToPost }: Props): React.Node => {
  const [ localState, setLocalState ] = React.useState<{ newsPostContent: string }>({ newsPostContent: "" });
  const { _id: postId, title, content } = newsPostData;

  React.useEffect(() => {
    if (newsPostData.content) setLocalState({ newsPostContent: trimStringToSpecificLength(removeHTMLTagsFromString(content), 100) });
  }, [ newsPostData ]);

  return (
    <Card>
      <Card.Content>
        { title }
      </Card.Content>
      <Card.Content>
        { localState.newsPostContent }
      </Card.Content>
      <Card.Content>
        <Button onClick={ () => goToPost(postId, title) }>View</Button>
      </Card.Content>
    </Card>
  );
};