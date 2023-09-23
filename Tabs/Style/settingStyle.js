import { StyleSheet } from "react-native";


const settingStyle = StyleSheet.create({

    mainContainer:{
        flex:1, 
        backgroundColor:"#ffffff",
        alignItems:"center"
        // alignItems:"center"
    },

    userInfo:{
        flexDirection:"row",
        width:"95%",
        borderWidth:1,
        paddingVertical:20,
        paddingHorizontal:15,
        marginTop:20,
        borderRadius:10,
        borderColor:"#919191"

        // backgroundColor:"#f5feff"
    },

    imgContainer:{
        justifyContent:"center",
        alignItems:"center"
    },
    userImg:{
        backgroundColor:"#fff1c7",
        justifyContent:"center",
        height:40,
        width:40,
        borderRadius:50,
        marginRight:15
    },
    userInfoText:{
        justifyContent:"center",
       
        // borderWidth:1
    },

    userName:{
        fontSize:15,
        fontFamily:"Poppins-SemiBold",
        color:"#4d4d4d"
    },

    userEmail:{
        fontFamily:"Poppins-Regular",
        color:"#4d4d4d"
    },

    logout:{
        flexDirection:"row",
        // borderWidth:1,
        width:"95%",
        paddingHorizontal:30,
        paddingVertical:20,
        backgroundColor:"#f2f2f2",
        marginTop:10,
        borderRadius:10
      
    },
    logoutText:{
        fontFamily:"Roboto-Regular",
        fontSize:15,
        marginLeft:10,
        color:"#4d4d4d"
    }


})

export {settingStyle}