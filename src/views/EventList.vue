<template>
  <div class="events">
    <EventCard v-for="event in events" :key="event.id" :event="event" />

    <div class="pagination">
        <router-link id="page-prev" :to="{ name: 'EventList', query: { page: page - 1 } }" rel="prev"
        v-if="page > 1">&#60; Previous</router-link>

        <router-link id="page-next" :to="{ name: 'EventList', query: { page: page + 1 } }" rel="next"
        v-if="hasNextPage">Next &#62;</router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'
// import { watchEffect } from 'vue' // UPDATED FROM TOURING VUE ROUTER: #9
// import { NProgress } from 'nprogress/nprogress.js'

export default {
    name: 'EventList',
    props: [ 'page' ],
    components: {
        EventCard,
    },
    data() {
        return{
            events: null,
            totalEvents: 0
        }
    },
    /* created() { // UPDATED FROM TOURING VUE ROUTER: #9
        watchEffect( () => {
            this.events = null
            // axios.get('https://my-json-server.typicode.com/Code-Pop/Real-World_Vue-3/events')
            EventService.getEvents(2, this.page)
            .then(response => {
                this.events = response.data
                this.totalEvents = response.headers['x-total-count']
            })
            .catch(error => {
                console.log(error)

                this.$router.push({ name: 'NetworkError' })
            })
        })
    }, */
    beforeRouteEnter(routeTo, routeFrom, next) {
        // NProgress.start()
        EventService.getEvents(2, parseInt(routeTo.query.page) || 1)
            .then(response => {
                next(comp => {
                    comp.events = response.data
                    comp.totalEvents = response.headers['x-total-count']
                })                
            })
            .catch(error => {
                console.log(error)
                next({ name: 'NetworkError' })
            })
            .finally(() => {
                // NProgress.done()
            })
    },
    beforeRouteUpdate(routeTo) {
        // NProgress.start()
        EventService.getEvents(2, parseInt(routeTo.query.page) || 1)
            .then(response => {
                this.events = response.data
                this.totalEvents = response.headers['x-total-count']                        
            })
            .catch(error => {
                console.log(error)
                return { name: 'NetworkError' }
            })
            .finally(() => {
                // NProgress.done()
            })
    },
    computed: {
        hasNextPage() {
            if(this.page < (Math.ceil(this.totalEvents / 2) ) ) {
                return true
            } else {
                return false
            }
        }
    }
}
</script>
<style scoped>
.events {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.pagination {
    display: flex;
    width: 290px;
}

.pagination a {
    flex: 1;
    text-decoration: none;
    color: #2c3e50;
}

#page-prev {
    text-align: left;
}

#page-next {
    text-align: right;
}
</style>
