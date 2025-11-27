import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { MainContainer, PrimaryButton, Text } from '../../../../components';
import { ModalHeader } from '../ModalHeader';
import { navigationServices, SD } from '../../../../utils';
import { useTheme } from '../../../../theme';

const plans = [
  {
    id: 'monthly',
    title: 'Monthly Subscription',
    price: '$5.99',
    features: [
      'Multiple voice options',
      'Advanced voice styles',
      'High-quality audio output',
      'Early access to new features',
    ],
    active: false,
  },
  {
    id: 'yearly',
    title: 'Yearly Subscription',
    price: '$50.00',
    features: [
      'Multiple voice options',
      'Advanced voice styles',
      'High-quality audio output',
      'Early access to new features',
    ],
    active: true,
  },
];

export const SubscriptionModal = () => {
  type Plan = {
    id: string;
    title: string;
    price: string;
    features: string[];
    active: boolean;
  };

  const { AppTheme } = useTheme();

  const renderItem = ({ item }: { item: Plan }) => (
    <View
      style={[
        styles.card,
        { borderColor: item.active ? AppTheme.primary : '#E0E0E0' },
      ]}
    >
      <View style={styles.headerRow}>
        <Text semiBold size={20}>
          {item.title}
        </Text>
        <Text bold size={22}>
          {item.price}
        </Text>
      </View>

      <View style={styles.featuresBox}>
        {item.features.map((f, index) => (
          <View key={index} style={styles.featureRow}>
            <Text color={AppTheme.textSecondary} semiBold size={13}>
              ✔️
            </Text>
            <Text regular size={13}>
              {' '}
              {f}
            </Text>
          </View>
        ))}
      </View>

      <PrimaryButton
        textColor={item.active ? '#000' : AppTheme.background}
        title={item.active ? 'Active' : 'Buy Subscription'}
        customStyles={{
          backgroundColor: item?.active ? '#E0E0E0' : AppTheme?.primary,
        }}
      />
    </View>
  );

  return (
    <MainContainer>
      <ModalHeader
        title="Membership"
        onIconPress={() => {
          navigationServices.goBack();
        }}
      />

      <View style={styles.container}>
        <FlatList
          data={plans}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: SD.hp(30),
  },
  card: {
    borderWidth: 1,
    padding: 20,
    borderRadius: 18,
    // marginBottom: 16,
    marginVertical: SD.hp(10),
    backgroundColor: 'white',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  price: {
    fontSize: 20,
    fontWeight: '700',
  },
  featuresBox: {
    marginTop: 15,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkMark: {
    fontSize: 18,
    marginRight: 6,
  },
  featureText: {
    fontSize: 16,
  },

  buttonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});
