import React from 'react';
import {View, Modal } from 'react-native'

export default function EmailInputModal({visible, callback, backButtonClick}){


    /** Back Button Click */

    const backClick = {backButtonClick}
    
    /** Submit Button action click */
    const verifyEmail =()=>{

        /** Here you have to handle whether email valid or not*/

        /**
         * if(valid email){
         *  callback()
         * else{
         * 1. Change the border color of the input field to red
         * 2. Set the above text view with proper error message as per design
         * }
         */
    }
    return(
        <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
      >
      { /** Put your design as well as logic */}

    </Modal>
    )


}