<template>
  <div id="app" class="app" @click="sessionExpiration($event)" @mousemove="sessionExpiration($event)">
  
    <auth-layout v-if="isAuth"></auth-layout>
    <layout v-else></layout>
  
    <!-- <div v-if="!isAuth && $store.state.userId === 'admin@atom.ba'">
      <beautiful-chat
        :participants="participants"
        :titleImageUrl="titleImageUrl"
        :onMessageWasSent="onMessageWasSent"
        :messageList="messageList"
        :newMessagesCount="newMessagesCount"
        :isOpen="isChatOpen"
        :close="closeChat"
        :open="openChat"
        :showEmoji="false"
        :showFile="true"
        :showTypingIndicator="showTypingIndicator"
        :colors="colors"
        :alwaysScrollToBottom="alwaysScrollToBottom" />
    </div> -->
  
  </div>
</template>

<script>
  import Layout from 'components/layout/Layout'
  import AuthLayout from './components/layout/AuthLayout'
  import VuesticPreLoader from './components/vuestic-components/vuestic-preloader/VuesticPreLoader.vue'
  
  export default {
    name: 'app',
    data() {
      return {
        logout: setTimeout(() => {
          this.$store.dispatch('setLogoutTimer', 0)
        }, this.$store.state.idleTime),
        messageStr: '',
  
        participants: [{
            id: 'user1',
            name: 'Matteo',
            imageUrl: '' // 'https://avatars3.githubusercontent.com/u/1915989?s=230&v=4'
          },
          {
            id: 'user2',
            name: 'Support',
            imageUrl: '' // 'https://avatars3.githubusercontent.com/u/37018832?s=200&v=4'
          }
        ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
        titleImageUrl: '', // 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
        messageList: [{
            type: 'text',
            author: `me`,
            data: {
              text: `Say yes!`
            }
          },
          {
            type: 'text',
            author: `user1`,
            data: {
              text: `No.`
            }
          }
        ], // the list of the messages to show, can be paginated and adjusted dynamically
        newMessagesCount: 2,
        isChatOpen: false, // to determine whether the chat window should be open or closed
        showTypingIndicator: '', // when set to a value matching the participant.id it shows the typing indicator for the specific user
        colors: {
          header: {
            bg: '#4ae387',
            text: '#ffffff'
          },
          launcher: {
            bg: '#4ae387'
          },
          messageList: {
            bg: '#ffffff'
          },
          sentMessage: {
            bg: '#4ae387',
            text: '#ffffff'
          },
          receivedMessage: {
            bg: '#eaeaea',
            text: '#222222'
          },
          userInput: {
            bg: '#f4f7f9',
            text: '#565867'
          }
        }, // specifies the color scheme for the component
        alwaysScrollToBottom: false // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
  
      }
    },
    onIdle() {
      this.messageStr = 'Sign out'      
      this.$store.dispatch('logout')
    },
    onActive() {
      this.messageStr = 'Active'
      this.sessionExpiration()      
    },
    components: {
      VuesticPreLoader,
      AuthLayout,
      Layout
    },
    computed: {
      isAuth() {
        return this.$route.path.match('auth')
      }
    },
    created() {
      this.$store.dispatch('autoLogin')
    },
    mounted() {
      window.addEventListener("beforeunload", this.clearLocalStorage);
    },
    methods: {

      sendMessage (text) {
        if (text.length > 0) {
          this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
          this.onMessageWasSent({ author: 'support', type: 'text', data: { text } })
        }
      },
      onMessageWasSent (message) {
        // called when the user sends a message
        this.messageList = [ ...this.messageList, message ]
      },
      openChat () {
        // called when the user clicks on the fab button to open the chat
        this.isChatOpen = true
        this.newMessagesCount = 0
      },
      closeChat () {
        // called when the user clicks on the botton to close the chat
        this.isChatOpen = false
      },

      clearLocalStorage(event) {
        if (event.currentTarget.performance.navigation.type == 0 || event.currentTarget.performance.navigation.type == 1) {
          this.$store.dispatch('logout')
        }
        localStorage.removeItem('userId')
        localStorage.removeItem('language')
        localStorage.removeItem('token')
        localStorage.removeItem('site')
        localStorage.removeItem('idleTime')
      },
      sessionExpiration(event) {
        if (this.$store.state.idleTime != null) {
  
          if (!this.$route.path.includes('auth')) {
            localStorage.setItem('idleTime', this.$store.state.idleTime)
            clearTimeout(this.logout)
  
            this.logout = setTimeout(() => {
              this.$store.dispatch('setLogoutTimer', 0)
            }, this.$store.state.idleTime)
  
          }
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "sass/main";
  body {
    height: 100%;
    .app {
      height: 100%;
    }
  }
</style>
