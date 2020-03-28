import OpenMessageForm from "../OpenMessageForm";

export const messageForm = {
  formContainer: {
    backgroundColor: "white",
    border: "1px solid grey",
    borderRadius: "5px",
    width: "33%",
    //display: "flex",
    //flexDirection: "column",
    //justifyContent: "center",
    position: "fixed",
    bottom: "1%",
    right: "1em",
    padding: "1em",
    zIndex: "999"
  },
  closeMessageForm: {
    border: "1px solid green",
    position: "relative",
    width: "50px",
    left: "2%",
    borderRadius: "5px",
    textAlign: "center",
    //paddingTop: "12px",
    cursor: "pointer"
  },
  messageView: {
    height: "200px",
    border: "1px solid grey",
    borderRadius: "5px",
    marginTop: "1em",
    marginBottom: "1em",
    overflowY: "scroll"
  },
  messagesViewContainer: {
    //flex: 1,
    backgroundColor: "white",
    border: "1px solid red",
    width: "33%",
    height: "auto",
    position: "fixed",
    bottom: "10%",
    right: 0,
    padding: "1em",
    zIndex: "999"
  },
  messagesView: {
    backgroundColor: "white",
    width: "100%",
    height: "300px",
    overflow: "scroll"
  }

};
export const openMessageForm = {
  formContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100px",
    width: "100px",
    position: "fixed",
    bottom: "10%",
    right: "0%",
    //backgroundColor: "yellow",
    zIndex: 999
  },
  adminOnlineIndicator: {
    height: "25px",
    width: "25px",
    backgroundColor: "green",
    borderRadius: "12.5px",
    zIndex: 999
  },
  messageBtn: {
    height: "auto",
    width: "auto",
    borderRadius: "10px",
    backgroundColor: "rgb(102, 153, 255)",
    marginTop: "0.25em",
    padding: "0.5em",
    border: "1px solid white",
    cursor: "pointer",
    color: "white",
    "&:hover": {
      backgroundColor: "red"
    }
  }
};
