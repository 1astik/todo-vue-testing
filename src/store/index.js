import Vue from 'vue'
import Vuex from 'vuex'

Vue.use( Vuex );

export default new Vuex.Store( {
    state: {
        arrTasks: JSON.parse( localStorage.getItem( 'tasks' ) ),
        task: '',
        delId: '',
        modalState: '',
        taskState: [],
        createTask: false
    },
    mutations: {
        setTasks: ( state, payload ) => {
            localStorage.setItem( 'tasks', JSON.stringify( payload ) );
        },
        Tasks: ( state, payload ) => {
            state.arrTasks = payload;
        },
        pushTask: ( state, payload ) => {
            state.arrTasks.push( payload );
        },
        delTask: ( state, payload ) => {
            state.arrTasks.splice( payload, 1 );
        },
        oneTask: ( state, payload ) => {
            const task = state.arrTasks.forEach( ( item, index ) =>{
                if ( index === Number( payload ) ) {
                    state.task = item;
                }
            } );
        },
        setDelID: (state, payload) => {
            state.delId = payload;
        },
        save: (state, payload) => {
            state.arrTasks.forEach( ( item, index ) =>{
                if ( index === Number( payload.id ) ) {
                    item = payload.task;
                }
            } );
        },
        setBackModal:(state, payload) => {
            state.modalState = payload;
        },
        setTaskState: (state,payload) => {
            state.taskState.push(payload);
        },
        setCreateTask: (state, payload) => {
            state.createTask = payload;
        }
    },
    actions: {
        setNewTask: async ( state, payload ) => {
            await state.commit( 'pushTask', payload );
            await state.commit( 'setTasks', state.getters.getArr );
        },
        delId: async ( state, payload ) => {
            await  state.commit( 'setDelID', payload );
        },
        deleteTask: async ( state, payload ) => {
            await state.commit( 'delTask', payload );
            await state.commit( 'setTasks', state.getters.getArr );
        },
        returnTask: async ( state, payload ) => {
            return state.commit( 'oneTask', payload );
        },
        saveTask: async (state, payload) => {
            await state.commit('save', payload);
            await state.commit( 'setTasks', state.getters.getArr );
        },
        backModal: async (state, payload) => {
            await state.commit( 'setBackModal', payload );
        },
        pushTaskState: async (state,payload) => {
            await state.commit( 'setTaskState', payload );
        },
        setCreate: async (state,payload) => {
            await state.commit('setCreateTask', payload);
        }
    },
    modules: {},
    getters: {
        getArr: ( state ) => {
            return state.arrTasks
        },
        getTask: ( state ) => {
            return state.task;
        },
        getDelId: state => {
            return state.delId
        },
        getModalState: state => {
            return state.modalState
        },
        getTaskState: state => {
            return state.taskState;
        },
        getCreateTask: state => {
            return state.createTask;
        }
    }
} )
