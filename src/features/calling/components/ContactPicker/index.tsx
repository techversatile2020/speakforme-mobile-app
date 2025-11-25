import React, { useState, useEffect } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Platform,
} from 'react-native';
import Contacts from 'react-native-contacts';
import { PERMISSIONS } from 'react-native-permissions';
import { SD, usePermission } from '../../../../utils';
import { PrimaryButton, Text } from '../../../../components';

interface ContactPickerProps {
  visible: boolean;
  onClose: () => void;
  onSelect: ({
    name,
    phoneNumber,
  }: {
    name: string;
    phoneNumber: string;
  }) => void;
}

export const ContactPicker: React.FC<ContactPickerProps> = ({
  visible,
  onClose,
  onSelect,
}) => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const contactPermission =
    Platform.OS === 'android'
      ? PERMISSIONS.ANDROID.READ_CONTACTS
      : PERMISSIONS.IOS.CONTACTS;

  const { checkPermission, requestPermission } =
    usePermission(contactPermission);

  useEffect(() => {
    if (visible) {
      loadContacts();
    }
  }, [visible]);

  const loadContacts = async () => {
    setLoading(true);

    let permissionStatus = await checkPermission();
    if (permissionStatus !== 'granted') {
      permissionStatus = await requestPermission();
    }

    if (permissionStatus === 'granted') {
      try {
        const allContacts = await Contacts.getAll();
        setContacts(allContacts);
      } catch (err) {
        console.error('Error fetching contacts:', err);
      }
    } else {
      console.warn('Contacts permission denied');
      setContacts([]);
    }

    setLoading(false);
  };

  const renderItem = ({ item }: { item: any }) => {
    const name = item.displayName || `${item.givenName} ${item.familyName}`;

    return (
      <View style={styles.contactItem}>
        <Text regular size={14}>
          {name}
        </Text>
        {item?.phoneNumbers?.map((phone: any, index: number) => (
          <TouchableOpacity
            key={index}
            style={styles.phoneItem}
            onPress={() => {
              onSelect({ name, phoneNumber: phone.number });
              onClose();
            }}
          >
            <Text>
              {phone.label}: {phone.number}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text bold size={26} bottomSpacing={10}>
          Contacts
        </Text>
        {loading ? (
          <Text>Loading Contacts...</Text>
        ) : contacts.length === 0 ? (
          <Text>No contacts found or permission denied</Text>
        ) : (
          <FlatList
            data={contacts}
            keyExtractor={item => item.recordID}
            renderItem={renderItem}
          />
        )}
        <PrimaryButton title={'Close'} onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: SD.hp(40) },
  contactItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  phoneItem: {
    paddingVertical: 5,
    paddingLeft: 15,
  },
});
