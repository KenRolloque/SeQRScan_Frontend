import { StyleSheet } from "react-native";


const GalleryModalStyle = StyleSheet.create({

    centeredView:{
        backgroundColor:"#ffffff",
        flex: 1,
        alignItems: 'center',
    },

    backIconCont:{
        width:"100%",
        backgroundColor: 'none',
        paddingVertical:10,
        paddingHorizontal:20
    },

    modalView:{
        backgroundColor: '#ffffff',
        alignItems:"center",
        width:"80%",
        height:"75%",
    },

    qrCodeModal:{
        backgroundColor:"#ffffff",
        padding:20,
        marginBottom:10,
        alignItems:"center"
    },
    descContainer:{
        width:"90%",
        alignItems:"center",
        // marginTop:10,
        marginBottom:10,
        flexDirection:"row",
        backgroundColor:"#f0f8ff",
        padding:10,
        borderRadius:10
    },
    linkIconContainer:{
        paddingHorizontal:10,
        backgroundColor:"none"

    },
    linkLabelContainer:{
        backgroundColor:"none",
        width:"80%"
    

    },
    linkLabel:{
        fontSize:16,
        fontWeight:"bold",

        // fontFamily:"Poppins"


    },
    desc:{
        color:"#00BF63",
        // borderWidth:1,
      
        width:"100%"
    },
    link:{
        color:"#00BF63",
        // borderWidth:1,
        // height:210,
        width:"100%",

       
        // fontFamily:"Poppins"
    },
    linkContainer:{
        width:"90%",
        // alignItems:"center",
        marginTop:10,
        marginBottom:10,
        flexDirection:"row",
        backgroundColor:"#f0f8ff",
        padding:10,
        borderRadius:10,
        height:"30%"
    },
    modalButton:{
        width:"100%",
        flexDirection:"row",
        justifyContent:"center",
        backgroundColor:"none",
        marginTop:"10%",
     

        
    },
    modalButtonDL:{

        width:"45%",
        backgroundColor:"#1565C0",
        paddingVertical:15,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:5,
        marginRight:10
        

    },
    modalButtonDel:{
        width:"45%",
        backgroundColor:"#ff3636",
        paddingVertical:15,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:5

    },

    modalButtonDLLabel:{
        color:"white"
    },
    modalButtonDelLabel:{
        color:"white"
    },



    




});

export {GalleryModalStyle};