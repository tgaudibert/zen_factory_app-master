import React from 'react';
import { Text, View, TouchableHighlight, Image, ScrollView, FlatList, Alert } from 'react-native';
import styles from './styles';
import ModalMealScreen from '../ModalMeal/ModalMealScreen';
import { ProgressChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width < height ? width : height;
import { connect } from 'react-redux';
import Modal from 'react-native-modal';

class NutritionScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerStyle: {
        backgroundColor: '#F4F6FA',
        elevation: 0,
        shadowColor: 'transparent',
        borderBottomWidth: 0
      },
      headerRight: (
        <TouchableHighlight
          underlayColor="rgba(73,182,77,1,0.9)"
          onPress={() => params.onPressModal()}
        >
          <Image style={styles.addIcon} source={require('../../../assets/icons/addIcon.png')} />
        </TouchableHighlight>
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = { visibleModalId: null, deleteModal: false, deleteMealId: -1 };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      onPressModal: this.onPressModal
    });
  }

  toggleModal = () => {
    this.setState({
      visibleModal: null
    });
  };

  onPressModal = () => {
    this.setState({
      visibleModal: 'swipeable'
    });
  };

  onPressDeleteIcon = mealId => {
    this.setState(prevState => ({ deleteModal: !prevState.deleteModal, deleteMealId: mealId }));
  };

  onPressDeleteMeal = () => {
    this.props.removeMeal(this.state.deleteMealId);
    this.setState(prevState => ({ deleteMealId: -1 }));

    //for initial delete screen
    //this.setState(prevState => ({ deleteModal: !prevState.deleteModal,deleteMealId: -1 }));
  };

  onPressCancel = () => {
    this.setState(prevState => ({
      deleteMealId: -1
    }));

    //for initial delete screen
    //this.setState(prevState => ({ deleteModal: !prevState.deleteModal,deleteMealId: -1 }));
  };

  showDeleteScreen = id => {
    this.onPressDeleteIcon(id);
    Alert.alert(
      'Are you sure you want to delete this meal?',
      '',
      [
        { text: 'Yes', onPress: () => this.onPressDeleteMeal() },
        {
          text: 'Cancel',
          onPress: () => this.onPressCancel(),
          style: 'cancel'
        }
      ],
      { cancelable: false }
    );
  };

  renderFood = ({ item, index }) => (
    <View style={index == 0 ? styles.foodContainerBoarderless : styles.foodContainer}>
      <View style={styles.rowContainer}>
        <View>
          <Text style={styles.foodName}>{item.name}</Text>
          <Text style={styles.foodQuantity}>{item.quantity}</Text>
        </View>
        <Text style={styles.foodCalories}>{item.calories}</Text>
      </View>
    </View>
  );

  renderMeal = ({ item, index }) => (
    <View style={styles.mealContainer}>
      <Text style={styles.mealName}>{item.meal}</Text>
      <FlatList
        vertical
        showsVerticalScrollIndicator={false}
        data={item.foods}
        renderItem={this.renderFood}
        extraData={this.state}
        //keyExtractor={item => `${item.id}`}
        listKey={index => `${index}`}
      />
      <TouchableHighlight
        style={styles.deleteIconContainer}
        underlayColor="rgba(73,182,77,1,0.9)"
        //onPress={() => this.onPressDeleteIcon(item.id)}
        onPress={() => this.showDeleteScreen(item.id)}
      >
        <Image style={styles.deleteIcon} source={require('../../../assets/icons/deleteIcon.png')} />
      </TouchableHighlight>
    </View>
  );

  getCaloriesDone() {
    var calories = 0;
    this.props.nutrition.map(data => {
      data.foods.map(food => {
        calories += food.calories;
      });
    });
    return calories;
  }

  render() {
    const macroNutrients = this.props.navigation.getParam('macroNutrients');
    const caloriesDone = this.getCaloriesDone();
    const data = {
      labels: ['Protien', 'Carb', 'Fat'], // optional
      data: [
        macroNutrients.proteinDone / macroNutrients.proteinGoal,
        macroNutrients.carbDone / macroNutrients.carbGoal,
        macroNutrients.fatDone / macroNutrients.fatGoal
      ],
      strokeWidth: 2
    };
    return (
      <ScrollView style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            You burned <Text style={styles.caloriesText}>{caloriesDone}</Text> calories
            today
          </Text>
        </View>
        <View style={{ alignSelf: 'center' }}>
          <ProgressChart
            data={data}
            width={SCREEN_WIDTH}
            height={200}
            chartConfig={{
              backgroundGradientFrom: '#F4F6FA',
              backgroundGradientTo: '#F4F6FA',
              color: (opacity = 1) => `rgba(114, 101, 290, ${opacity})`
            }}
          />
        </View>
        <View>
          <View style={styles.macroRowContainer}>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.orangeBox} />
              <Text style={styles.macroNutrientName}>Protein</Text>
            </View>
            <Text style={styles.macroNutrientGrams}>{macroNutrients.proteinDone}g</Text>
            <Text style={styles.macroNutrientProcent}>
              {((macroNutrients.proteinDone / macroNutrients.proteinGoal) * 100).toPrecision(2)}%
            </Text>
          </View>
          <View style={styles.macroRowContainer}>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.purpleBox} />
              <Text style={styles.macroNutrientName}>Carb</Text>
            </View>
            <Text style={styles.macroNutrientGrams}>{macroNutrients.carbDone}g</Text>
            <Text style={styles.macroNutrientProcent}>
              {((macroNutrients.carbDone / macroNutrients.carbGoal) * 100).toPrecision(2)}%
            </Text>
          </View>
          <View style={styles.macroRowContainerBorderless}>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.greenBox} />
              <Text style={styles.macroNutrientName}>Fat</Text>
            </View>
            <Text style={styles.macroNutrientGrams}>{macroNutrients.fatDone}g</Text>
            <Text style={styles.macroNutrientProcent}>
              {((macroNutrients.fatDone / macroNutrients.fatGoal) * 100).toPrecision(2)}%
            </Text>
          </View>
        </View>
        <View>
          <FlatList
            vertical
            showsVerticalScrollIndicator={false}
            data={this.props.nutrition}
            renderItem={this.renderMeal}
            extraData={this.state}
            //keyExtractor={item => `${item.id}`}
            listKey={-1}
          />
        </View>
        <Modal
          isVisible={this.state.visibleModal === 'swipeable'}
          onSwipeComplete={() => this.setState({ visibleModal: null })}
          swipeDirection={['down']}
        >
          <ModalMealScreen toggleModal={this.toggleModal} />
        </Modal>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    nutritionDone: state.nutrition.nutritionDone,
    nutritionGoal: state.nutrition.nutritionGoal,
    nutrition: state.nutrition.nutrition
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeMeal: mealId => dispatch({ type: 'REMOVE_MEAL', mealId })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NutritionScreen);

//initial alert screen for delete meal - line 221
/*
 <Modal isVisible={this.state.deleteModal}>
          <View style={styles.deleteContainer}>
            <Text style={styles.deleteTxt}>Are you sure you want to delete this meal?</Text>
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
              <TouchableHighlight
                underlayColor="rgba(73,182,77,1,0.9)"
                onPress={() => this.onPressDeleteMeal()}
              >
                <Text style={styles.deleteSecTxt}>Yes</Text>
              </TouchableHighlight>
              <Text> / </Text>
              <TouchableHighlight
                underlayColor="rgba(73,182,77,1,0.9)"
                onPress={() => this.onPressCancel()}
              >
                <Text style={styles.deleteSecTxt}>Cancel</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        */
