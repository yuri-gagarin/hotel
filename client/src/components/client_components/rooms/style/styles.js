export const roomStyle = {
  background: {
    //backgroundColor: "#2c3531"
    background: "rgb(239,240,244)",
    background: "radial-gradient(circle, rgba(239,240,244,1) 0%, rgba(255,255,255,1) 100%)"
  },
  containerStyle: {
    marginTop: "90px",
  },
  carouselStyle: {
    height: "400px",
    borderLeft: "4px solid rgb(252, 219, 3)",
    borderTop: "4px solid rgb(252, 219, 3)",
    //borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    backgroundSize: "cover",
    cursor: "pointer"
  },
  carouselImgStyle: {
    flexShrink: 0,
    height: "400px"
  },
  sideImgHolder: {
    display: "inline-block",
    //border: "2px solid red",
    marginBottom: "-5px",
    //borderTop: "2px solid rgb(252, 219, 3)",
    width: "50%",
    height: "200px",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    cursor: "pointer"
  },
  sideImg: {
    objectFit: "cover",
    //minWidth: "100%",
    height: "200px"
  },
  headerStyle: {
    marginTop: "1em",
    marginBottom: "0.5em",
    textAlign: "center",
    fontSize: "3.5em",
    fontFamily: "Pacifico",
    fontWeight: "bold",
    color: "rgb(214, 199, 14)"
  },
  roomTitle: {
    //width: "100px",
    //height: "50px",
    textAlign: "center",
    fontSize: "2em",
    fontFamily: "Vollkorn",
    fontWeight:  "bold",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "white",
    paddingLeft: "1em",
    paddingRight: "1em",
    zIndex: 12,
  },
  strikeThrough: {
    height: "3px",
    width: "100%",
    backgroundColor: "rgb(214, 199, 14)",
    position: "absolute",
    top: "50%",
    transform: "translateY(50%)",
    zIndex: 10
  },
  descriptionHolder: {
    padding: 0, 
    border: "1px solid grey",
    marginTop: "5px",
    background: "rgb(226, 212, 45, 0.05)"
  },
  roomsDescription: {
    height: "auto",
    width: "auto",
    marginBottom: "1em",
    padding: "1em",
    //borderRight: "1px solid #2c3531",
   
    fontSize: "15px",
    fontFamily: "Montserrat",
  },
  roomDetails: {
    border: "1px solid grey",
    display: "inline-block",
    margin: "0.5em",
    padding: "0.5em",
    color: "rgb(38, 42, 51)"
  },
  roomOptionsHolder: {

  },
  roomOptions: {
    display: "inline-block",
    margin: "0.5em",
    color: "rgb(87, 139, 235)"
  },
  bookButton: {
    clear: "both"
  }
}