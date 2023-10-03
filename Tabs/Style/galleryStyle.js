import { StyleSheet } from "react-native";


const galleryStyle = StyleSheet.create({

    mainContainer:{
        backgroundColor:"#ffffff",
        flex:1,
        alignItems:"center",    



    },sectionOne:{
        width:"90%",
        textAlign:"center",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
     
        
        // marginTop:"7%",
    },title:{
    
    
    },bttnCont:{
        flexDirection:"row",
        width:"15%",
        justifyContent:"space-between"
    },
    
    listBttn:{
   
    },sortBttn:{
       
    },
    qrSize:{
        flexDirection:"row",
        alignItems:"center",
        

    },sizeInput:{
        backgroundColor:"#E6E6E6",
        width:"40%",
        textAlign:"center",
        marginLeft:"5%",
        paddingHorizontal:8,
        paddingVertical:5,
        // borderRadius:5
        borderRadius:5

    }  ,
    qrAction:{
        backgroundColor:"none",
        flexDirection:"row",
        width:50,
        justifyContent: 'space-between',

    },
    qrGallery:{
        width:"90%",


        marginBottom:40,

    },qrItem:{
        flexDirection:"row",
        alignItems:"center",
        // borderWidth:1,
        paddingHorizontal:15,
        paddingVertical:15,
        backgroundColor:"#EFEFEF",
        marginTop:"4%",
        borderStartWidth:4,
        borderStartColor:"#25C196",
        borderRadius:5
        // borderBottomWidth:1,
        // borderBottomColor:"#E6E6E6"

        
  

      
    },qrEven:{

        backgroundColor:"#E2F5FF",
        borderStartWidth:4,
        borderStartColor:"#2FA0D8"
        
    },qrOdd:{
        backgroundColor:"#E4FFF2",
        
        // backgroundColor:"#FAFAFA",
        

    },

    qrDesc:{
        // borderWidth:1,
        backgroundColor:"none",
        width:"75%",
        marginLeft:10
    },


    bttnListCont:{
        position:"absolute",
        // borderWidth:1,
        backgroundColor:"#ffffff",
        right:1,
        paddingVertical:20,
        paddingHorizontal:10,
        borderRadius:5,

          shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    bttn1:{
       
        paddingHorizontal:10,
        paddingVertical:5,
        marginBottom:5
    },
    bttn2:{
        
        paddingHorizontal:10,
        paddingVertical:5,
    },


    // Font
    descText:{
        fontFamily:"Poppins-SemiBold",
        // fontWeight:"bold",
        color:"#4d4d4d",
        fontSize:15,
       
    },
    linkText:{
   
        fontFamily:"Poppins-Regular",
        color:"#4d4d4d"

    },





})

export {galleryStyle}