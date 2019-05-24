/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {

  constructor(props){
    super(props)
    this.state={
      Username:'',
      email:'',
      userid:'',
      loggedIn:false
    }
  }

  loginsuccess=()=>{
  
  }

  initUser(token) {
    fetch('https://graph.facebook.com/v2.5/me?fields=email,name,friends&access_token=' + token)
    .then((response) => response.json())
    .then((json) => {
      // Some user object has been set up somewhere, build that user here
      this.setState({
      Username:json.name,
      email:json.email,
      userid:json.id,
      loggedIn:true
      })
      user.name = json.name
      user.id = json.id
      user.user_friends = json.friends
      user.email = json.email
      user.username = json.name
      user.loading = false
      user.loggedIn = true
      user.avatar = setAvatar(json.id)      
    })
    .catch(() => {
      reject('ERROR GETTING DATA FROM FACEBOOK')
    })
  }

  componentDidMount(){

    AccessToken.getCurrentAccessToken().then(data=>{
      console.log(data.accessToken.toString())
      console.log(data)
         this.initUser(data.accessToken)
    })
    //this.initUser()
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native Login with facebook sdk!</Text>
        <View>
        <LoginButton
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("login has error: " + result.error);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
               
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data.accessToken.toString())
                    this.initUser(data.accessToken)
                   
                  }
                )
              }
            }
          }
          onLogoutFinished={() => console.log("logout.")}/>

          {
            this.state.loggedIn?<View>
<Text>Username: {this.state.Username}</Text>
<Text>Email: {this.state.email}</Text>
<Text>Userid: {this.state.userid}</Text>



            </View>:null
          }
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
