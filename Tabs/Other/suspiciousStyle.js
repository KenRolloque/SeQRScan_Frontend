import { StyleSheet } from "react-native";


const suspiciousStyle = StyleSheet.create({


    mainContainer:{
        flex:1

    },

    headerContainer:{
        // backgroundColor:"#00BF63",
        flex:.7,
        alignItems:"center",
        resizeMode:"cover"

    },
    notifText:{
        color:"white",
        // fontFamily:"Poppins"
    },

    contentContainer:{

        flex:1,
        alignItems:"center",
        backgroundColor:"white",
        justifyContent:"space-between"
    
    },

    scanResult:{
        width:"100%",
        alignItems:"center",
        
    },

    linkIcon:{

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
    linkLabelContainer:{
        width:"100%"

    },
    safeLabel:{

        fontSize:16,
        fontWeight:"bold",
        // fontFamily:"Poppins"

    },
    status:{
        color:"#FF0000",
        // fontFamily:"Poppins"

    },
    statusIconContainer:{
        paddingHorizontal:10
    },
    statusIcon:{

    },
    linkLabel:{
        fontSize:16,
        fontWeight:"bold",
        // fontFamily:"Poppins"

    },
    link:{
        color:"#FF0000",
    
        width:"80%"
        // fontFamily:"Poppins"
    },
    bttnContainer:{
   
       
        width:"80%",
       
        alignItems:"center",
        marginBottom:30,

    },

    goBttn:{
        backgroundColor:"#C20000",
        paddingVertical:15,
        width:"90%",
        alignItems:"center",
        borderRadius:5,
    

    },

    goLabel:{
        color:"white",
        width:"80%",
        textAlign:"center"
    },
    backBttn:{
        // backgroundColor:"#00BF63",
        paddingVertical:15,
        width:"90%",
        alignItems:"center",
        borderRadius:5,
        textAlign:"center"
        // marginTop:10

    },

    backLabel:{
        // color:"white"
    }




});

export {suspiciousStyle}