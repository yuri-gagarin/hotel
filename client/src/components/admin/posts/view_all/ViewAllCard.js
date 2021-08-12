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
  goToPost: (postTitle: string) => void;
};

export const ViewAllCard = ({ newsPostData, goToPost }: Props): React.Node => {
  const [ localState, setLocalState ] = React.useState<{ newsPostContent: string }>({ newsPostContent: "" });


  React.useEffect(() => {
    if (newsPostData.content) setLocalState({ newsPostContent: trimStringToSpecificLength(removeHTMLTagsFromString(newsPostData.content), 100) });
  }, [ newsPostData ]);

  return (
    <Card>
      <Card.Content>
        { newsPostData.title }
      </Card.Content>
      <Card.Content>
        { localState.newsPostContent }
      </Card.Content>
      <Card.Content>
        <Button onClick={ () => goToPost(newsPostData.title) }>View</Button>
      </Card.Content>
    </Card>
  );
};