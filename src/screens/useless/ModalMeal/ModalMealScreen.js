import React from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  Image,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback
} from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';

class ModalMealScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerTransparent: 'true',
    headerStyle: {
      height: 60
    }
  });

  constructor(props) {
    super(props);
    this.state = {
      meal: [
        { id: 0, name: 'Snack', check: false },
        { id: 1, name: 'Lunch', check: false },
        { id: 2, name: 'Dinner', check: false },
        { id: 3, name: 'Breakfast', check: false }
      ],
      foods: [
        {
          id: 0,
          name: 'Chicken',
          calories: 150,
          quantity: '200 grams',
          check: false
        },
        {
          id: 1,
          name: 'Pasta',
          calories: 150,
          quantity: '200 grams',
          check: false
        },
        {
          id: 2,
          name: 'Cereal',
          calories: 300,
          quantity: '100 grams',
          check: false
        },
        {
          id: 3,
          name: 'Milk',
          calories: 100,
          quantity: '200 grams',
          check: false
        },
        {
          id: 4,
          name: 'Eggs',
          calories: 300,
          quantity: '200 grams',
          check: false
        },
        {
          id: 5,
          name: 'Bannana',
          calories: 150,
          quantity: '200 grams',
          check: false
        },
        {
          id: 6,
          name: 'Apple',
          calories: 100,
          quantity: '100 grams',
          check: false
        }
      ]
    };
  }

  checkValidation = () => {
    let mealArr = this.state.meal;
    let foodArr = this.state.foods;
    var mealValid,
      foodValid = 0;
    mealArr.map(data => {
      if (data.check) {
        mealValid = 1;
      }
    });
    foodArr.map(data => {
      if (data.check) {
        foodValid = 1;
      }
    });
    if (mealValid && foodValid) {
      return 1;
    } else {
      return 0;
    }
  };

  onPressAdd = () => {
    let mealType = '';
    this.state.meal.map(data => {
      if (data.check) {
        mealType = data.name;
      }
    });
    let foodsArr = [];
    this.state.foods.map(data => {
      if (data.check) {
        foodsArr.push(data);
      }
    });
    var id = 0;
    if (this.props.nutrition.length > 0) {
      id = this.props.nutrition[this.props.nutrition.length - 1].id + 1;
    }
    let meal = {
      id: id,
      meal: mealType,
      foods: foodsArr
    };

    this.props.toggleModal();
    this.props.addMeal(meal);
  };

  onPressMeal = id => {
    let arr = this.state.meal;
    arr.map(data => {
      if (!data.check && data.id == id) {
        data.check = true;
      } else {
        data.check = false;
      }
    });
    this.setState({
      meal: arr
    });
  };

  onPressFood = id => {
    let arr = this.state.foods;
    arr.map(data => {
      if (!data.check && data.id == id) {
        data.check = true;
      } else if (data.check && data.id == id) {
        data.check = false;
      }
    });
    this.setState({
      food: arr
    });
  };

  renderMeal = ({ item }) => (
    <TouchableHighlight
      underlayColor="rgba(73,182,77,1,0.9)"
      onPress={() => this.onPressMeal(item.id)}
    >
      <View style={styles.mealContainer}>
        <Image
          style={styles.circle}
          source={
            item.check
              ? require('../../../assets/icons/fullCircle.png')
              : require('../../../assets/icons/emptyCircle.png')
          }
        />
        <Text style={styles.mealTitle}>{item.name}</Text>
      </View>
    </TouchableHighlight>
  );

  renderFood = ({ item }) => (
    <TouchableHighlight
      underlayColor="rgba(73,182,77,1,0.9)"
      onPress={() => this.onPressFood(item.id)}
    >
      <View style={styles.foodRowContainer}>
        <Text style={styles.foodTitle}>{item.name}</Text>
        <Image
          style={styles.circle}
          source={
            item.check
              ? require('../../../assets/icons/fullCircle.png')
              : require('../../../assets/icons/emptyCircle.png')
          }
        />
      </View>
    </TouchableHighlight>
  );

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.bar}></View>
        <View style={styles.titleContainer}>
          <Image style={styles.mealIcon} source={require('../../../assets/icons/mealIcon.png')} />
          <Text style={styles.mainTxt}>Choose food</Text>
          <Text style={styles.secTxt}>Select your meal and your foods that you consume today</Text>
        </View>

        <TouchableWithoutFeedback>
          <View>
            <FlatList
              vertical
              showsVerticalScrollIndicator={false}
              numColumns={4}
              data={this.state.meal}
              renderItem={this.renderMeal}
              extraData={this.state}
              keyExtractor={item => `${item.id}`}
              listKey={0}
            />
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback>
          <View>
            <FlatList
              vertical
              showsVerticalScrollIndicator={false}
              numColumns={1}
              data={this.state.foods}
              renderItem={this.renderFood}
              extraData={this.state}
              keyExtractor={item => `${item.id}`}
              listKey={1}
            />
          </View>
        </TouchableWithoutFeedback>

        <TouchableHighlight
          underlayColor="rgba(73,182,77,1,0.9)"
          style={this.checkValidation() ? styles.btnContainer : styles.btnContainerDisabled}
          onPress={() =>
            this.checkValidation() ? this.onPressAdd() : console.log('button not working')
          }
        >
          <Text style={styles.btnTxt}>Add</Text>
        </TouchableHighlight>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    nutrition: state.nutrition.nutrition
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addMeal: meal => dispatch({ type: 'ADD_MEAL', meal })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModalMealScreen);
