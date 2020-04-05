<template>
    <div>
        <nav class="text-white bg-dark text-center p-3">
            <h3>Изменение заметки</h3>
        </nav>
        <div class="card px-0 mt-3 myCard">
            <div class="card-header d-flex justify-content-between">
                <div>
                    <i @click="backHome" class="fa fa-home fa-2x ml-auto myIcon"></i>
                </div>
                <div><i class="fa fa-times fa-2x myIcon" @click="statusDel"></i></div>
            </div>
            <div class="card-body">
                <div class="card-title">
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-default">Название заметки</span>
                        </div>
                        <input type="text" class="form-control task-name" aria-label="Sizing example input"
                               aria-describedby="inputGroup-sizing-default" v-model="task.name"
                               v-on:input="changeState">
                    </div>
                </div>
                <div class="card-text" v-for="(list,index) in task.todoList" :id="index">
                    <div class="form-check">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <input type="checkbox" aria-label="Checkbox for following text input"
                                           v-model="list.state" class="task-state" v-on:input="changeState">
                                </div>
                            </div>
                            <input type="text" class="form-control mr-2 task-state-text"
                                   aria-label="Text input with checkbox"
                                   v-model="list.text"
                                   v-on:input="changeState"
                            >
                            <i class="fa fa-minus-circle fa-2x task-icon delIcon" :id="index"
                               @click="deleteListItem"></i>
                        </div>
                    </div>
                </div :>
                <div>
                    <button class="btn btn-primary w-100" @click="pushNewListItem">Добавить запись</button>
                </div>
            </div>
            <p class="m-2 task-date">{{ task.date }}</p>
            <div class="card-footer  d-flex justify-content-between">

                <button class="btn btn-success" @click="saveTask">Сохранить</button>
                <div>
                    <i @click="stateBack" class="fa fa-arrow-left fa-2x mr-2 myIcon"></i>
                    <i @click="stateStraight" class="fa fa-arrow-right fa-2x myIcon"></i>
                </div>
            </div>
        </div>
        <modal-content v-on:close="del = false" v-if="del"></modal-content>
    </div>
</template>

<script>
    import ModalContent from "../components/ModalComponent";
    import moment from "moment";

    export default {
        name: "Task",
        data() {
            return {
                task: {},
                del: false,
                arrState: [],
                idTemp: 0,
            }
        },
        components: {
            ModalContent,
        },
        methods: {
            statusDel() {
                this.del = true;
                this.$store.dispatch( 'delId', Number( this.$route.params['id'] ) );
            },
            saveTask() {
                this.task.date = moment().format( 'MMMM Do YYYY, h:mm a' );
                this.task.todoList.forEach( ( item, index ) => {
                    if ( item.text === '' ) {
                        this.task.todoList.splice( index, 1 )
                    }
                } );
                this.$store.dispatch( 'saveTask', {
                    id: Number( this.$route.params['id'] ),
                    task: this.task
                } );
                this.arrState = [];
            },
            deleteListItem( e ) {
                this.task.todoList.splice( e.target.id, 1 );
                this.changeState('delete', e.target.id);
            },
            pushNewListItem() {
                this.task.todoList.push( {
                    state: false,
                    text: ''
                } );
                this.changeState('push');
            },
            backHome() {
                this.$store.dispatch( 'backModal', 'back' );
                this.del = true;
                this.arrState = [];
            },
            changeState( item, id ) {
                const task = this.createStateTask();
                if ( item === 'delete' ) {
                    task.todoList.splice( id, 1 );
                } else if ( item === 'push' ) {
                    task.todoList.push( {
                        state: false,
                        text: ''
                    } );
                }
                this.arrState.push( task );
                console.log( this.arrState );
            },
            setIdTemp(){
                this.arrState.forEach( ( item, index ) => {
                    if ( JSON.stringify( item ) === JSON.stringify( this.task ) ) {
                        this.idTemp = index;
                    }
                } );
            },
            stateBack() {
                this.setIdTemp();
                if ( this.idTemp !== 0 ) {
                    this.task.name = this.arrState[this.idTemp - 1].name;
                    this.task.todoList = this.arrState[this.idTemp - 1].todoList;
                    this.task.date = this.arrState[this.idTemp - 1].date;
                }
            },
            stateStraight() {
                this.setIdTemp();
                if ( this.idTemp !== this.arrState[this.arrState.length] ) {
                    this.task.name = this.arrState[this.idTemp + 1].name;
                    this.task.todoList = this.arrState[this.idTemp + 1].todoList;
                    this.task.date = this.arrState[this.idTemp + 1].date;
                }
            },
            createStateTask() {
                const taskName = document.querySelector( '.task-name' );
                let taskState = document.querySelectorAll( '.task-state' );
                const taskText = document.querySelectorAll( '.task-state-text' );
                const date = document.querySelectorAll( '.task-date' );
                const obj = {
                    name: taskName.value,
                    todoList: [],
                    date: date[0].textContent
                };
                taskState.forEach( ( item, index ) => {
                    obj.todoList.push( { state: item.checked, text: taskText[index].value } )
                } );
                Object.freeze( obj );
                return obj
            }
        },
        beforeMount() {
            this.$store.dispatch( 'returnTask', this.$route.params['id'] );
            this.task = this.$store.getters.getTask;
        },
        mounted() {
            this.$store.dispatch( 'pushTaskState', this.createStateTask() );
            this.arrState.push( Object.freeze(this.createStateTask()) );
        }
    }
</script>

<style lang="scss">
    .delIcon {
        color: #ff605a;

        &:hover {
            cursor: pointer;
            transform: scale(0.7);

        }
    }
</style>