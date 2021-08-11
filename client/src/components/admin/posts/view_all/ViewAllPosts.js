// @flow
import * as React from "react";
import { Grid, Card, Button } from "semantic-ui-react";
// additonal components //
import { ViewAllCard } from "./ViewAllCard";
// types //
import type { NewsPostData } from "../../../../redux/reducers/news_posts/flowTypes";
// helpers //

type Props = {
  newsPosts: Array<NewsPostData>;
}
export const ViewAllContainer = ({ newsPosts }: Props): React.Node => {

  return (
    <Grid.Row style={{ height: "80%" }}>
      <Grid.Column width={ 16 }>
        <Card.Group>
          {
            newsPosts.map((newsPost) => {
              return (
                <ViewAllCard 
                  key={ newsPost._id }
                  newsPostData={ newsPost }
                />
              )
            })
          }
        </Card.Group>
      </Grid.Column>
      
    </Grid.Row>
  );
};