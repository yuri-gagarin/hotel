// @flow 

export type EmailData = {
  emailHeader?: string,
  originalMessageBody: string,
  responseEmailBody: string
}
export const generateReplyEmailBody = ({ emailHeader, originalMessageBody, responseEmailBody }: EmailData): string => {
  return (
    `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Static Template</title>
      </head>
      <body style="height: 100%; width: 100%;">
        <div
          style="width: 100%; height: 100%; display: flex; flex-direction: column; box-sizing: content-box; border: 5px solid blue;"
        >
          <div
            style="
              display: flex;
              justify-content: center;
              align-items: center;
              background: #0f2027;
              padding: 1em 0;
            "
          >
            <div
              style="
                width: auto;
                height: auto;
                display: flex;
                align-self: center;
                background: #0f2027;
                padding: 0.5em;
                font-size: 2em;
                font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
                  'Lucida Sans', Arial, sans-serif;
                color: white;
                border: 3px solid white;
                border-radius: 5px;
              "
            >
              - ${ emailHeader ?  emailHeader : "Hotel Response" } -
            </div>
          </div>

          <div
            style="
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              height: auto;
              width: 100%;
              padding: 0 1em;
              font-size: 0.75em;
              font-style: italic;
            "
          >
            <!-- original message -->
            <p style="color: teal; font-size: 1.25em; font-weight: 400;">
              Original message:
            </p>
            <div style="color: seagreen;">
              <!-- place original message content here-->
              ${ originalMessageBody }
            </div>
          </div>
          <div
            style="
              display: flex;
              flex-direction: column;
              border: 1px solid teal;
              border-radius: 5px;
              padding: 0 1em;
              box-sizing: border-box;
              width: 100%;
              min-height: 300px;
              margin-top: 1em;
            "
          >
            <h5 style="font-style: italic">Hotel responded:</h4>
            <!-- response body here -->
            <div style="display: flex; text-align: left; flex-direction: row; flex-wrap: wrap;">
              ${ responseEmailBody }
            </div>
          </div>
          <div
            style="
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: center;
              height: 50px;
              width: 100%;
              background: #0f2027;
              margin-top: 1em;
            "
          >
            <!-- email footer div -->
            <!-- facebook link -->
            <a
              role="social-icon-link"
              href="https://www.facebook.com/sendgrid/"
              target="_blank"
              alt="Facebook"
              title="Facebook"
              style="
                display: inline-block;
                background-color: rgb(139, 139, 32);
                margin-right: 5px;
                height: 30px;
                width: 30px;
                border-radius: 2px;
                -webkit-border-radius: 2px;
                -moz-border-radius: 2px;
              "
            >
              <img
                role="social-icon"
                alt="Facebook"
                title="Facebook"
                src="https://mc.sendgrid.com/assets/social/white/facebook.png"
                style="height: 30px; width: 30px;"
                height="30"
                width="30"
              />
            </a>
            <!-- twitter link -->
            <a
              role="social-icon-link"
              href="https://twitter.com/sendgrid?ref_src=twsrc%5egoogle%7ctwcamp%5eserp%7ctwgr%5eauthor"
              target="_blank"
              alt="Twitter"
              title="Twitter"
              style="
                display: inline-block;
                background-color: rgb(139, 139, 32);
                margin-right: 5px;
                height: 30px;
                width: 30px;
                border-radius: 2px;
                -webkit-border-radius: 2px;
                -moz-border-radius: 2px;
              "
            >
              <img
                role="social-icon"
                alt="Twitter"
                title="Twitter"
                src="https://mc.sendgrid.com/assets/social/white/twitter.png"
                style="height: 30px; width: 30px;"
                height="30"
                width="30"
              />
            </a>
            <!--instagram link  -->
            <a
              role="social-icon-link"
              href="https://www.instagram.com/sendgrid/?hl=en"
              target="_blank"
              alt="Instagram"
              title="Instagram"
              style="
                display: inline-block;
                background-color: rgb(139, 139, 32);
                margin-right: 5px;
                height: 30px;
                width: 30px;
                border-radius: 2px;
                -webkit-border-radius: 2px;
                -moz-border-radius: 2px;
              "
            >
              <img
                role="social-icon"
                alt="Instagram"
                title="Instagram"
                src="https://mc.sendgrid.com/assets/social/white/instagram.png"
                style="height: 30px; width: 30px;"
                height="30"
                width="30"
              />
            </a>
          </div>
        </div>
      </body>
    </html>`
  )
}