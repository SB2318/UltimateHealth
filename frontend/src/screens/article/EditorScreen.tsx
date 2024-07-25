import React, {useRef, useState} from 'react';
import {StyleSheet, Text, ScrollView, View, Pressable} from 'react-native';
import {
  actions,
  defaultActions,
  RichEditor,
  RichToolbar,
} from 'react-native-pell-rich-editor';

import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {PRIMARY_COLOR} from '../../helper/Theme';
import {TouchableOpacity} from 'react-native-gesture-handler';

const EditorScreen = ({navigation}) => {
  const strikethrough = require('../../assets/stricketThrough.png'); //icon for strikethrough
  const video = require('../../assets/play-button.png'); //icon for Addvideo
  const RichText = useRef(); //reference to the RichEditor component
  const [article, setArticle] = useState('');

  // this function will be called when the editor has been initialized
  function editorInitializedCallback() {
    RichText.current?.registerToolbar(function (items) {
      // items contain all the actions that are currently active
      console.log(
        'Toolbar click, selected items (insert end callback):',
        items,
      );
    });
  }

  // Callback after height change
  function handleHeightChange(height) {
    // console.log("editor height change:", height);
  }

  function onPressAddImage() {
  
    RichText.current?.insertImage(
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/100px-React-icon.svg.png',
    );
  }

  function insertVideo() {
   
    RichText.current?.insertVideo(
      'https://mdn.github.io/learning-area/html/multimedia-and-embedding/video-and-audio-content/rabbit320.mp4',
    );
  }

  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.text}>Write your post</Text>

        <TouchableOpacity
          onPress={() => {
            if (article.length > 20) {
              navigation.navigate('PreviewScreen', {
                article: article,
              });
            }
          }}>
          <Text style={styles.preview}>Preview</Text>
        </TouchableOpacity>
      </View>

      <RichToolbar
        style={[styles.richBar]}
        editor={RichText}
        disabled={false}
        iconTint={'white'}
        selectedIconTint={'black'}
        disabledIconTint={'purple'}
        onPressAddImage={onPressAddImage}
        iconSize={30}
        actions={[
          'insertVideo',
          'insertImage',
          ...defaultActions,
          actions.setStrikethrough,
          actions.alignLeft,
          actions.alignCenter,
          actions.alignRight,
          actions.undo,
          actions.redo,
          actions.heading1,
          actions.heading2,
          actions.heading3,
          actions.heading4,
          actions.heading5,
          actions.heading6,
          actions.blockquote,
        ]}
        // map icons for self made actions
        iconMap={{
          [actions.alignLeft]: ({tintColor}) => (
            <Feather name="align-left" color={tintColor} size={35} />
          ),

          [actions.blockquote]: ({tintColor}) => (
            <Entypo name="quote" color={tintColor} size={35} />
          ),

          [actions.undo]: ({tintColor}) => (
            <IonIcon name="arrow-undo" color={tintColor} size={35} />
          ),

          [actions.redo]: ({tintColor}) => (
            <IonIcon name="arrow-redo" color={tintColor} size={35} />
          ),

          [actions.alignCenter]: ({tintColor}) => (
            <Feather name="align-center" color={tintColor} size={35} />
          ),

          [actions.alignRight]: ({tintColor}) => (
            <Feather name="align-right" color={tintColor} size={35} />
          ),

          [actions.heading1]: ({tintColor}) => (
            <Text style={[styles.tib, {color: tintColor}]}>H1</Text>
          ),

          [actions.heading2]: ({tintColor}) => (
            <Text style={[styles.tib, {color: tintColor}]}>H2</Text>
          ),

          [actions.heading3]: ({tintColor}) => (
            <Text style={[styles.tib, {color: tintColor}]}>H3</Text>
          ),
          [actions.heading4]: ({tintColor}) => (
            <Text style={[styles.tib, {color: tintColor}]}>H4</Text>
          ),
          [actions.heading5]: ({tintColor}) => (
            <Text style={[styles.tib, {color: tintColor}]}>H5</Text>
          ),

          [actions.heading6]: ({tintColor}) => (
            <Text style={[styles.tib, {color: tintColor}]}>H6</Text>
          ),

          [actions.setStrikethrough]: strikethrough,
          ['insertVideo']: video,
          ['insertImage']: ({tintColor}) => (
            <Entypo name="image" color={tintColor} size={26} />
          ),
        }}
        insertVideo={insertVideo}
        insertImage={onPressAddImage}
      />
      <RichEditor
        disabled={false}
        containerStyle={styles.editor}
        ref={RichText}
        style={styles.rich}
        placeholder={'Start Writing Here'}
        onChange={text => setArticle(text)}
        editorInitializedCallback={editorInitializedCallback}
        onHeightChange={handleHeightChange}
      />

      {/**
     *
     *  <Text style={styles.text}>Result</Text>

      <HTMLView value={article} stylesheet={styles} />
     */}
    </ScrollView>
  );
};

export default EditorScreen;

const styles = StyleSheet.create({
  /********************************/
  /* styles for html tags */
  a: {
    fontWeight: 'bold',
    color: 'purple',
  },
  div: {
    fontFamily: 'monospace',
  },
  p: {
    fontSize: 30,
  },
  /*******************************/
  container: {
    flex: 1,

    backgroundColor: '#FFFFFF',
  },
  editor: {
    backgroundColor: 'black',
    borderColor: 'black',
    borderWidth: 1,
  },
  rich: {
    minHeight: 300,
    flex: 1,
  },
  richBar: {
    height: 55,
    backgroundColor: PRIMARY_COLOR,
    marginTop: 14,
    marginBottom: 34,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
  },

  preview: {
    fontWeight: '500',
    fontSize: 18,
  },
  tib: {
    textAlign: 'center',
    color: '#515156',
  },

  box: {
    flex: 0,
    width: '94%',
    marginBottom: 20,
    marginTop: 10,
    marginStart: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
