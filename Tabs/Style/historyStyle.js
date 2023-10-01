import { StyleSheet } from "react-native";


const historyStyle = StyleSheet.create({

    mainContainer:{
        flex:1,
        backgroundColor:"white",
        alignItems:"center",
        margin:0,
        padding:0,
    
    },
    bttnCont:{
        width:"90%",
        flexDirection:"row",
        justifyContent:"space-between",
        marginVertical:20
        

    },
    labelContainer:{
        width:"100%",
        flexDirection:"row", 
        justifyContent:"center",
    },
    safeContainer:{
        flexDirection:"row", 
        alignItems:"center",
        paddingHorizontal: 20,

    },
    suspiciousContainer:{
        flexDirection:"row", 
        alignItems:"center",
        paddingHorizontal: 20,

    },
    messageContainer:{
        flexDirection:"row", 
        alignItems:"center",
        paddingHorizontal: 20,

    },
    allBttn:{
        justifyContent:"center",
        alignItems:"center",
        width:"32%",
        
        
        paddingVertical:15,
        borderRadius:5,
        // backgroundColor:"#2FA0D8",
   
        // borderWidth:1

    },allBttn_label:{
        color:"white"
    },
    safeBttn:{
        justifyContent:"center",
        alignItems:"center",
        width:"32%",
        paddingVertical:15,
        borderRadius:5,
        // backgroundColor:"#25C196"
        // borderWidth:1
    },safeBttn_label:{
        // color:"white"
    },
    susBttn:{
        justifyContent:"center",
        alignItems:"center",
        width:"32%",
        
        paddingVertical:15,
        borderRadius:5,
        // borderWidth:1,
        // backgroundColor:"#FF5757"
    },
    susBttn_label:{
        // color:"white"
    },
    listHistory:{
        width:"100%",
        flexDirection:"row",
        alignItems:"center",
        // borderWidth:1,
        paddingVertical:14,
        justifyContent:"space-between",
        marginTop:10,
        backgroundColor:"#E4FFF2",
        borderStartWidth:5,
        borderStartColor:"#25C196",
        borderRadius:5

    },
    leftHistory:{
        flexDirection:"row",
        alignItems:"center",
        paddingHorizontal:10,
        backgroundColor:"none",
        width:"70%",
        // borderWidth:1
     


    },details:{
        backgroundColor:"none",
        // borderWidth:1,
        marginLeft:10,
        // width:"80%"
    },

    rightHistory:{
     
        backgroundColor:"none",
       
        width:"30%",
        
       
    },

    introText:{
        fontFamily:"Poppins-SemiBold",
        color:"#4d4d4d"
    },
    linkText:{
        fontFamily:"Poppins-Regular",
        color:"#4d4d4d"
    },
    historyTime:{
        fontFamily:"Poppins-Regular",
        color:"#4d4d4d"

    },
    historyDate:{
     
        textAlign:"center",
        fontSize:12,
        fontFamily:"Poppins-Regular",
        color:"#4d4d4d",
        

    },
    listHistory2:{
        width:"90%",
        flexDirection:"row",
        alignItems:"center",
        // borderWidth:1,
        paddingVertical:14,
        justifyContent:"space-between",
        marginTop:10,
        backgroundColor:"#FFE3E3",
        borderStartWidth:5,
        borderStartColor:"#C20000"
    
    },
    historyList:{
        width:"90%",
        alignItems:"center",
        margin:20
    },
    activeButtonText:{

        color: 'white',
    }


    




});

export {historyStyle};