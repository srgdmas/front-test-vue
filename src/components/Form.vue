<template>
  <div class="col-12">
    <!-- Its made with bootstrap 'cause Bootstrap-Vue don't work with Vue 3 -->
    <form class="mt-lg-5 pt-5" @submit.prevent="submitForm()">
      <div class="form-group row">
        <label for="number" class="col-sm-4 col-form-label">Number to check</label>
        <div class="col-sm-8">
          <input
              type="number"
              class="form-control"
              id="number"
              placeholder="Enter the number"
              v-model="number_to_check"
          >
        </div>
      </div>
      <div class="mt-2">
        <button type="submit" class="btn btn-primary">Submit</button>
      </div>
    </form>
    <div class="text-center mt-4" v-if="show">
      <em class="display-6 green">
        {{ checked_number }}
      </em>
    </div>
    <loading :active="isLoading" color="#00bd7e" opacity="0.1"></loading>
  </div>
</template>

<script>
import Loading from 'vue3-loading-overlay';
import 'vue3-loading-overlay/dist/vue3-loading-overlay.css';

export default {
  components: {
    Loading
  },
  data() {
    return {
      isLoading: false,
      show: false,
      number_to_check: 1,
      checked_number: '',
    }
  },
  methods: {
    submitForm() {
      this.isLoading = true;
      this.show = false;
      let form = new FormData();
      form.append('number_to_check', this.number_to_check);
      this.axios.post('check-number', form)
          .then(response => {
            this.checked_number = response.data.number;
            this.show = true;
            this.isLoading = false;
          })
          .catch(error => {
            this.isLoading = false;
            let show_error = '';
            show_error += error.response.data.errors.number_to_check.map(element => {
              return element + '<br>';
            })
            this.$notify({
              type: 'error',
              duration: 5000,
              title: error.response.data.message,
              text: show_error
            });
          })
    }
  }
}
</script>

<style scoped>

</style>