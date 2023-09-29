import { StyleSheet } from "react-native";




const messageStyle = StyleSheet.create({

    mainContainer:{
        flex:1,
        backgroundColor:"#ffffff",
        alignItems:"center",

    },

    messageContainer:{
        width:"85%"
    },

    header:{
        flexDirection:"row",
        alignItems:"center",
        // borderWidth:1,
        paddingVertical:20,
        paddingHorizontal:20,
        // marginTop:20,
        backgroundColor:"#00a398",
        borderRadius:5,
        
    },

    content:{
        width:"100%",
        borderRadius:10,
        backgroundColor:"#f2f2f2",
        // borderWidth:1,
     
        paddingVertical:10,
        height:300,
        marginTop:10,
        marginBottom:20,
      
       
    },

    contentText:{
        fontFamily:"Poppins-Regular",
        // height:250,
        marginHorizontal:20,
        flex:1,
      
    },
    qrContainer:{
        borderWidth:1,
        borderColor:"#b3b3b3",
        alignItems:"center",
        justifyContent:"center",
        padding:30,
        borderRadius:10,

    }








});

export {messageStyle}