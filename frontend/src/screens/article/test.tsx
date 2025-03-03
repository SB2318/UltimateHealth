




const styles = StyleSheet.create({
    container: {
      flex: 1,
      position: 'relative',
      backgroundColor: '#ffffff',
    },
    scrollView: {
      flex: 0,
      backgroundColor: '#ffffff',
      position: 'relative',
    },
    scrollViewContent: {
      marginBottom: 10,
      flexGrow: 0,
    },
    imageContainer: {
      position: 'relative',
    },
    image: {
      height: 300,
      width: '100%',
      objectFit: 'cover',
    },
    likeButton: {
      padding: 10,
      position: 'absolute',
      bottom: -25,
      right: 20,
      borderRadius: 50,
    },
    contentContainer: {
      marginTop: 25,
      paddingHorizontal: 16,
    },
    categoryText: {
      fontWeight: '400',
      fontSize: 12,
      color: '#6C6C6D',
      textTransform: 'uppercase',
    },
    viewText: {
      fontWeight: '500',
      fontSize: 14,
      color: '#6C6C6D',
    },
    titleText: {
      fontSize: 25,
      fontWeight: 'bold',
      marginTop: 5,
    },
    avatarsContainer: {
      position: 'relative',
      flex: 1,
      height: 70,
      marginTop: 10,
    },
  
    profileImage: {
      height: 70,
      width: 70,
      borderRadius: 100,
      objectFit: 'cover',
      resizeMode: 'contain',
    },
    avatar: {
      height: 70,
      width: 70,
      borderRadius: 100,
      position: 'absolute',
      borderWidth: 1,
      borderColor: 'white',
      backgroundColor: '#D9D9D9',
    },
    avatarOverlap: {
      left: 15,
    },
    avatarDoubleOverlap: {
      left: 30,
    },
    avatarTripleOverlap: {
      left: 45,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: PRIMARY_COLOR,
    },
    moreText: {
      fontSize: hp(4),
      fontWeight: '700',
      color: 'white',
    },
    descriptionContainer: {
      flex: 1,
      marginTop: 10,
    },
  
    webView: {
      flex: 1,
      width: '100%',
      margin: 0,
      padding: 0,
    },
    descriptionText: {
      fontWeight: '400',
      color: '#6C6C6D',
      fontSize: 15,
      textAlign: 'justify',
    },
    footer: {
      backgroundColor: '#EDE9E9',
      position: 'relative',
      bottom: 0,
      zIndex: 10,
      borderTopEndRadius: 30,
      borderTopStartRadius: 30,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: 20,
      paddingHorizontal: 20,
    },
    authorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
    },
    authorImage: {
      height: 50,
      width: 50,
      borderRadius: 50,
    },
    authorName: {
      fontWeight: '700',
      fontSize: 15,
    },
    authorFollowers: {
      fontWeight: '400',
      fontSize: 13,
    },
    followButton: {
      backgroundColor: PRIMARY_COLOR,
      paddingHorizontal: 15,
      borderRadius: 20,
      paddingVertical: 10,
    },
    followButtonText: {
      color: 'white',
      fontSize: 14,
      fontWeight: '600',
    },
  
    header: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#333',
      textAlign: 'center',
      marginBottom: 30,
    },
    commentsList: {
      flex: 1,
      marginBottom: 20,
    },
    commentContainer: {
      flexDirection: 'row',
      marginBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#ddd',
      paddingBottom: 10,
    },
    avatar: {
      fontSize: 30,
      marginRight: 10,
      alignSelf: 'center',
    },
    username: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
      marginEnd: 4, // Small gap between user handle and content
    },
    profileImage: {
      height: 60,
      width: 60,
      borderRadius: 30,
      objectFit: 'cover',
      resizeMode: 'contain',
      marginHorizontal: 4,
    },
  
    profileImage2: {
      height: 30,
      width: 30,
      borderRadius: 15,
      objectFit: 'cover',
      resizeMode: 'contain',
      marginHorizontal: 4,
    },
    commentContent: {
      flex: 1,
    },
    username2: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#333',
      alignSelf: 'center',
    },
    comment: {
      fontSize: 14,
      color: '#555',
      marginVertical: 5,
    },
    timestamp: {
      fontSize: 12,
      color: '#888',
    },
    replyContainer: {
      marginLeft: 20,
      marginTop: 10,
    },
    replyText: {
      fontSize: 14,
      color: '#555',
      fontStyle: 'italic',
    },
    textInput: {
      height: 100,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 8,
      padding: 10,
      textAlignVertical: 'top',
      backgroundColor: '#fff',
      marginTop: 10,
    },
    submitButton: {
      backgroundColor: PRIMARY_COLOR,
      padding: 15,
      marginTop: 20,
      borderRadius: 8,
      alignItems: 'center',
    },
    submitButtonText: {
      fontSize: 18,
      color: '#fff',
      fontWeight: 'bold',
    },
  });