<template>
    <nav class="d-flex flex-column bg-dark justify-content-center align-items-center text-white myNav">
        <div class="p-2">
            <a @click="create = !create" class="create-task d-flex align-items-center"><i
                    class="fa fa-plus-circle fa-2x pr-2 task-icon"></i>Создать новую заметку</a>
        </div>
        <transition name="fade">
            <div v-if="create" class=" justify-content-center align-items-center text-center w-100 create">
                <div class="col-12 col-md-4 mt-4 mb-4 mx-auto text-center input-group" id="name">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">Заголовок</span>
                    </div>
                    <input type="text" placeholder="Task name"
                           class="form-control"></div>
                <div v-for="(item,index) in list" :id="index"
                     class="col-12 col-md-6 m-3 text-center input-group mx-auto">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon1">-</span>
                    </div>
                    <input type="text" class="form-control  mr-2 task-item" placeholder="Task item">
                    <i class="fa fa-minus-circle fa-2x task-icon" :id="index" @click="deleteItem"></i>
                </div>
                <div class="col-12 col-md-6 text-center mx-auto  mb-3">
                    <div class="row d-flex flex-row justify-content-between">
                        <div class="col-12 col-md-6 mb-2">
                            <button class="btn btn-primary " @click="list.push(1)">Добавить новую запись</button>
                        </div>
                        <div class="col-12 col-md-6">
                            <button class="btn btn-success " @click="createTask">Создать заметку</button>
                        </div>
                    </div>
                </div>

            </div>
        </transition>
    </nav>
</template>

<script>
    import moment from "moment";

    export default {
        name: "ToolbarComponent",
        props: [ 'creat' ],
        data() {
            return {
                create: false,
                list: [ 0 ]
            }
        },
        methods: {
            deleteItem( e ) {
                const elemDel = e.target.parentNode.parentNode.childNodes;
                let removeItem;
                elemDel.forEach( elem => {
                    if ( elem.id === e.target.id ) {
                        removeItem = elem;
                    }
                } );
                e.target.parentNode.parentNode.removeChild( removeItem );
            },
            pushItem() {
                const div_create = document.querySelector( '.create' );
                let arr = [];
                div_create.childNodes.forEach( elem => {
                    if ( elem.id !== '' ) {
                        arr.push( elem.childNodes[1].value );
                    }
                } );

                return arr
            },
            createTask() {
                const list = this.pushItem();
                const objTask = {
                    name: '',
                    todoList: [],
                    date: ''
                };
                objTask.name = list[0];
                list.splice( 0, 1 );
                list.forEach( elem => {
                    if ( elem !== '' ) {
                        objTask.todoList.push( {
                            state: false,
                            text: elem
                        } )
                    }
                } );
                objTask.date = moment().format( 'MMMM Do YYYY, h:mm a' );
                this.$store.dispatch( 'setNewTask', objTask );

                this.tasksList = !this.tasksList
            }
        }
    }
</script>

<style lang="scss">
    .myNav {
        min-height: 50px;

        .create-task {
            cursor: pointer;

            &:hover {
                color: #70ff40;
            }
        }

        .task-icon {
            &:hover {
                cursor: pointer;
            }
        }

        .task-item {
            min-width: 75%;
        }

        .fade-enter-active, .fade-leave-active {
            transition: opacity .3s;
        }

        .fade-enter, .fade-leave-to {
            opacity: 0;
        }
    }
</style>