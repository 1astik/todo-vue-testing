<template>
    <div class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <p>{{ objModal.textModal }}</p>
                </div>
                <div class="modal-footer d-flex justify-content-center">
                    <div v-if="objModal.state" class="w-100 d-flex justify-content-between">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="closeModal">
                            Отмена
                        </button>
                        <button type="button" class="btn btn-danger" @click="deleteModal" v-if="this.$store.getters.getModalState !== 'back'">Удалить</button>
                        <button type="button" class="btn btn-primary" v-else-if="this.$store.getters.getModalState === 'back'" @click="goHome"> {{ objModal.textBtn }}</button>
                    </div>
                    <div v-else-if="!objModal.state" class="d-flex justify-content-center">
                        <button type="button" class="btn btn-success" @click="goHome">Ok</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DeleteComponent",
        data() {
            return {
                objModal:{
                    state: true,
                    textModal: 'Вы точно хотите удалить заметку?',
                    textBtn: 'На главную',
                    back: false
                }
            }
        },
        methods: {
            closeModal() {
                this.$emit( "close" );
                this.$store.dispatch('backModal', '');
            },
            async deleteModal() {
                await this.$store.dispatch( 'deleteTask', this.$store.getters.getDelId );
                this.objModal.state = false;
                this.objModal.textModal = 'Операция прошла успешна!';
            },
            goHome(){
                this.closeModal();
                this.$router.push( { path: '/todo-testing' });
            }
        },
        beforeMount() {
            if ( this.$store.getters.getModalState === 'back') {
                this.objModal.textModal = 'Выйти из меню редактирования?';
            }
        }
    }
</script>

<style lang="scss">
    .modal {
        display: block;
        background-color: rgba(0, 0, 0, 0.5);
    }
</style>