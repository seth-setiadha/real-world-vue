<template>
    <p> Register for event here </p>
    <button @click="register">Register Me</button>
</template>

<script>
export default {
    name: 'EventRegister',
    inject: [ 'GStore' ],
    props: [ 'event' ],
    methods: {
        register() {
            // Call API
            // If registered then redirect to event details

            this.GStore.flashMessage = 'You are successfully registered for ' + this.event.title 

            setTimeout( () => {
                this.GStore.flashMessage = ''
            }, 3000)

            // this.$router.push({ name: 'EventDetails' }) 
            this.$router.replace({ name: 'EventDetails' }) // navigate without pushing a history entry into the browswer. effectively disabling the back button
            // this.$router.go(-1) // -1 to go back, 1 to go forward
        }
    }
}
</script>
