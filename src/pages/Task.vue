<template>
    <div>
        <nav class="bg-dark text-left p-3">
            <div class="text-white myBtn" @click="backHome">
                <span><i class="fa fa-home fa-2x mr-2"></i>Back home</span>
            </div>
        </nav>
        <div class="card px-0 mt-3 myCard">
            <div class="card-header d-flex justify-content-between">
                <div>
                    <button :disabled="!backFlag" :class="{'myIcon': this.stateId !== 0}" @click="stateBack"><i
                            class="fa fa-reply fa-2x mr-2"></i></button>
                    <button :disabled="!stateFlag" @click="stateStraight" :class="{'myIcon': stateFlag}"><i
                            class="fa fa-share fa-2x "></i></button>
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
                               @focusout="changeState">
                    </div>
                </div>
                <div class="card-text" v-for="(list,index) in task.todoList" :id="index">
                    <div class="form-check">
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <div class="input-group-text">
                                    <input type="checkbox" aria-label="Checkbox for following text input"
                                           v-model="list.state" class="task-state" @focusout="changeState">
                                </div>
                            </div>
                            <input type="text" class="form-control mr-2 task-state-text"
                                   aria-label="Text input with checkbox"
                                   v-model="list.text"
                                   @focusout="changeState"
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
            <div class="card-footer  text-right">
                <button class="btn btn-success" @click="saveTask">Сохранить</button>
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
                stateId: 0,
                stateHistory: [],
                stateFlag: false,
                backFlag: false
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
            },
            deleteListItem( e ) {
                this.task.todoList.splice( e.target.id, 1 );
                this.changeState();
            },
            pushNewListItem() {
                this.task.todoList.push( {
                    state: false,
                    text: ''
                } );
                this.changeState();
            },
            backHome() {
                this.$store.dispatch( 'backModal', 'back' );
                this.del = true;
                this.arrState = [];
            },
            async changeState() {
                let test = {
                    name: this.task.name,
                    todoList: ( () => {
                        let arr = [];
                        for ( let item of this.task.todoList ) {
                            let obj = new Object( {
                                state: item.state,
                                text: item.text
                            } );
                            arr.push( obj );
                            console.log( obj );
                        }
                        return arr
                    } )(),
                    date: this.task.date
                };
                test = await Object.freeze( test );
                await this.arrState.push( test );
                if ( !this.stateFlag ) {
                    await this.stateHistory.push( this.arrState.length - 1 );
                } else {
                    await this.stateHistory.push( this.arrState.length - 1 );
                }

                if ( this.stateHistory.length >= 2 ) {
                    this.backFlag = true;
                }
            },
            setIdTemp( state ) {


                if ( state === 'back' ) {
                    if ( !this.stateFlag ) {
                        this.stateId = this.stateHistory[this.stateHistory.length - 2];
                        this.stateFlag = true;
                    } else if ( this.stateHistory[this.stateId] !== 0 ) {
                        this.stateId = this.stateHistory[this.stateHistory.findIndex( item => item === this.stateId ) - 1];
                    }
                }

                if ( state === 'straight' ) {
                    if ( this.stateFlag ) {
                        this.stateId = this.stateHistory.findIndex( item => item === this.stateHistory[this.stateId] ) + 1;
                    }
                }

            },
            stateBack() {
                this.setIdTemp( 'back' );
                this.task.name = this.arrState[this.stateId].name;
                this.task.todoList = this.arrState[this.stateId].todoList;
                this.task.date = this.arrState[this.stateId].date;
                if ( this.stateHistory[this.stateId] === 0 ) {
                    this.backFlag = false;
                }
            },
            stateStraight() {
                this.setIdTemp( 'straight' );
                if ( this.stateFlag ) {
                    this.task.name = this.arrState[this.stateHistory[this.stateId]].name;
                    this.task.todoList = this.arrState[this.stateHistory[this.stateId]].todoList;
                    this.task.date = this.arrState[this.stateHistory[this.stateId]].date;
                }
                if ( this.stateId === this.stateHistory.length - 1 ) {
                    this.stateFlag = false;
                    if ( this.stateHistory[this.stateId] !== 0 ) {
                        this.backFlag = true;
                    }
                }
            },
        },
        beforeMount() {
            this.$store.dispatch( 'returnTask', this.$route.params['id'] );
            this.task = this.$store.getters.getTask;
        },
        mounted() {
            this.changeState();
        }
    }
</script>

<style lang="scss">
    .myBtn > i, span {
        &:hover {
            cursor: pointer;
            color: #a6a6a6;
        }
    }

    .delIcon {
        color: #ff605a;

        &:hover {
            cursor: pointer;
            transform: scale(0.7);

        }
    }
</style>