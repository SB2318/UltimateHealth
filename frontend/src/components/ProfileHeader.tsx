import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
  Alert,
} from 'react-native';
import React from 'react';
import EllipseSvg from '../assets/svg/EllipseSvg';
import {PRIMARY_COLOR} from '../helper/Theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {fp, hp, wp} from '../helper/Metric';
const ProfileHeader = ({isDoctor}) => {
  const phonenumber = '+91 234567890';
  const mail = 'someone@gmail.com';
  const handleCall = phone => {
    let phoneNumber = phone;
    if (Platform.OS !== 'android') {
      phoneNumber = `telprompt:${phone}`;
    } else {
      phoneNumber = `tel:${phone}`;
    }
    Linking.openURL(phoneNumber).catch(err => Alert.alert('Unable to phone!'));
  };
  const handleMail = mail => {
    Linking.openURL(`mailto: ${mail}`).catch(err =>
      Alert.alert('Unable to open mail!'),
    );
  };
  return (
    <View style={styles.container}>
      <EllipseSvg style={styles.ellipseSvg} />
      <View style={styles.contentContainer}>
        <Image
          source={{
            uri: isDoctor
              ? 'https://img.freepik.com/premium-photo/indian-female-doctor-indian-nurse_714173-201.jpg'
              : 'https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/social-media-profile-photos-3.jpg',
          }}
          style={styles.profileImage}
        />
        <Text style={styles.nameText}>
          {isDoctor ? 'Dr. Emily Davis' : 'John Doe'}
        </Text>
        <Text style={[styles.usernameText, {color: PRIMARY_COLOR}]}>
          {isDoctor ? 'dremilydavis' : 'johnDoe'}
        </Text>
        {isDoctor && (
          <View style={styles.experienceContainer}>
            <FontAwesome name="stethoscope" size={hp(3.5)} color="black" />
            <Text style={styles.experienceText}>10 years</Text>
          </View>
        )}
        {isDoctor ? (
          <View style={styles.contactContainer}>
            <TouchableOpacity
              onPress={() => {
                handleCall(phonenumber);
              }}
              style={[styles.iconButton, {backgroundColor: PRIMARY_COLOR}]}>
              <MaterialIcons name="phone-in-talk" size={25} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleMail(mail);
              }}
              style={[styles.iconButton, {backgroundColor: PRIMARY_COLOR}]}>
              <MaterialIcons name="email" size={25} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.iconButton, {backgroundColor: PRIMARY_COLOR}]}>
              <Feather name="edit-3" size={25} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        )}
        <View style={styles.infoContainer}>
          {isDoctor ? (
            <>
              <View style={styles.infoBlock}>
                <Text style={[styles.infoText, {color: PRIMARY_COLOR}]}>
                  Dermatology
                </Text>
                <Text style={styles.infoLabel}>Specialization</Text>
              </View>
              <View style={styles.infoBlock}>
                <Text style={[styles.infoText, {color: PRIMARY_COLOR}]}>
                  MD
                </Text>
                <Text style={styles.infoLabel}>Qualification</Text>
              </View>
            </>
          ) : (
            <>
              <View style={styles.infoBlock}>
                <Text style={[styles.infoText, {color: PRIMARY_COLOR}]}>
                  10
                </Text>
                <Text style={styles.infoLabel}>Articles</Text>
              </View>
              <View style={styles.infoBlock}>
                <Text style={[styles.infoText, {color: PRIMARY_COLOR}]}>
                  120
                </Text>
                <Text style={styles.infoLabel}>Saved</Text>
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  ellipseSvg: {
    position: 'absolute',
    top: -2,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(12),
  },
  profileImage: {
    height: 130,
    width: 130,
    borderRadius: 100,
    objectFit: 'cover',
  },
  nameText: {
    fontSize: fp(6),
    fontWeight: 'bold',
    color: 'black',
  },
  usernameText: {
    fontSize: fp(4),
    fontWeight: 'regular',
    marginTop: 1,
  },
  experienceContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    marginTop: 2,
  },
  experienceText: {
    fontSize: 14,
    fontWeight: 'medium',
    color: 'black',
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginVertical: 10,
  },
  iconButton: {
    height: 50,
    width: 50,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  editProfileButton: {
    borderWidth: 0.5,
    width: wp(70),
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 5,
    marginVertical: 10,
  },
  editProfileButtonText: {
    fontSize: 16,
    fontWeight: 'semibold',
  },
  infoContainer: {
    width: wp(100),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  infoBlock: {
    alignItems: 'center',
  },
  infoText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  infoLabel: {
    fontSize: 18,
    fontWeight: 'regular',
    color: 'black',
  },
});
