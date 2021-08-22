// @flow
import * as React from "react";
import { Button, Card, CardContent, Icon } from "semantic-ui-react";
// additional components //
import { CardOnlineStatusBlinkers } from "../../shared/CardOnlineStatusBlinkers";
// types //
import type { NewsPostData } from "../../../../redux/reducers/news_posts/flowTypes";
import { formatDate } from "../../../helpers/dateHelpers";
// styles //
import styles from "./css/viewAllCard.module.css";
// helpers //
import { removeHTMLTagsFromString, trimStringToSpecificLength } from "../../../helpers/displayHelpers";

type Props = {
  newsPostData: NewsPostData;
  goToPost: (postId: string, postTitle: string) => void;
};

export const ViewAllCard = ({ newsPostData, goToPost }: Props): React.Node => {
  const [ localState, setLocalState ] = React.useState<{ newsPostContent: string }>({ newsPostContent: "" });
  const { _id: postId, title, createdBy, content, createdAt } = newsPostData;

  React.useEffect(() => {
    if (newsPostData.content) setLocalState({ newsPostContent: trimStringToSpecificLength(removeHTMLTagsFromString(content), 100) });
  }, [ newsPostData ]);

  return (
    <Card>
      <div className={ styles.titleContent }>
        <span>Title: </span>
        <span>{ title }</span>
      </div>
      <div className={ styles.authorContent }>
        <span>Author: </span>
        <span>{ createdBy }</span>
      </div>
      <Card.Content>
        { localState.newsPostContent }
      </Card.Content>
      <Card.Meta style={{ paddingLeft: "15px" }}>
        <span>Created at:</span>
        <span>{ formatDate(createdAt) }</span>
      </Card.Meta>
      <Card.Meta style={{ paddingLeft: "15px" }}>
        <span>Edited at:</span>
        <span>{ formatDate(createdAt) }</span>
      </Card.Meta>
      <Card.Content>
        <Button basic color="green" onClick={ () => goToPost(postId, title) }>
          View
          <Icon className={ styles.viewAllCardIcon } name="folder open outline" />
        </Button>
      </Card.Content>
      <CardContent>
        <CardOnlineStatusBlinkers live={ newsPostData.live } />
      </CardContent>
    </Card>
  );
};