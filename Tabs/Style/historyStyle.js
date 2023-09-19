import { StyleSheet } from "react-native";


const historyStyle = StyleSheet.create({

    mainContainer:{
        flex:1,
        backgroundColor:"white",
        alignItems:"center"
    },
    bttnCont:{
        width:"90%",
        flexDirection:"row",
        justifyContent:"space-between",
        marginVertical:20
        

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
        borderStartColor:"#25C196"

    },
    leftHistory:{
        flexDirection:"row",
        alignItems:"center",
        paddingHorizontal:10,
        backgroundColor:"none",
        width:"75%"
     


    },details:{
        backgroundColor:"none",
        // borderWidth:1,
        marginLeft:10,
        // width:"80%"
    },

    rightHistory:{
        marginRight:20,
        backgroundColor:"none",
        alignItems:"flex-end"
    },
    historyTime:{


    },
    historyDate:{


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
    },
    activeButtonText:{

        color: 'white',
    }


    




});

export {historyStyle};