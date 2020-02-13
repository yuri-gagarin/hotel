import OpenMessageForm from "../OpenMessageForm";

export const messageForm ={
    backgroundColor: "white",
    border: "1px solid red",
    width: "33%",
    height: "33",
    position: "fixed",
    bottom: "50%",
    right: 0,
    padding: "1em",
    zIndex: "999"
};
export const closeMessageForm = {
    border: "1px solid white",
    height: "50px",
    width: "50px",
    position: "absolute",
    right: "0.5em",
    top: "0.5em",
    borderRadius: "25px",
    textAlign: "center",
    paddingTop: "12px",
    cursor: "pointer"
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
