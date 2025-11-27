import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Contacts from 'react-native-contacts';
import { PERMISSIONS } from 'react-native-permissions';
import { MainContainer, Text } from '../../../../components';
import { navigationServices, usePermission } from '../../../../utils';
import { ModalHeader } from '../../../settings';

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

export const ContactPicker: React.FC<ContactPickerProps> = ({ route }: any) => {
  const [contacts, setContacts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { onSelect } = route?.params || {};

  const contactPermission =
    Platform.OS === 'android'
      ? PERMISSIONS.ANDROID.READ_CONTACTS
      : PERMISSIONS.IOS.CONTACTS;

  const { checkPermission, requestPermission } =
    usePermission(contactPermission);

  useEffect(() => {
    loadContacts();
  }, []);

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
              navigationServices.goBack();
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
    <MainContainer>
      <ModalHeader
        title="Contacts"
        onIconPress={() => {
          navigationServices.goBack();
        }}
      />
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
    </MainContainer>
  );
};

const styles = StyleSheet.create({
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
