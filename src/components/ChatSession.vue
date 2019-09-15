<template>
    <div
        v-if="online"
        id="chat-session-view"
        class="h-100"
        :style="chatStyle"
    >
        <div
            id="chat-room"
            class="container"
        >
            <div
                class="row chat-conversation"
                :key="id"
                v-for="(session, id) in sessions"
            >
                <template v-if="session.status > 0">
                    <div
                        :class="`col-sm-11 col-md-5 messager mx-auto text-center animated ${senderBoxAnimation}`"
                        :style="{ animationDelay: `calc(${id / 2}s)` }"
                    >
                        <div
                            class="card overflow-hidden"
                        >
                            <div class="row no-gutters">
                                <img
                                    :src="senderAvatar"
                                    @load="reScroll()"
                                    class="avatar rounded-circle"
                                >
                                <div class="card-text m-auto">
                                    {{ senderName }}
                                </div>
                            </div>
                            <div class="row-no-gutters">
                            </div>
                            <div
                                class="row no-gutters"
                                :key="message_id"
                                v-for="(message, message_id) in session.sender.messages"
                            >
                                <button
                                    :id="`recipient-msg-btn-${message_id}`"
                                    class="btn btn-link"
                                    :disabled="session.sender.status === 2"
                                    v-if="message !== ('' || null)"
                                    @click="getRespond($event, session)"
                                >
                                    {{ message }}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div
                        :class="`col-sm-11 col-md-5 messager mx-auto text-center animated ${recipientBoxAnimation}`"
                        :style="{ animationDelay: `calc(${id / 2}s)` }"
                    >
                        <div
                            class="card overflow-hidden"
                        >
                            <div class="row no-gutters">
                                <div class="col-md-5">
                                    <div
                                        v-if="session.recipient.status < 2"
                                        class="container-vh-center"
                                    >
                                        <div :class="`dot-${awaitingRespondAnimation}`"></div>
                                    </div>
                                    <div
                                        v-else-if="session.recipient.status === 2"
                                        :class="`container-vh-center animated ${respondedAnimation}`"
                                    >
                                        <div
                                            :id="`recipient-response-${id}`"
                                            class="card-text responded-message"
                                        >
                                            {{ (session.status === 2 ? session.recipient.messages[session.respond] : 'not-found') }}
                                        </div>
                                    </div>
                                    <div
                                        v-else
                                        class="container-vh-center"
                                    >
                                        <div class="alert alert-danger">
                                            Offline
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <img
                                        :src="recipientAvatar"
                                        @load="reScroll()"
                                        class="avatar rounded-circle"
                                    >
                                    <br>
                                    {{ recipientName }}
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
        <button
            v-if="online"
            class="btn btn-link power-off m-auto"
            :aria-label="turnOffButtonInfo"
            :title="turnOffButtonInfo"
            @click="turnOffSession($event)"
        >
            <svg
                id="turn-off-icon"
                enable-background="new 0 0 64 64"
                width="100%"
                height="100%"
                version="1.1"
                viewBox="0 0 64 64"
                xml:space="preserve"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
            ><path d="M56.826,32C56.826,18.311,45.689,7.174,32,7.174S7.174,18.311,7.174,32S18.311,56.826,32,56.826S56.826,45.689,56.826,32z   M34.437,31.962c0,1.301-1.054,2.356-2.356,2.356c-1.301,0-2.356-1.055-2.356-2.356V19.709c0-1.301,1.055-2.356,2.356-2.356  c1.301,0,2.356,1.054,2.356,2.356V31.962z M48.031,32.041c0,8.839-7.191,16.03-16.031,16.03s-16.031-7.191-16.031-16.03  c0-4.285,1.669-8.313,4.701-11.34c0.46-0.46,1.062-0.689,1.665-0.689s1.207,0.23,1.667,0.691c0.92,0.921,0.919,2.412-0.002,3.332  c-2.139,2.138-3.318,4.981-3.318,8.006c0,6.24,5.077,11.317,11.318,11.317s11.318-5.077,11.318-11.317  c0-3.023-1.176-5.865-3.314-8.003c-0.92-0.921-0.919-2.412,0.001-3.333c0.921-0.921,2.412-0.919,3.333,0.001  C46.364,23.734,48.031,27.76,48.031,32.041z"/>
            </svg>
        </button>
    </div>
</template>

<script>
import { sampleSessionData } from '@/assets/data'

export default {
    name: 'ChatSession',
    props: {
        state: {
            type: Boolean,
            default: true
        },
        senderBoxAnimation: {
            type: String,
            default: 'fadeInLeft'
        },
        recipientBoxAnimation: {
            type: String,
            default: 'fadeInRight'
        },
        senderAvatar: {
            type: String,
            default: 'https://i.pravatar.cc/300'
        },
        recipientAvatar: {
            type: String,
            default: 'https://i.pravatar.cc/300'
        },
        senderName: {
            type: String,
            default: 'Sender Name'
        },
        recipientName: {
            type: String,
            default: 'Recipient Name'
        },
        sessionTheme: {
            type: String,
            default: 'anzera__turquose'
        },
        awaitingRespondAnimation: {
            type: String,
            default: 'elastic'
        },
        respondedAnimation: {
            type: String,
            default: 'bounceIn'
        },
        turnOffButtonInfo: {
            type: String,
            default: 'Turn off the session'
        },
        chatStyle: {
            type: Object,
            default: () => ({
                fontFamily: 'Ubuntu'
            })
        }
    },
    data () {
        return {
            online: this.state,
            sessions: null,
            sessionData: [],
            currentSessionID: 0,
            onCreate: () => {},
            onMount: () => {},
            onUpdate: () => {},
            onDestroyed: () => {},
            onFinishSession: (redirect, sessions) => {}
        }
    },
    methods: {
        isEmpty (obj) {
            return Object.keys(obj).length === 0
        },
        reScroll (to = 9999) {
            window.document.getRootNode().getElementsByTagName('html')[0].style.scrollBehavior = 'smooth'
            setTimeout(() => {
                window.scroll(0, to)
            }, 750)
        },
        injectData () {
            setTimeout(() => {
                if (this.sessionData.length !== 0) {
                    this.sessions = this.sessionData
                } else {
                    this.sessions = sampleSessionData
                    console.warn('No custom data provided for session', this.sessionData)
                }
                if (this.sessions[0].status === 0) {
                    this.sessions[0].status = 1
                }
            }, 0)
        },
        setChatSessionStatusOf (sessionID, statusOf, status) {
            if (this.handleParameterError(sessionID)) {
                sessionID = 0
            }
            if (this.handleParameterError(status)) {
                this.sessions[sessionID].status = 0
            }
            if (this.handleParameterError(statusOf)) {
                this.sessions[sessionID].status = status
            } else {
                this.sessions[sessionID][statusOf].status = status
            }
        },
        setStatus (_id = 0, _status = 1) {
            if (
                this.getChatSessionStatusOf(_id, null) !== 2 &&
                this.getChatSessionStatusOf(_id, 'sender') !== 2 &&
                this.getChatSessionStatusOf(_id, 'recipient') !== 2
            ) {
                this.setChatSessionStatusOf(_id, null, _status)
                this.setChatSessionStatusOf(_id, 'sender', _status)
                this.setChatSessionStatusOf(_id, 'recipient', _status)
            }
        },
        storeResponse (sessionID, response) {
            this.sessions[sessionID].respond = response
        },
        getRespond (event, session) {
            let selected = event.currentTarget.id.substr(18) // correct, close, wrong
            let respondMessage = ''
            this.storeResponse(session.id, selected)
            this.currentSessionID = session.id
            if (session !== null) {
                respondMessage = session.recipient.messages[selected]
                this.setStatus(session.id, 2)
                if (session.redirect[selected] !== -1) {
                    // If the current session is not finished
                    if (session.redirect[selected] !== null) {
                        // Setting redirected next session status as `on`
                        this.setStatus(session.redirect[selected], 1)
                    } else {
                        this.setStatus(session.id, 1)
                    }
                    setTimeout(() => {
                        window.ChatSession.shadowRoot.getElementById(`recipient-response-${session.id}`).innerText = respondMessage
                    }, 0)
                } else {
                    this.finishSession(session.redirect[selected])
                }
            }
        },
        finishSession (redirect) {
            if (redirect === -1) {
                this.onFinishSession(redirect, this.sessions)
            } else {
                console.warn(redirect)
            }
        },
        handleParameterError (param) {
            if ((param === undefined) || (param === null) || (param === '')) {
                console.warn('No parameter passed in:', param)
                return true
            }
            return false
        },
        getChatSessionStatusOf (sessionID = 0, statusOf) {
            let respond = null
            if (this.handleParameterError(sessionID)) {
                sessionID = 0
            }
            if (this.handleParameterError(statusOf)) {
                respond = this.sessions[sessionID].status
            } else {
                respond = this.sessions[sessionID][statusOf].status
            }
            return respond
        },
        turnOffSession (e) {
            this.online = false
            this.$emit('state', this.online)
        }
    },
    computed: {},
    created () {
        this.onCreate()
        this.injectData()
    },
    mounted () {
        this.reScroll()
        this.onMount()
        window.ChatSession = document.getElementsByTagName('chat-session')[0]
    },
    updated () {
        this.onUpdate()
    },
    destroyed () {
        this.onDestroyed()
    },
    watch: {
        state: function (newVal, oldVal) {
            this.online = newVal
        }
    }
}
</script>

<style lang="scss" scoped>
@import './../styles/main.scss';
</style>
