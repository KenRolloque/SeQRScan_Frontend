import { StyleSheet } from "react-native";


const generateStyle = StyleSheet.create({

    mainContainer:{
        flex:1,
        alignItems:"center",
        backgroundColor:"#ffffff"
      
    },
    
    sectionOne:{
        width:"100%",
        paddingBottom:"9%",
        // backgroundColor:"#004594",
        paddingHorizontal:"5%",
        // borderWidth:1
    },
    descContainer:{
        width:"100%",
        flexDirection:"row",
        alignItems:"center",
        marginVertical:10,
        // backgroundColor:"#004594",
        

    },
    descContainerModal:{
        width:"100%",
        alignItems:"center",
        marginTop:10,
        marginBottom:10,
        flexDirection:"row",
        backgroundColor:"#f0f8ff",
        padding:10,
        borderRadius:10
    },
    
    textContainer:{
        width:"100%",
        flexDirection:"row",
        alignItems:"center",
        marginVertical:10,
        // backgroundColor:"#004594",
    },
    icons:{
        marginRight:5
    },
    
    descLabel:{
        alignItems:"center",
        // fontFamily:"myFont"
        // backgroundColor:"#004594",
       
    },

    descInput:{
        height: 45,
     
        borderWidth: 1,
        padding: 10,
        marginBottom:10,
        borderRadius:5,
        borderColor:"#A6A6A6",
        // fontFamily:"myFont",
        color:"#706f6f",
        fontFamily:"Poppins-Regular"
        
      
    },
    
    textInput:{
        textAlignVertical:"top",
        borderWidth: 1,
        padding: 10,
        marginBottom:10,
        borderRadius:5,
        borderColor:"#A6A6A6",
        // fontFamily:"myFont",
        color:"#706f6f",
        height:400,
        fontFamily:"Poppins-Regular"
  
        
 

    },buttonsCont:{
        width:"100%",
        flexDirection:"row",
        justifyContent:"flex-end",
        marginTop:"4%"
        // backgroundColor:"#004594",
        
        

    },clearButton:{
        marginRight:"5%",
        paddingVertical:10,
        paddingHorizontal:20,
        borderRadius:5,
        

    },
    
    clearText:{
        // fontFamily:"myFont"
        fontFamily:"Poppins-Regular",
    },
    
    genButton:{
        backgroundColor:"#25C196",
        paddingVertical:10,
        paddingHorizontal:20,
        borderRadius:5,
        
    },

    clearButtonText:{
        color:"white",
        fontFamily:"Poppins-Regular",
        // fontFamily:"myFont"
    },disableDL:{
        backgroundColor:"#79F4D2"
    },


// Section Two
    sectionTwo:{

        backgroundColor:"#f7f7f7",
        flex:1,
        width:"100%",
        alignItems:"center",


    },ready:{

        width:"90%",
        backgroundColor:"white",
        textAlign:"center",
        // paddingVertical:15,
        // color:"white",
        borderRadius:5,
        // marginTop:"5%",
        // fontFamily:"Poppins"


        borderRadius: 10,
        padding: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,

    },qrContainer:{
        width:"90%",
        alignItems:"center",
        backgroundColor:"none"
        // backgroundColor:"#004594",

    },qr:{

        // marginVertical:"5%",
        // borderWidth:1,
        padding:20,
        backgroundColor:"white",
        // borderWidth:1
        
    },actionBttn:{
        width:"100%",
        // marginTop:20,
        // backgroundColor:"#1565C0",
        flexDirection:"row",
        justifyContent:"center",
        borderRadius:5,
        marginTop:20,
        // paddingVertical:50,
        // backgroundColor:"#004594",
    },
    addBttn:{
        // backgroundColor:"red",
        flexDirection:"row",
        width:"35%",
        marginLeft:20,
        alignItems:"center",
        // justifyContent:"center",
        borderRadius:5,
        backgroundColor:"#25C196"
     

    },dlBttn:{
        flexDirection:"row",
        width:"35%",
        alignItems:"center",
        justifyContent:"center",
        paddingVertical:10,
        borderRadius:5,
        backgroundColor:"#1565C0"


    },dlBttn_label:{
        // color:"white"
        // fontFamily:"Poppins"
    },dlIcon:{
        marginTop:2,
        marginRight:5,
    },addIcon:{
        marginRight:15,
        marginLeft:30,
        
    },
    
    addBttn_label:{
        color:"white",
        fontFamily:"Poppins-Regular",
       

    },dlBttn_label:{
        color:"white",
        fontFamily:"Poppins-Regular"
        
    },

    centeredView: {
        flex: 1,
        // justifyContent: 'center',
      
        alignItems: 'center',
        marginTop: 22,
        backgroundColor:"#ffffff"
     
      },
      modalView: {
        width:"80%",
        height:"75%",
        alignItems: 'center',
      },

      backContainer:{
        width:"90%",

      },

      button: {

        width:"20%",
        alignItems:"center",
        borderRadius:5,
        marginBottom:10
        
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        // fontWeight: 'bold',
        fontFamily:"Poppins-Regular",
        width:"100%",
        textAlign: 'center',
        paddingVertical:10,
       
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },



      linkContainer:{
        width:"100%",
        // alignItems:"center",
        marginBottom:10,
        flexDirection:"row",
        // borderWidth:1,
        backgroundColor:"#f0f8ff",
        padding:10,
        borderRadius:10,
        height:"35%"
    },

    descContainer:{
        width:"90%",

        marginBottom:10,
        flexDirection:"row",
        borderRadius:10,
    },

    linkIconContainer:{
        paddingHorizontal:10,
        backgroundColor:"none",
    },

    linkIcon:{

    },
    linkLabelContainer:{
        backgroundColor:"none",
        width:"88%",
    },
    linkLabel:{
        fontSize:16,
        fontFamily:"Poppins-SemiBold",
        color:"#4d4d4d"


    },
    link:{
        color:"#00BF63",
        width:"100%",
        fontFamily:"Poppins-Regular",
        paddingRight:10
    },
    desc:{
        color:"#00BF63",
        width:"100%",
        fontFamily:"Poppins-Regular"
    },

    descLabel:{
        fontSize:15,
        fontFamily:"Poppins-SemiBold",
        color:"#4d4d4d"
    },

    descLabelContainer:{
        backgroundColor:"none",
        width:"80%"
    }


})


export {generateStyle}