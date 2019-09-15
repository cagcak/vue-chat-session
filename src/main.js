import Vue from 'vue'

import wrap from '@vue/web-component-wrapper'
import ChatSession from './components/ChatSession'

window.Vue = Vue

const ChatComponentElement = wrap(Vue, ChatSession)

window.customElements.define('chat-session', ChatComponentElement)
