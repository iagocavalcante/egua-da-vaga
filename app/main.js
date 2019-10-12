import Vue from 'nativescript-vue'
import App from './components/App'
import VueDevtools from 'nativescript-vue-devtools'

import ApolloClient from 'apollo-boost'
import VueApollo from 'vue-apollo';


const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  request: operation => {
    operation.setContext({
      headers: {
        authorization: 'Bearer ff332ca26bc8cf305ccdc1333073e854fb8134c1'
      },
    });
  }
});

// Install the vue plugin
Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: client,
})

if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

Vue.registerElement('RadSideDrawer', () => require('nativescript-ui-sidedrawer').RadSideDrawer)

new Vue({
  render: h => h('frame', [h(App)]),
  apolloProvider
}).$start()
