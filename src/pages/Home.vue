<template>
    <div>
        <toolbar-component ></toolbar-component>
        <div class="row mt-4 d-flex justify-content-between mx-0"  @click="closeToolbar">

            <card-component
                    v-for="(item,index) in tasks"
                    v-bind:status="statusDel"
                    v-bind:item="item"
                    v-bind:index="index"
            ></card-component>

            <modal-content v-on:close="del = false" v-if="del"></modal-content>


        </div>
    </div>
</template>

<script>
    import CardComponent from "../components/CardComponent";
    import ModalContent from "../components/ModalComponent";
    import ToolbarComponent from "../components/ToolbarComponent";
    export default {
        name: "Home",
        components: {
            ModalContent,
            CardComponent,
            ToolbarComponent
        },
        data() {
            return {
                tasks: [],
                del: false,
                id: '',
            }
        },
        beforeMount() {
            this.tasks = this.$store.getters.getArr;
        },
        methods: {
            statusDel( e ) {
                this.del = true;
                this.$store.dispatch( 'delId', Number(e.target.id) );
            },
            closeToolbar(){
                this.$root.$emit('closeT', false)
            }
        }
    }
</script>

<style lang="scss">
    @media (min-width: 650px) {
        .col-md-3 {
            max-width: 22%;
        }
    }

    .myCard {
        .myIcon {
            &:hover {
                cursor: pointer;
                transform: scale(0.7);
            }
        }
    }

</style>