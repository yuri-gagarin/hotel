// @flow
import * as React from "react";
import { Grid, Card, Button } from "semantic-ui-react";
// router //
import { useRouteMatch, useHistory, Route, Switch } from "react-router-dom";
// additonal components //
import { PostPreview } from "./PostPreview";
import { ViewAllCard } from "./ViewAllCard";
// types //
import type { NewsPostData } from "../../../../redux/reducers/news_posts/flowTypes";
// helpers //

type Props = {
  newsPosts: Array<NewsPostData>;
  currentNewsPost: NewsPostData;
  handleToggleNewsPost: (postId: string) => void;
  handleOpenEditNewsPost: () => void;
  triggerDeleteCurrentNewsPost: () => void;
  toggleNewsPostLiveStatus: () => Promise<boolean>;
};

export const ViewAllPosts = ({ newsPosts, currentNewsPost, handleToggleNewsPost, handleOpenEditNewsPost, triggerDeleteCurrentNewsPost, toggleNewsPostLiveStatus }: Props): React.Node => {

  const { url, path } = useRouteMatch();
  const history = useHistory();

  const goToPost = (postId: string, postTitle: string): void => {
    const normalized = postTitle.split(" ").join("_");
    handleToggleNewsPost(postId)
    history.push(`${url}/${normalized}`);
  };

  return (
    <Grid.Row style={{ height: "80%" }}>
      <Grid.Column width={ 16 } style={{ height: "100%", paddingLeft: "30px", paddingRight: "30px" }}>
        <Switch>
          <Route exact path={ url }>
            <Card.Group>
            {
              newsPosts.map((newsPost) => {
                return (
                  <ViewAllCard 
                    key={ newsPost._id }
                    newsPostData={ newsPost }
                    goToPost={ goToPost }
                  />
                )
              })
            }
            </Card.Group>
          </Route>
          <Route path={ `${url}/:postTitle`}>
            <PostPreview 
              history={ history } 
              newsPostData={ currentNewsPost } 
              handleOpenEditNewsPost={ handleOpenEditNewsPost } 
              triggerDeleteCurrentNewsPost={ triggerDeleteCurrentNewsPost }
              toggleNewsPostLiveStatus={ toggleNewsPostLiveStatus }
            />
          </Route>
        </Switch>
      </Grid.Column>   
    </Grid.Row> 
  );
};