import { StyleSheet } from "react-native";




const safeStyle = StyleSheet.create({


    mainContainer:{
        flex:1

    },

    headerContainer:{
        backgroundColor:"#00BF63",
        flex:.7,
        alignItems:"center"

    },
    notifText:{
        color:"white",
        // fontFamily:"Poppins"
    },

    contentContainer:{
        backgroundColor:"white",
        flex:1,
        alignItems:"center",
        justifyContent:"space-between"
        

    },
    qrContainer:{
        marginTop:40,
        
    },
    safeContainer:{

        width:"80%",
        alignItems:"center",
        marginTop:20,
        flexDirection:"row",
        backgroundColor:"#f0f8ff",
        padding:10,
        borderRadius:10

    },

    linkContainer:{
        width:"80%",
        alignItems:"center",
        marginTop:40,
        flexDirection:"row",
        // borderWidth:1,
        backgroundColor:"#f0f8ff",
        padding:10,
        borderRadius:10
    },
    linkIconContainer:{
        paddingHorizontal:10
    },
    linkIcon:{

    },

    linkLabelContainer:{
       
        width:"80%"

    },
    scanResult:{
        width:"100%",
        alignItems:"center",
    },

    statusIconContainer:{
        paddingHorizontal:10
    },
    statusIcon:{

    },
    safeLabel:{

        fontSize:16,
        fontWeight:"bold",
        // fontFamily:"Poppins"

    },
    status:{
        color:"#00BF63",
        // fontFamily:"Poppins"

    },
    linkLabel:{
        fontSize:16,
        fontWeight:"bold",
        // fontFamily:"Poppins"


    },
    link:{
        color:"#00BF63",
  
        // fontFamily:"Poppins"
    },
    bttnContainer:{
   
       
        width:"80%",
       
        alignItems:"center",
        marginBottom:30,

    },

    goBttn:{
        backgroundColor:"#00BF63",
        paddingVertical:15,
        width:"90%",
        alignItems:"center",
        borderRadius:5,
    

    },

    goLabel:{
        color:"white",
        width:"80%",
        textAlign:"center",
       
        // fontFamily:"Poppins"
    },
    backLabel:{
        // fontFamily:"Poppins"
    },
    backBttn:{
        // backgroundColor:"#00BF63",
        paddingVertical:15,
        width:"90%",
        alignItems:"center",
        borderRadius:5,
        // borderWidth:1,
        textAlign:"center"
       
        // marginTop:10

    },

    backLabel:{
        // color:"white"
        width:"100%",
        textAlign:"center"
    
    }




});

export {safeStyle}