<template>
    <div class="card col-12 col-md-3 px-0 mb-3 myCard">
        <div class="card-header d-flex justify-content-between">
            <div>
                <router-link tag="i" :to="{name:'task', params:{id:index}}" class="fa fa-edit fa-2x ml-auto myIcon"></router-link>
            </div>
            <div><i class="fa fa-times fa-2x myIcon" :id="index" @click="status"></i></div>
        </div>
        <div class="card-body">
            <h5 class="card-title">{{ item.name }}</h5>
            <div class="card-text" v-for="(list,id) in item.todoList" v-if="id<= 1">
                <div class="form-check" :class="{'success' : list.state === true}">
                    <input type="checkbox" disabled class="form-check-input" id="customCheck1" v-model="list.state">
                    <label class="form-check-label" for="customCheck1">{{ list.text }}</label>
                </div>
            </div>
        </div>
        <div class="card-footer text-muted">
            {{ item.date }}
        </div>
    </div>
</template>

<script>
    export default {
        name: "CardComponent",
        props: [ 'index', 'status', 'item' ],
        data() {
            return {}
        }
    }
</script>

<style lang="scss">
.success{
    background-color: #acff90;
}
</style>