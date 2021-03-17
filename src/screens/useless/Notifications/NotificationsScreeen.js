import React from 'react';
import { Text, View, TouchableHighlight, Image, ScrollView, FlatList } from 'react-native';
import MenuImage from '../../components/MenuImage/MenuImage';
import styles from './styles';
import { connect } from 'react-redux';

class NotificationsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerStyle: {
      backgroundColor: '#F4F6FA',
      elevation: 0,
      shadowColor: 'transparent',
      borderBottomWidth: 0
    },
    headerLeft: (
      <MenuImage
        onPress={() => {
          navigation.openDrawer();
        }}
      />
    )
  });

  constructor(props) {
    super(props);
  }

  countUnreadNotifications = () => {
    var count = 0;
    this.props.notifications.map(data => {
      if (!data.read) {
        count += 1;
      }
    });
    return count;
  };

  renderUnreadMark = read => {
    if (!read) return <View style={styles.unreadMark}></View>;
  };

  renderNotification = ({ item }) => (
    <TouchableHighlight
      style={styles.notificationContainer}
      underlayColor="rgba(73,182,77,1,0.9)"
      onPress={() => this.props.update(item.id)}
    >
      <View>
        <View style={styles.rowContainer}>
          <Image style={styles.authorImg} source={{ uri: item.authorImg }} />
          <View style={{ alignSelf: 'center' }}>
            <Text style={styles.authorName}>
              {item.authorName}
              <Text style={styles.notificationText}> {item.text}</Text>
            </Text>
          </View>
        </View>
        <Text style={styles.notificationTime}>{item.time}</Text>
        {this.renderUnreadMark(item.read)}
      </View>
    </TouchableHighlight>
  );

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Notifications</Text>
          <Text style={styles.secText}>{this.countUnreadNotifications()} unread notifications</Text>
        </View>

        <View style={styles.notificationsContainer}>
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            data={this.props.notifications}
            renderItem={this.renderNotification}
            extraData={this.state}
            keyExtractor={item => `${item.id}`}
          />
        </View>
      </ScrollView>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    update: id => dispatch({ type: 'UPDATE_NOTIFICATIONS', id })
  };
}

function mapStateToProps(state) {
  return {
    notifications: state.notification.notifications
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotificationsScreen);
