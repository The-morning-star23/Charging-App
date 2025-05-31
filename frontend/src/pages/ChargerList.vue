<template>
  <div class="charger-list">
    <h2>Charging Stations</h2>
    <button @click="openAddModal">Add Charger</button>
    <!-- Edit/Add Charger Modal -->
    <div v-if="showModal" class="modal">
    <div class="modal-content">
      <h3>{{ editMode ? 'Edit' : 'Add' }} Charger</h3>
      <form @submit.prevent="handleSubmit">
        <input v-model="form.name" placeholder="Name" required />
        <input v-model="form.status" placeholder="Status (Active/Inactive)" required />
        <input v-model.number="form.power_output" placeholder="Power Output (kW)" required />
        <input v-model="form.connector_type" placeholder="Connector Type" required />
        <input v-model.number="form.latitude" placeholder="Latitude" required />
        <input v-model.number="form.longitude" placeholder="Longitude" required />
        <button type="submit">{{ editMode ? 'Update' : 'Create' }}</button>
        <button @click="closeModal" type="button">Cancel</button>
      </form>
    </div>
  </div>
  
  <!-- Add actions in each charger row -->
  <tr v-for="charger in filteredChargers" :key="charger.id">
    <td>{{ charger.name }}</td>
    <td>{{ charger.status }}</td>
    <td>{{ charger.power_output }}</td>
    <td>{{ charger.connector_type }}</td>
    <td>{{ charger.latitude }}</td>
    <td>{{ charger.longitude }}</td>
    <td>
      <button @click="editCharger(charger)">Edit</button>
      <button @click="deleteCharger(charger.id)">Delete</button>
    </td>
  </tr>


    <div class="filters">
      <select v-model="statusFilter">
        <option value="">All Status</option>
        <option>Active</option>
        <option>Inactive</option>
      </select>

      <select v-model="connectorFilter">
        <option value="">All Connectors</option>
        <option>Type1</option>
        <option>Type2</option>
        <option>CCS</option>
        <option>CHAdeMO</option>
      </select>

      <input type="number" v-model.number="minPower" placeholder="Min kW" />
      <input type="number" v-model.number="maxPower" placeholder="Max kW" />
    </div>

    <div v-if="error" class="error">{{ error }}</div>

    <table v-if="filteredChargers.length">
      <thead>
        <tr>
          <th>Name</th>
          <th>Status</th>
          <th>Power (kW)</th>
          <th>Connector</th>
          <th>Latitude</th>
          <th>Longitude</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="charger in filteredChargers" :key="charger.id">
          <td>{{ charger.name }}</td>
          <td>{{ charger.status }}</td>
          <td>{{ charger.power_output }}</td>
          <td>{{ charger.connector_type }}</td>
          <td>{{ charger.latitude }}</td>
          <td>{{ charger.longitude }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>No chargers match filters.</p>
  </div>
</template>


<script>
import api from "../api";
import { onMounted, ref, computed } from "vue";

export default {
  setup() {
    const chargers = ref([]);
    const error = ref("");

    const statusFilter = ref("");
    const connectorFilter = ref("");
    const minPower = ref("");
    const maxPower = ref("");

    const fetchChargers = async () => {
      try {
        const res = await api.get("/chargers");
        chargers.value = res.data;
      } catch (err) {
        error.value = "Failed to load chargers.";
      }
    };

    const filteredChargers = computed(() => {
      return chargers.value.filter((c) => {
        const matchStatus = statusFilter.value ? c.status === statusFilter.value : true;
        const matchConnector = connectorFilter.value ? c.connector_type === connectorFilter.value : true;
        const matchMin = minPower.value ? c.power_output >= minPower.value : true;
        const matchMax = maxPower.value ? c.power_output <= maxPower.value : true;
        return matchStatus && matchConnector && matchMin && matchMax;
      });
    });

    onMounted(fetchChargers);

    return {
      chargers,
      error,
      statusFilter,
      connectorFilter,
      minPower,
      maxPower,
      filteredChargers,
    };

        const showModal = ref(false);
    const editMode = ref(false);
    const form = ref({
      id: null,
      name: "",
      status: "Active",
      power_output: 0,
      connector_type: "",
      latitude: 0,
      longitude: 0,
    });

    const openAddModal = () => {
      editMode.value = false;
      Object.assign(form.value, {
        id: null,
        name: "",
        status: "Active",
        power_output: 0,
        connector_type: "",
        latitude: 0,
        longitude: 0,
      });
      showModal.value = true;
    };

    const editCharger = (charger) => {
      editMode.value = true;
      Object.assign(form.value, { ...charger });
      showModal.value = true;
    };

    const closeModal = () => {
      showModal.value = false;
    };

    const handleSubmit = async () => {
      try {
        if (editMode.value) {
          await api.put(`/chargers/${form.value.id}`, form.value);
        } else {
          await api.post("/chargers", form.value);
        }
        await fetchChargers();
        closeModal();
      } catch (err) {
        error.value = "Failed to save charger.";
      }
    };

    const deleteCharger = async (id) => {
      if (confirm("Are you sure you want to delete this charger?")) {
        try {
          await api.delete(`/chargers/${id}`);
          await fetchChargers();
        } catch (err) {
          error.value = "Failed to delete charger.";
        }
      }
    };

  },
};

</script>

<style scoped>
.charger-list {
  max-width: 800px;
  margin: auto;
  padding-top: 40px;
}
.error {
  color: red;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 10px;
  border: 1px solid #ddd;
}
.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
.filters select,
.filters input {
  padding: 5px;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
}
.modal-content input {
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
}

</style>
